import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Wand2, 
  Upload, 
  Download, 
  Trash2, 
  Heart, 
  Sparkles,
  User,
  Shirt,
  Star,
  Eye,
  Loader2,
  Copy,
  Plus,
  X,
  CheckCircle2,
  Image as ImageIcon,
  Palette,
  PackagePlus,
  Video,
  AlertCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CreateVideoPage } from './CreateVideoPage';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';
import exampleImage from 'figma:asset/38da05c51f952bb9af3bc061ba6d5ec880a20755.png';
import { fetchWithTimeout, safeJsonParse, logError, shouldShowError } from '../utils/error-handler';
import { useExamplePhotos } from '../hooks/useExamplePhotos';
import { useAuth } from '../hooks/useAuth';
import { useUserCredits } from '../hooks/useUserCredits';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { API_ENDPOINTS } from '../utils/config';
import { pollJobStatus, formatWaitTime } from '../utils/job-polling';

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  packName: string;
  timestamp: string;
  views: string;
  seed?: number;
  saved?: boolean;
}

interface AIModel {
  id: string;
  name: string;
  description?: string;
  status: string;
  training_data?: Record<string, any>;
  photos?: string[];
  thumbnailPhoto?: string;
  replicate_model_id?: string;
  replicate_version_id?: string;
  created_at?: string;
}

// Helper pour extraire les données de training_data
function getModelAttribute(model: AIModel, key: string): string | undefined {
  return model.training_data?.[key];
}

interface AIPhotoGeneratorProps {
  onBack?: () => void;
  selectedPackage?: string;
}

// Categories data based on the site structure (without emojis)
const CATEGORIES = [
  { id: 'ai-headshots', name: 'AI Headshots' },
  { id: 'ai-model-photo', name: 'AI Model Photo' },
  { id: 'ai-realistic-photo', name: 'AI Realistic Photo' },
  { id: 'ai-selfie-generator', name: 'AI Selfie Generator' },
  { id: 'ai-portrait-generator', name: 'AI Portrait Generator' },
  { id: 'ai-dating-photos', name: 'AI Dating Photos' },
  { id: 'ai-fitness-photos', name: 'AI Fitness Photos' },
  { id: 'ai-lifestyle-travel', name: 'Lifestyle & Travel' },
  { id: 'ai-cosplay-fantasy', name: 'Cosplay & Fantasy' },
];

export function AIPhotoGenerator({ onBack, selectedPackage = 'annual-premium' }: AIPhotoGeneratorProps) {
  // Auth
  const { session, user } = useAuth();

  // Credits from database (real-time)
  const { credits: userCredits, isLoading: creditsLoading, refetchCredits } = useUserCredits();
  
  const [activeTab, setActiveTab] = useState('create');
  const [prompt, setPrompt] = useState('');
  const [useSeed, setUseSeed] = useState(false);
  const [seedNumber, setSeedNumber] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [numberOfImages, setNumberOfImages] = useState([5]);
  const [photoType, setPhotoType] = useState('portrait');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [uploadedClothes, setUploadedClothes] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ai-headshots');
  
  // New: Exclusive modes for object/decor vs try-on
  const [creationMode, setCreationMode] = useState<'default' | 'object-decor' | 'virtual-tryon'>('default');
  const [uploadedObjectUrl, setUploadedObjectUrl] = useState<string | null>(null);
  const [uploadedDecorUrl, setUploadedDecorUrl] = useState<string | null>(null);
  const [uploadedClothingUrl, setUploadedClothingUrl] = useState<string | null>(null);

  // New model creation fields
  const [newModelName, setNewModelName] = useState('');
  const [gender, setGender] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [hairLength, setHairLength] = useState('');
  const [skinTone, setSkinTone] = useState('medium');
  const [bodyType, setBodyType] = useState('athletic');
  const [bustSize, setBustSize] = useState('medium');
  const [buttSize, setButtSize] = useState('medium');
  
  // New: Style attributes (from PreviewAIModelTab)
  const [background, setBackground] = useState('studio');
  const [outfit, setOutfit] = useState('athleisure');
  const [neckline, setNeckline] = useState('vneck');
  const [mood, setMood] = useState('confident');

  // Preview states (from PreviewAIModelTab)
  const [previewStatus, setPreviewStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [previewBlobURL, setPreviewBlobURL] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewRetryCount, setPreviewRetryCount] = useState<number>(0);

  // Models from Supabase
  const [savedModels, setSavedModels] = useState<AIModel[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [isCreatingModel, setIsCreatingModel] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

  // Refs for preview (from PreviewAIModelTab)
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentBlobURLRef = useRef<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastRevRef = useRef<number>(0);

  // Load example photos from Supabase
  const { photos: examplePhotos, isLoading: isLoadingPhotos } = useExamplePhotos(selectedCategory);

  // Load models from Supabase on mount
  useEffect(() => {
    if (session?.access_token) {
      loadModels();
    }
  }, [session]);

  // Cleanup refs on unmount (from PreviewAIModelTab)
  useEffect(() => {
    return () => {
      if (currentBlobURLRef.current) {
        URL.revokeObjectURL(currentBlobURLRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // ==========================================
  // PREVIEW UTILITY FUNCTIONS (from PreviewAIModelTab)
  // ==========================================

  // FNV-1a 32-bit hash
  const fnv1a32 = (str: string): number => {
    let h = 0x811c9dc5 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return h >>> 0;
  };

  // Dérive une seed stable à partir d'une clé
  const deriveSeed = (key: string): number => {
    return fnv1a32('PGv1|' + key);
  };

  // Crée une clé stable à partir des attributs (pour seed déterministe)
  const stableKey = (attrs: any): string => {
    const keep = [
      'px', 'gender', 'background', 'outfit', 'skin_tone',
      'hair_length', 'hair_color', 'eye_color', 'body_type',
      'bust_size', 'butt_size', 'mood', 'neckline'
    ];
    const obj: any = {};
    keep.forEach(k => {
      if (attrs[k] != null) obj[k] = attrs[k];
    });
    return JSON.stringify(obj);
  };

  // Check if preview is ready (minimal: gender, hair_length, eye_color)
  const isPreviewReady = (): boolean => {
    return !!(gender && hairLength && eyeColor && (hairLength === 'bald' || hairColor));
  };

  // ==========================================
  // AUTO-PREVIEW avec DEBOUNCE (300ms)
  // ==========================================
  useEffect(() => {
    // Only trigger preview when in create model mode
    if (!showCreateModel) {
      setPreviewStatus('idle');
      return;
    }

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Check required fields
    if (!isPreviewReady()) {
      setPreviewStatus('idle');
      return;
    }

    // Schedule preview after debounce (300ms)
    debounceTimerRef.current = setTimeout(() => {
      setPreviewRetryCount(0); // Reset retry count on new request
      runPreview();
    }, 300);

  }, [gender, skinTone, hairLength, hairColor, eyeColor, bodyType, bustSize, buttSize, background, outfit, neckline, mood, showCreateModel]);

  // ==========================================
  // RUN PREVIEW (with auto-retry on 502)
  // ==========================================
  const runPreview = async (isRetry = false) => {
    if (!isPreviewReady()) return;

    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    // Fixed: 512px for sharp 1:1 rendering
    const px = 512;

    // Build stable key (for deterministic seed)
    const key = stableKey({
      px,
      gender,
      background,
      outfit,
      skin_tone: skinTone,
      hair_length: hairLength,
      hair_color: hairLength === 'bald' ? 'none' : hairColor,
      eye_color: eyeColor,
      body_type: bodyType,
      bust_size: gender === 'woman' ? bustSize : undefined,
      butt_size: gender === 'woman' ? buttSize : undefined,
      mood,
      neckline: gender === 'woman' ? neckline : undefined
    });

    // Seed intelligente : déterministe par défaut (comportement naturel)
    const seed = deriveSeed(key);

    // Build payload
    const payload: any = {
      proxy: true,
      fast: true,
      safe: false,
      px,
      gender,
      background,
      outfit,
      skin_tone: skinTone,
      hair_length: hairLength,
      hair_color: hairLength === 'bald' ? 'none' : hairColor,
      eye_color: eyeColor,
      body_type: bodyType,
      mood,
      negative_prompt: 'extreme close-up, face-only, tight crop, zoomed-in face, forehead cut, chin cut, cropped hairline, soft focus, blur, low-res, jpeg artifacts',
      seed
    };

    // Woman-specific attributes
    if (gender === 'woman') {
      payload.bust_size = bustSize;
      payload.butt_size = buttSize;
      payload.neckline = neckline;
    }

    console.log(`[preview] 🎨 Seed: ${seed}, Px: ${px}${isRetry ? ' (retry ' + previewRetryCount + ')' : ''}`);

    // Anti-race: increment revision
    const currentRev = ++lastRevRef.current;

    // UI: Start generating
    setPreviewStatus('generating');
    setPreviewError(null);

    try {
      const response = await fetch('https://image-generator-api-chi.vercel.app/api/v1-preview.mjs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'idempotency-key': String(Date.now())
        },
        body: JSON.stringify(payload),
        signal: abortControllerRef.current.signal
      });

      console.log('[preview] 📡 Response status:', response.status);

      const contentType = response.headers.get('content-type') || '';

      // Handle error responses
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        let canRetry = false;

        // Check for 502 Bad Gateway or similar temporary errors
        if (response.status === 502 || response.status === 503 || response.status === 504) {
          canRetry = true;
          errorMessage = '⚠️ Provider temporairement indisponible';
        }

        // Auto-retry immediat sur 502 (1 seule fois)
        if (canRetry && previewRetryCount === 0) {
          console.log('[preview] 🔄 Auto-retry immédiat (502)...');
          setPreviewRetryCount(1);
          setTimeout(() => {
            if (currentRev === lastRevRef.current) {
              runPreview(true);
            }
          }, 500);
          return;
        }

        // Toast seulement si 2 échecs
        if (previewRetryCount > 0) {
          toast.error('Erreur de génération', {
            description: errorMessage,
            duration: 4000
          });
        }

        throw new Error(errorMessage);
      }

      // Check if this is still the latest request
      if (currentRev !== lastRevRef.current) {
        console.log('[preview] ⏭️ Request outdated, ignoring...');
        return;
      }

      // Verify content type
      if (!contentType.startsWith('image/')) {
        throw new Error(`Expected image/*, got ${contentType}`);
      }

      // Get binary blob
      const blob = await response.blob();
      console.log('[preview] 📦 Blob size:', blob.size, 'bytes');

      // Cleanup old blob URL
      if (currentBlobURLRef.current) {
        URL.revokeObjectURL(currentBlobURLRef.current);
      }

      // Create new blob URL
      const newBlobURL = URL.createObjectURL(blob);
      currentBlobURLRef.current = newBlobURL;

      console.log('[preview] ✅ Success!');

      // Success toast seulement si retry réussi
      if (previewRetryCount > 0) {
        toast.success('Preview générée avec succès', {
          duration: 2000
        });
      }

      // Update state
      setPreviewBlobURL(newBlobURL);
      setPreviewStatus('success');

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('[preview] ⏹️ Request aborted');
        return;
      }

      console.error('[preview] ❌ Error:', error.message || error);
      setPreviewStatus('error');
      setPreviewError(error.message || 'Preview generation failed');
    }
  };

  const loadModels = async () => {
    if (!session?.access_token) return;

    setIsLoadingModels(true);
    try {
      const response = await fetchWithTimeout(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/models`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      const data = await safeJsonParse(response, { success: false, error: 'Invalid response' });

      if (response.ok && data.success) {
        // Parse models with attributes from description
        const parsedModels = data.models.map((model: any) => {
          let attributes = {};
          try {
            if (model.description) {
              attributes = JSON.parse(model.description);
            }
          } catch (e) {
            // If description is not JSON, ignore
          }

          return {
            ...model,
            ...attributes,
          };
        });

        setSavedModels(parsedModels);
        console.log('✅ Models loaded:', parsedModels);
      } else {
        console.error('❌ Failed to load models:', data.error);
        
        if (shouldShowError(data.error)) {
          toast.error('Failed to load models');
        }
      }
    } catch (error: any) {
      logError('AIPhotoGenerator.loadModels', error);
      
      if (shouldShowError(error)) {
        toast.error('Error loading models');
      }
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    if (uploadedPhotos.length + fileArray.length > 10) {
      toast.error('Maximum 10 photos allowed');
      return;
    }

    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedPhotos(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleClothesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedClothes(event.target.result as string);
        toast.success('Clothing uploaded successfully');
      }
    };
    reader.readAsDataURL(file);
  };

  // New: Handle object upload with Supabase signed URL
  const handleObjectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!session?.access_token) {
      toast.error('Please sign in to upload images');
      return;
    }

    try {
      // Get signed upload URL
      const signedUrlResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/storage-signed-upload`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type
          })
        }
      );

      if (!signedUrlResponse.ok) {
        const errorData = await signedUrlResponse.json();
        throw new Error(errorData.error || 'Failed to get upload URL');
      }

      const { upload_url, public_url } = await signedUrlResponse.json();

      // Upload file
      const uploadResponse = await fetch(upload_url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload object image');
      }

      setUploadedObjectUrl(public_url);
      toast.success('✅ Object image uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading object:', error);
      toast.error(error.message || 'Failed to upload object image');
    }
  };

  // New: Handle decor upload with Supabase signed URL
  const handleDecorUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!session?.access_token) {
      toast.error('Please sign in to upload images');
      return;
    }

    try {
      const signedUrlResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/storage-signed-upload`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type
          })
        }
      );

      if (!signedUrlResponse.ok) {
        const errorData = await signedUrlResponse.json();
        throw new Error(errorData.error || 'Failed to get upload URL');
      }

      const { upload_url, public_url } = await signedUrlResponse.json();

      const uploadResponse = await fetch(upload_url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload decor image');
      }

      setUploadedDecorUrl(public_url);
      toast.success('✅ Decor image uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading decor:', error);
      toast.error(error.message || 'Failed to upload decor image');
    }
  };

  // New: Handle clothing upload with Supabase signed URL
  const handleClothingUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!session?.access_token) {
      toast.error('Please sign in to upload images');
      return;
    }

    try {
      const signedUrlResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/storage-signed-upload`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type
          })
        }
      );

      if (!signedUrlResponse.ok) {
        const errorData = await signedUrlResponse.json();
        throw new Error(errorData.error || 'Failed to get upload URL');
      }

      const { upload_url, public_url } = await signedUrlResponse.json();

      const uploadResponse = await fetch(upload_url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload clothing image');
      }

      setUploadedClothingUrl(public_url);
      toast.success('✅ Clothing image uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading clothing:', error);
      toast.error(error.message || 'Failed to upload clothing image');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    if (!session?.access_token) {
      toast.error('Please sign in to generate images');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Generate Idempotency-Key to avoid duplicates
      const idempotencyKey = `${session.user.id}_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      // Build payload based on creation mode
      let mode: 'text2img' | 'img2img' = 'text2img';
      let model: 'flux' | 'gen4' | 'gen4-turbo' = 'flux';
      let imageUrl: string | undefined = undefined;
      let promptStrength = 0.65;

      // Determine mode and model based on creation mode
      if (creationMode === 'default') {
        // Standard Generation
        if (selectedModelId) {
          // Use AI Model/Persona -> img2img with FLUX
          const selectedModel = savedModels.find(m => m.id === selectedModelId);
          if (selectedModel?.status !== 'ready') {
            toast.error(`Model is not ready yet. Current status: ${selectedModel?.status || 'unknown'}`);
            setIsGenerating(false);
            return;
          }
          mode = 'img2img';
          model = 'flux';
          imageUrl = selectedModel?.thumbnailPhoto || selectedModel?.photos?.[0];
          promptStrength = 0.6;
        } else {
          // No model selected -> text2img with FLUX
          mode = 'text2img';
          model = 'flux';
        }
      } else if (creationMode === 'object-decor') {
        // Add Object / Decor -> img2img with Gen-4
        if (!uploadedObjectUrl && !uploadedDecorUrl) {
          toast.error('Please upload a scene image for Add Object / Decor mode');
          setIsGenerating(false);
          return;
        }
        mode = 'img2img';
        model = 'gen4';
        imageUrl = uploadedObjectUrl || uploadedDecorUrl;
        promptStrength = 0.8;
      } else if (creationMode === 'virtual-tryon') {
        // Virtual Try-On -> img2img with Gen-4
        if (!uploadedClothingUrl) {
          toast.error('Please upload a portrait image for Virtual Try-On mode');
          setIsGenerating(false);
          return;
        }
        mode = 'img2img';
        model = 'gen4';
        imageUrl = uploadedClothingUrl;
        promptStrength = 0.7;
      }

      // Map photoType to aspect_ratio
      const aspectRatioMap: Record<string, string> = {
        'portrait': '4:5',
        'square': '1:1',
        'landscape': '16:9'
      };
      const aspectRatio = aspectRatioMap[photoType] || '4:5';

      console.log(`[Generation] 🎨 Mode: ${creationMode}, API Mode: ${mode}, Model: ${model}`);

      // Call user endpoint (with credit management)
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/user/v1/jobs`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey
          },
          body: JSON.stringify({
            mode,
            model,
            prompt_final: prompt,
            image_url: imageUrl,
            aspect_ratio: aspectRatio,
            prompt_strength: promptStrength,
            guidance: 3.5,
            seed: useSeed && seedNumber ? parseInt(seedNumber) : undefined,
            negative_prompt: negativePrompt || undefined,
            test_mode: false
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 402) {
          const required = data.required_credits || (model === 'gen4' ? 2 : 1);
          const available = data.available_credits || userCredits || 0;
          toast.error(
            `Insufficient credits. This generation requires ${required} credits but you only have ${available}. Please purchase more credits.`, 
            {
              duration: 6000
            }
          );
        } else if (response.status === 401) {
          toast.error('Authentication failed. Please sign in again.');
        } else {
          toast.error(data.error || 'Generation failed');
        }
        setIsGenerating(false);
        return;
      }

      // Check if generation succeeded
      if (data.ok && data.status === 'succeeded' && data.image_url) {
        const newImage: GeneratedImage = {
          id: data.job_id || `img-${Date.now()}`,
          url: data.image_url,
          prompt: prompt,
          packName: creationMode === 'default' 
            ? (savedModels.find(m => m.id === selectedModelId)?.name || 'Standard Generation')
            : creationMode === 'object-decor' 
            ? 'Add Object / Decor'
            : 'Virtual Try-On',
          timestamp: new Date().toLocaleString('en-US', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            timeZoneName: 'short'
          }),
          views: '0',
          saved: false
        };
        
        setGeneratedImages([newImage, ...generatedImages]);
        toast.success('✨ Photo generated successfully!');
        
        // Refresh credits after successful generation
        refetchCredits();
      } else if (data.ok && data.status === 'queued') {
        // Job is queued, start polling for status
        const jobId = data.job_id;
        console.log(`[Generation] 📋 Job queued: ${jobId}, starting polling...`);
        
        toast.info('🎨 Generation queued, waiting for processing...', { duration: 3000 });
        
        // Refresh credits (already debited)
        refetchCredits();
        
        // Start polling
        try {
          const finalStatus = await pollJobStatus({
            jobId,
            accessToken: session.access_token,
            maxAttempts: 60,
            intervalMs: 2000,
            onProgress: (status) => {
              console.log(`[Polling] Status: ${status.status}, Progress: ${status.progress || 0}%`);
              if (status.status === 'processing') {
                toast.info('⚙️ Generation in progress...', { duration: 2000 });
              }
            },
            onSuccess: (status) => {
              console.log('[Polling] ✅ Generation completed!');
              toast.success('✨ Photo generated successfully!');
            },
            onError: (error) => {
              console.error('[Polling] ❌ Error:', error);
              toast.error(`Generation failed: ${error}`);
            }
          });
          
          // Add generated image to list
          if (finalStatus.image_url) {
            const newImage: GeneratedImage = {
              id: jobId,
              url: finalStatus.image_url,
              prompt: prompt,
              packName: creationMode === 'default' 
                ? (savedModels.find(m => m.id === selectedModelId)?.name || 'Standard Generation')
                : creationMode === 'object-decor' 
                ? 'Add Object / Decor'
                : 'Virtual Try-On',
              timestamp: new Date().toLocaleString('en-US', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                timeZoneName: 'short'
              }),
              views: '0',
              saved: false
            };
            
            setGeneratedImages([newImage, ...generatedImages]);
          }
        } catch (pollError: any) {
          console.error('[Polling] ❌ Polling failed:', pollError);
          toast.error(`Polling failed: ${pollError.message}. Check your gallery later.`);
        } finally {
          setIsGenerating(false);
        }
        
        return; // Exit early since polling will handle setting isGenerating
      } else {
        throw new Error(data.error || 'Generation failed');
      }

    } catch (error: any) {
      console.error('❌ Generation error:', error);
      toast.error(error.message || 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (examplePrompt: string, seed: number | null | undefined) => {
    setPrompt(examplePrompt);
    if (seed != null) {
      setSeedNumber(seed.toString());
      setUseSeed(true);
      toast.success('Prompt and seed copied!');
    } else {
      toast.success('Prompt copied!');
    }
    setActiveTab('create');
  };

  const handleCopySeed = (seed: number | null | undefined) => {
    if (seed == null) {
      toast.error('No seed available');
      return;
    }
    setSeedNumber(seed.toString());
    setUseSeed(true);
    toast.success(`Seed ${seed} applied!`);
  };

  const handleCreateModel = async () => {
    if (!newModelName.trim()) {
      toast.error('Please enter a model name');
      return;
    }

    if (!session?.access_token) {
      toast.error('Please sign in to create a model');
      return;
    }

    setIsCreatingModel(true);

    try {
      // 1. Create model in database
      const attributes = {
        gender,
        eyeColor,
        hairColor,
        hairLength,
        skinTone,
        bodyType,
        bustSize,
        buttSize,
        background,
        outfit,
        mood,
        neckline: gender === 'woman' ? neckline : undefined,
      };

      console.log('📝 Creating model:', newModelName, attributes);

      const createResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/models`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newModelName,
            description: JSON.stringify(attributes),
            thumbnail_photo: previewBlobURL || undefined
          })
        }
      );

      const createData = await createResponse.json();

      if (!createResponse.ok || !createData.success) {
        throw new Error(createData.error || 'Failed to create model');
      }

      const modelId = createData.model.id;
      console.log('✅ Model created:', modelId);

      // 2. Upload photos if any (PARALLEL UPLOAD)
      if (uploadedPhotos.length > 0) {
        console.log(`📤 Uploading ${uploadedPhotos.length} photos in parallel...`);
        setUploadProgress({ current: 0, total: uploadedPhotos.length });
        
        let completedCount = 0;
        
        const uploadPromises = uploadedPhotos.map(async (photoDataUrl, i) => {
          try {
            // Convert base64 to blob
            const response = await fetch(photoDataUrl);
            const blob = await response.blob();
            
            const formData = new FormData();
            formData.append('file', blob, `photo_${i}.jpg`);

            const uploadResponse = await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/models/${modelId}/photos`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${session.access_token}`,
                },
                body: formData
              }
            );

            completedCount++;
            setUploadProgress({ current: completedCount, total: uploadedPhotos.length });

            if (!uploadResponse.ok) {
              console.warn(`⚠️ Failed to upload photo ${i + 1}`);
              return { success: false, index: i };
            } else {
              console.log(`✅ Photo ${i + 1} uploaded`);
              return { success: true, index: i };
            }
          } catch (error) {
            console.error(`❌ Error uploading photo ${i + 1}:`, error);
            completedCount++;
            setUploadProgress({ current: completedCount, total: uploadedPhotos.length });
            return { success: false, index: i };
          }
        });

        // Wait for all uploads to complete
        const results = await Promise.all(uploadPromises);
        const successCount = results.filter(r => r.success).length;
        console.log(`✅ ${successCount}/${uploadedPhotos.length} photos uploaded successfully`);
        
        setUploadProgress({ current: 0, total: 0 }); // Reset progress
      }

      // 3. Reload models
      await loadModels();

      // 4. Select the new model
      setSelectedModelId(modelId);

      // 5. Reset form
      setShowCreateModel(false);
      setNewModelName('');
      setGender('');
      setEyeColor('');
      setHairColor('');
      setHairLength('');
      setSkinTone('medium');
      setBodyType('athletic');
      setBustSize('medium');
      setButtSize('medium');
      setBackground('studio');
      setOutfit('athleisure');
      setNeckline('vneck');
      setMood('confident');
      setUploadedPhotos([]);
      setPreviewStatus('idle');
      setPreviewBlobURL(null);
      setPreviewError(null);

      toast.success(`Model "${newModelName}" created successfully!`);

      // 6. Show training notification if photos were uploaded
      if (uploadedPhotos.length >= 5) {
        toast.info('Training will start automatically. This may take 10-20 minutes.');
      } else if (uploadedPhotos.length > 0) {
        toast.info('Upload at least 5 photos to train the model');
      }

    } catch (error: any) {
      console.error('❌ Error creating model:', error);
      toast.error(error.message || 'Failed to create model');
    } finally {
      setIsCreatingModel(false);
    }
  };

  const estimatedTime = numberOfImages[0] * 2.2;

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0B0B0D]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Cliquable pour retour landing */}
            <button 
              onClick={onBack}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">
                Photo<span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Glow</span>
              </h1>
            </button>

            {/* Credits */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full border border-purple-500/20">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="font-semibold text-white">{userCredits ?? 0}</span>
              <span className="text-sm text-gray-400">credits</span>
            </div>
          </div>

          {/* Navigation Tabs - Create, Prompts, Saved, Deleted, Make Video */}
          <div className="flex gap-6 mt-4 border-b border-white/5">
            {[
              { id: 'create', label: 'Create' },
              { id: 'prompts', label: 'Prompts' },
              { id: 'saved', label: 'Saved' },
              { id: 'deleted', label: 'Deleted' },
              { id: 'makevideo', label: 'Make Video' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pg-tab ${activeTab === tab.id ? 'pg-tab-active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        
        {/* CREATE TAB - 2 columns with left panel */}
        {activeTab === 'create' && (
          <div className="grid lg:grid-cols-[420px_1fr] gap-8">
            
            {/* LEFT PANEL - Generator Controls */}
            <div className="space-y-6">
              <Card className="bg-[#18181B] border-white/10 p-6 space-y-6">
                
                {/* Main Prompt */}
                <div className="space-y-3">
                  <Label htmlFor="prompt" className="text-white font-semibold">Prompt</Label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the photo you want to generate..."
                    className="min-h-[100px] bg-[#0B0B0D] border-orange-500/50 text-white resize-none focus:border-orange-500 focus:ring-orange-500/20"
                  />
                </div>

                {/* Photo Type Selection - Sticker Select (P1: hauteur 44px, border 1.5, focus violet) */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-pink-400" />
                    <Label className="text-white font-semibold">Photo Type</Label>
                  </div>
                  <Select value={photoType} onValueChange={setPhotoType}>
                    <SelectTrigger className="sticker-select pg-focus-ring">
                      <SelectValue placeholder="Select photo type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#F1F2F6] border-black">
                      <SelectItem value="portrait" className="hover:bg-gray-200 cursor-pointer">Portrait</SelectItem>
                      <SelectItem value="full-body" className="hover:bg-gray-200 cursor-pointer">Full Body</SelectItem>
                      <SelectItem value="upper-body" className="hover:bg-gray-200 cursor-pointer">Upper Body</SelectItem>
                      <SelectItem value="lifestyle" className="hover:bg-gray-200 cursor-pointer">Lifestyle</SelectItem>
                      <SelectItem value="professional" className="hover:bg-gray-200 cursor-pointer">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* AI Model / Persona - P1: hiérarchie améliorée */}
                {/* AI Model / Persona - Fix overflow & spacing */}
                <div className="space-y-4 p-6 bg-purple-500/5 rounded-2xl border border-purple-500/20 overflow-visible">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-purple-400" />
                      <Label className="font-semibold text-[#E6E7EB]">AI Model / Persona</Label>
                    </div>
                    <button
                      onClick={() => setShowCreateModel(!showCreateModel)}
                      className="sticker-btn h-9 px-4 text-sm pg-focus-ring"
                    >
                      <Plus className="w-4 h-4 mr-1.5" />
                      New Model
                    </button>
                  </div>

                  {!showCreateModel ? (
                    <div className="space-y-3">
                      {isLoadingModels ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                        </div>
                      ) : savedModels.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-6">
                          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-purple-400" />
                          </div>
                          <p className="text-xs text-[#A1A1AA] text-center">
                            No models yet. Create your first model!
                          </p>
                        </div>
                      ) : (
                        <RadioGroup value={selectedModelId} onValueChange={setSelectedModelId}>
                          {savedModels.map((model) => (
                            <div key={model.id} className="flex items-center space-x-3 p-3 rounded-lg bg-[#0B0B0D] border border-gray-700 hover:border-purple-500/50 transition-colors">
                              <RadioGroupItem value={model.id} id={model.id} className="border-purple-400" />
                              
                              {/* Thumbnail photo */}
                              {model.thumbnailPhoto && (
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/30 flex-shrink-0">
                                  <img src={model.thumbnailPhoto} alt={model.name} className="w-full h-full object-cover" />
                                </div>
                              )}
                              
                              <Label htmlFor={model.id} className="flex-1 cursor-pointer">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-white">{model.name}</span>
                                  {model.status === 'training' && (
                                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Training</Badge>
                                  )}
                                  {model.status === 'ready' && (
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ready</Badge>
                                  )}
                                  {model.status === 'failed' && (
                                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Failed</Badge>
                                  )}
                                </div>
                                {(getModelAttribute(model, 'gender') || getModelAttribute(model, 'eye_color') || getModelAttribute(model, 'hair_color') || getModelAttribute(model, 'skin_tone')) && (
                                  <div className="text-xs text-gray-400">
                                    {getModelAttribute(model, 'gender') && (getModelAttribute(model, 'gender') === 'woman' ? '👩 Woman' : '👨 Man')}
                                    {getModelAttribute(model, 'gender') && (getModelAttribute(model, 'eye_color') || getModelAttribute(model, 'hair_color') || getModelAttribute(model, 'skin_tone')) && ' • '}
                                    {getModelAttribute(model, 'eye_color') && `${getModelAttribute(model, 'eye_color')} eyes`}
                                    {getModelAttribute(model, 'eye_color') && getModelAttribute(model, 'hair_color') && ' • '}
                                    {getModelAttribute(model, 'hair_color') && getModelAttribute(model, 'hair_length') && `${getModelAttribute(model, 'hair_color')} ${getModelAttribute(model, 'hair_length')} hair`}
                                    {getModelAttribute(model, 'hair_color') && !getModelAttribute(model, 'hair_length') && `${getModelAttribute(model, 'hair_color')} hair`}
                                    {(getModelAttribute(model, 'eye_color') || getModelAttribute(model, 'hair_color')) && getModelAttribute(model, 'skin_tone') && ' • '}
                                    {getModelAttribute(model, 'skin_tone') && `${getModelAttribute(model, 'skin_tone')} skin`}
                                  </div>
                                )}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4 overflow-visible">
                      {/* Preview compacte en haut */}
                      <div className="space-y-3">
                        <Label className="text-sm text-[#E6E7EB]">Preview</Label>
                        <div 
                          className={`relative bg-[#0B0B0D] rounded-xl border border-[#2A2A31] overflow-hidden transition-all duration-300 mx-auto ${
                            previewStatus === 'generating' ? 'scale-95 opacity-60' : 'scale-100 opacity-100'
                          }`}
                          style={{ 
                            aspectRatio: '1/1',
                            maxWidth: '280px',
                            maxHeight: '280px'
                          }}
                        >
                          {previewStatus === 'idle' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-4">
                              <Sparkles className="w-10 h-10 mb-2 opacity-20" />
                              <p className="text-xs text-center text-[#A1A1AA]">Fill required fields to preview</p>
                            </div>
                          )}

                          {previewStatus === 'generating' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                              <Loader2 className="w-8 h-8 animate-spin text-purple-400 mb-2" />
                              <p className="text-xs text-white">Generating...</p>
                            </div>
                          )}

                          {previewStatus === 'success' && previewBlobURL && (
                            <img
                              src={previewBlobURL}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          )}

                          {previewStatus === 'error' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 p-4">
                              <AlertCircle className="w-7 h-7 mb-2" />
                              <p className="text-xs text-center mb-2">{previewError}</p>
                              <button
                                onClick={() => runPreview()}
                                className="sticker-btn text-xs px-3 h-8"
                              >
                                Retry
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-[#A1A1AA] text-center">
                          This is just a preview — final results may vary.
                        </p>
                      </div>

                      {/* Formulaire */}
                      <div className="max-w-xl mx-auto space-y-4">
                        {/* Model Name */}
                        <div className="space-y-2">
                          <Input
                            placeholder="Model Name"
                            value={newModelName}
                            onChange={(e) => setNewModelName(e.target.value)}
                            className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] placeholder:text-[#A1A1AA] focus:border-purple-500 focus:ring-2 focus:ring-[#8B5CF6] h-11 text-sm w-full"
                          />
                        </div>
                        
                        {/* Physical Attributes - Grille fluide */}
                        <div className="space-y-4">
                          {/* Gender - Pleine largeur */}
                          <div className="space-y-2">
                            <Label className="text-sm text-[#E6E7EB]">Gender *</Label>
                            <Select value={gender} onValueChange={setGender}>
                              <SelectTrigger className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] h-11 w-full pg-focus-ring">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#18181B] border-[#2A2A31] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50">
                                <SelectItem value="woman">👩 Woman</SelectItem>
                                <SelectItem value="man">👨 Man</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Ligne 2 colonnes: Eye Color / Hair Length */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm text-[#E6E7EB]">Eye Color *</Label>
                              <Select value={eyeColor} onValueChange={setEyeColor}>
                                <SelectTrigger className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] h-11 w-full pg-focus-ring">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181B] border-[#2A2A31] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50">
                                  <SelectItem value="brown">🟤 Brown</SelectItem>
                                  <SelectItem value="blue">🔵 Blue</SelectItem>
                                  <SelectItem value="green">🟢 Green</SelectItem>
                                  <SelectItem value="hazel">🟡 Hazel</SelectItem>
                                  <SelectItem value="gray">⚪ Gray</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm text-[#E6E7EB]">Hair Length *</Label>
                              <Select value={hairLength} onValueChange={setHairLength}>
                                <SelectTrigger className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] h-11 w-full pg-focus-ring">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181B] border-[#2A2A31] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50">
                                  <SelectItem value="short">Short</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="long">Long</SelectItem>
                                  <SelectItem value="bald">Bald</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        
                          {/* Ligne 2 colonnes: Hair Color / Skin Tone */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className={`text-sm ${hairLength === 'bald' ? 'text-[#A1A1AA]' : 'text-[#E6E7EB]'}`}>
                                Hair Color {hairLength !== 'bald' && '*'}
                              </Label>
                              <Select value={hairColor} onValueChange={setHairColor} disabled={hairLength === 'bald'}>
                                <SelectTrigger className={`border-[#2A2A31] text-[#E6E7EB] h-11 w-full pg-focus-ring ${hairLength === 'bald' ? 'bg-gray-800 opacity-50 cursor-not-allowed' : 'bg-[#0B0B0D]'}`}>
                                  <SelectValue placeholder={hairLength === 'bald' ? 'N/A' : 'Select'} />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181B] border-[#2A2A31] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50">
                                  <SelectItem value="black">🖤 Black</SelectItem>
                                  <SelectItem value="brown">🤎 Brown</SelectItem>
                                  <SelectItem value="blonde">👱 Blonde</SelectItem>
                                  <SelectItem value="red">❤️ Red</SelectItem>
                                  <SelectItem value="gray">🩶 Gray</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm text-[#E6E7EB]">Skin Tone</Label>
                              <Select value={skinTone} onValueChange={setSkinTone}>
                                <SelectTrigger className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] h-11 w-full pg-focus-ring">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181B] border-[#2A2A31] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50">
                                  <SelectItem value="light">Light</SelectItem>
                                  <SelectItem value="fair">Fair</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="tan">Tan</SelectItem>
                                  <SelectItem value="olive">Olive</SelectItem>
                                  <SelectItem value="deep">Deep</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Ligne 2 colonnes: Body Type / Background */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm text-[#E6E7EB]">Body Type</Label>
                              <Select value={bodyType} onValueChange={setBodyType}>
                                <SelectTrigger className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] h-11 w-full pg-focus-ring">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181B] border-[#2A2A31] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50">
                                  <SelectItem value="athletic">Athletic</SelectItem>
                                  <SelectItem value="slim">Slim</SelectItem>
                                  <SelectItem value="average">Average</SelectItem>
                                  <SelectItem value="curvy">Curvy</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm text-[#E6E7EB]">Background</Label>
                              <Select value={background} onValueChange={setBackground}>
                                <SelectTrigger className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] h-11 w-full pg-focus-ring">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181B] border-[#2A2A31] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50">
                                  <SelectItem value="studio">🎬 Studio</SelectItem>
                                  <SelectItem value="outdoor">🌳 Outdoor</SelectItem>
                                  <SelectItem value="urban">🏙️ Urban</SelectItem>
                                  <SelectItem value="indoor">🏠 Indoor</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Woman-specific fields */}
                          {gender === 'woman' && (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-sm text-[#E6E7EB]">Bust</Label>
                                  <Select value={bustSize} onValueChange={setBustSize}>
                                    <SelectTrigger className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] h-11 w-full pg-focus-ring">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#18181B] border-[#2A2A31] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50">
                                      <SelectItem value="small">Small</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="large">Large</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-sm text-[#E6E7EB]">Butt</Label>
                                  <Select value={buttSize} onValueChange={setButtSize}>
                                    <SelectTrigger className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] h-11 w-full pg-focus-ring">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#18181B] border-[#2A2A31] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50">
                                      <SelectItem value="small">Small</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="large">Large</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm text-[#E6E7EB]">Neckline</Label>
                                <Select value={neckline} onValueChange={setNeckline}>
                                  <SelectTrigger className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] h-11 w-full pg-focus-ring">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#18181B] border-[#2A2A31] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50">
                                    <SelectItem value="crew">Crew</SelectItem>
                                    <SelectItem value="vneck">V-Neck</SelectItem>
                                    <SelectItem value="scoop">Scoop</SelectItem>
                                    <SelectItem value="plunge">Plunge</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </>
                          )}

                          {/* Ligne 2 colonnes: Outfit / Mood */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm text-[#E6E7EB]">Outfit</Label>
                              <Select value={outfit} onValueChange={setOutfit}>
                                <SelectTrigger className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] h-11 w-full pg-focus-ring">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181B] border-[#2A2A31] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50">
                                  <SelectItem value="tee">👕 Tee</SelectItem>
                                  <SelectItem value="shirt">👔 Shirt</SelectItem>
                                  <SelectItem value="blazer">🧥 Blazer</SelectItem>
                                  <SelectItem value="athleisure">🏃 Athleisure</SelectItem>
                                  <SelectItem value="dress">👗 Dress</SelectItem>
                                  <SelectItem value="casual">👖 Casual</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm text-[#E6E7EB]">Mood</Label>
                              <Select value={mood} onValueChange={setMood}>
                                <SelectTrigger className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] h-11 w-full pg-focus-ring">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181B] border-[#2A2A31] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50">
                                  <SelectItem value="confident">😎 Confident</SelectItem>
                                  <SelectItem value="happy">😊 Happy</SelectItem>
                                  <SelectItem value="serious">😐 Serious</SelectItem>
                                  <SelectItem value="mysterious">��� Mysterious</SelectItem>
                                  <SelectItem value="playful">😜 Playful</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Boutons Create / Cancel */}
                        <div className="flex gap-3 pt-2">
                          <Button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              handleCreateModel();
                            }}
                            className="flex-1 sticker-btn-primary h-11 text-sm"
                            disabled={!newModelName.trim() || isCreatingModel || !gender || !hairLength || !eyeColor || (hairLength !== 'bald' && !hairColor)}
                          >
                            {isCreatingModel ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Creating...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Create
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowCreateModel(false);
                            }}
                            className="sticker-btn h-11 text-sm px-5"
                            disabled={isCreatingModel}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* P0: Creation Mode Selection - Radio Cards avec styles corrects */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-purple-400" />
                    <Label className="font-semibold text-[#E6E7EB]">Creation Mode</Label>
                  </div>
                  
                  <RadioGroup value={creationMode} onValueChange={(value: any) => {
                    setCreationMode(value);
                    // Reset URLs when switching modes
                    if (value === 'default') {
                      setUploadedObjectUrl(null);
                      setUploadedDecorUrl(null);
                      setUploadedClothingUrl(null);
                    } else if (value === 'object-decor') {
                      setUploadedClothingUrl(null);
                    } else if (value === 'virtual-tryon') {
                      setUploadedObjectUrl(null);
                      setUploadedDecorUrl(null);
                    }
                  }}>
                    <div className="space-y-3">
                      <label 
                        htmlFor="mode-default" 
                        className={`radio-card pg-focus-ring ${creationMode === 'default' ? 'radio-card-selected' : 'radio-card-default'}`}
                      >
                        <RadioGroupItem value="default" id="mode-default" className={creationMode === 'default' ? 'border-white' : 'border-black'} />
                        <div className="flex-1">
                          <span className="block font-semibold">
                            Standard Generation
                          </span>
                        </div>
                      </label>
                      
                      <label 
                        htmlFor="mode-object" 
                        className={`radio-card pg-focus-ring ${creationMode === 'object-decor' ? 'radio-card-selected' : 'radio-card-default'}`}
                      >
                        <RadioGroupItem value="object-decor" id="mode-object" className={creationMode === 'object-decor' ? 'border-white' : 'border-black'} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <PackagePlus className="w-5 h-5" />
                            <span className="font-semibold">
                              Add Object / Decor
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${creationMode === 'object-decor' ? 'text-white/70' : 'text-[#0B0B0E]/60'}`}>
                            Add objects or decorations to the scene
                          </p>
                        </div>
                      </label>
                      
                      <label 
                        htmlFor="mode-tryon" 
                        className={`radio-card pg-focus-ring ${creationMode === 'virtual-tryon' ? 'radio-card-selected' : 'radio-card-default'}`}
                      >
                        <RadioGroupItem value="virtual-tryon" id="mode-tryon" className={creationMode === 'virtual-tryon' ? 'border-white' : 'border-black'} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Shirt className="w-5 h-5" />
                            <span className="font-semibold">
                              Virtual Try-On
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${creationMode === 'virtual-tryon' ? 'text-white/70' : 'text-[#0B0B0E]/60'}`}>
                            Try on different clothing items
                          </p>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* NEW: Upload Object/Decor Images (only when object-decor mode) */}
                {creationMode === 'object-decor' && (
                  <div className="space-y-4 p-4 bg-pink-500/5 rounded-lg border border-pink-500/20">
                    <Label className="text-sm text-pink-300 font-semibold">Upload Images</Label>
                    
                    {/* Object Upload */}
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-300">Object Image (Optional)</Label>
                      {uploadedObjectUrl ? (
                        <div className="relative aspect-square w-full rounded-lg overflow-hidden border-2 border-pink-500/50">
                          <ImageWithFallback src={uploadedObjectUrl} alt="Object" className="w-full h-full object-cover" />
                          <Button
                            size="sm"
                            onClick={() => setUploadedObjectUrl(null)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-pink-500/50 rounded-lg cursor-pointer bg-[#0B0B0D] hover:bg-[#1a1a1d] transition-colors">
                          <Upload className="w-8 h-8 mb-2 text-pink-400" />
                          <p className="text-xs text-gray-400">Upload Object</p>
                          <input type="file" className="hidden" accept="image/*" onChange={handleObjectUpload} />
                        </label>
                      )}
                    </div>
                    
                    {/* Decor Upload */}
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-300">Decor Image (Optional)</Label>
                      {uploadedDecorUrl ? (
                        <div className="relative aspect-square w-full rounded-lg overflow-hidden border-2 border-pink-500/50">
                          <ImageWithFallback src={uploadedDecorUrl} alt="Decor" className="w-full h-full object-cover" />
                          <Button
                            size="sm"
                            onClick={() => setUploadedDecorUrl(null)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-pink-500/50 rounded-lg cursor-pointer bg-[#0B0B0D] hover:bg-[#1a1a1d] transition-colors">
                          <Upload className="w-8 h-8 mb-2 text-pink-400" />
                          <p className="text-xs text-gray-400">Upload Decor</p>
                          <input type="file" className="hidden" accept="image/*" onChange={handleDecorUpload} />
                        </label>
                      )}
                    </div>
                  </div>
                )}

                {/* NEW: Upload Clothing Image (only when virtual-tryon mode) */}
                {creationMode === 'virtual-tryon' && (
                  <div className="space-y-4 p-4 bg-pink-500/5 rounded-lg border border-pink-500/20">
                    <Label className="text-sm text-pink-300 font-semibold">Upload Clothing</Label>
                    
                    {uploadedClothingUrl ? (
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden border-2 border-pink-500/50">
                        <ImageWithFallback src={uploadedClothingUrl} alt="Clothing" className="w-full h-full object-cover" />
                        <Button
                          size="sm"
                          onClick={() => setUploadedClothingUrl(null)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 h-6 w-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-pink-500/50 rounded-lg cursor-pointer bg-[#0B0B0D] hover:bg-[#1a1a1d] transition-colors">
                        <Shirt className="w-12 h-12 mb-3 text-pink-400" />
                        <p className="text-sm text-gray-300 font-semibold">Upload Clothing Image</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP</p>
                        <input type="file" className="hidden" accept="image/*" onChange={handleClothingUpload} />
                      </label>
                    )}
                  </div>
                )}

                {/* Number of Images */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-white font-semibold">Number of Images</Label>
                    <span className="text-sm text-purple-400">{numberOfImages[0]} images (~{estimatedTime.toFixed(1)} min)</span>
                  </div>
                  <Slider
                    value={numberOfImages}
                    onValueChange={setNumberOfImages}
                    min={1}
                    max={20}
                    step={1}
                    className="[&_[role=slider]]:bg-purple-500 [&_[role=slider]]:border-purple-500"
                  />
                </div>

                {/* Credit Cost Indicator */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0B0B0D] border border-[#2A2A31] rounded-lg">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-[#E6E7EB]">
                      Credit Cost:
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`
                        ${creationMode === 'default' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-pink-500/10 border-pink-500/30 text-pink-400'}
                        font-semibold px-3 py-1
                      `}
                    >
                      {creationMode === 'default' ? '1 credit' : '2 credits'}
                      {creationMode === 'object-decor' && ' (Gen-4)'}
                      {creationMode === 'virtual-tryon' && ' (Gen-4)'}
                    </Badge>
                    {(creationMode === 'object-decor' || creationMode === 'virtual-tryon') && (
                      <span className="text-xs text-[#A1A1AA]">
                        Advanced AI
                      </span>
                    )}
                  </div>
                </div>

                {/* Generate Button - Sticker CTA XL */}
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('🔵 Generate Photos button clicked');
                    console.log('Prompt:', prompt);
                    console.log('Model ID:', selectedModelId);
                    handleGenerate();
                  }}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full sticker-btn-primary h-14 text-base font-semibold"
                  title={!prompt.trim() ? "Add a prompt and a persona" : ""}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Generate Photos
                    </>
                  )}
                </Button>

                {/* Advanced Options Toggle */}
                <details className="group">
                  <summary className="cursor-pointer text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <span>Advanced Options</span>
                    <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  
                  <div className="mt-4 space-y-4 pt-4 border-t border-white/10">
                    {/* Negative Prompt */}
                    <div className="space-y-2">
                      <Label htmlFor="negative-prompt" className="text-sm text-gray-300">Negative Prompt</Label>
                      <Textarea
                        id="negative-prompt"
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        placeholder="What you don't want in the image..."
                        className="bg-[#0B0B0D] border-gray-700 text-white text-sm resize-none h-20"
                      />
                    </div>

                    {/* Seed */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="use-seed"
                          checked={useSeed}
                          onCheckedChange={(checked) => setUseSeed(checked as boolean)}
                          className="border-purple-500"
                        />
                        <Label htmlFor="use-seed" className="text-sm text-gray-300 cursor-pointer">
                          Use specific seed
                        </Label>
                      </div>
                      {useSeed && (
                        <Input
                          type="number"
                          value={seedNumber}
                          onChange={(e) => setSeedNumber(e.target.value)}
                          placeholder="Enter seed number..."
                          className="bg-[#0B0B0D] border-gray-700 text-white"
                        />
                      )}
                    </div>
                  </div>
                </details>

              </Card>
            </div>

            {/* RIGHT PANEL - Generated Images Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Generated Images</h2>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                  {generatedImages.length} images
                </Badge>
              </div>

              {generatedImages.length === 0 ? (
                <Card className="bg-[#17171B] border-[#2A2A31] p-12">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                      <ImageIcon className="w-8 h-8 text-purple-400" />
                    </div>
                    <p className="text-lg text-white mb-2">No images generated yet</p>
                    <p className="text-sm text-[#A1A1AA] mb-6">Use the form on the left to create your first image</p>
                    <Button
                      onClick={() => {
                        // Optional: scroll to prompt or focus on it
                        document.getElementById('prompt')?.focus();
                      }}
                      className="sticker-btn"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Example
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {generatedImages.map((image) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative aspect-square rounded-lg overflow-hidden bg-[#18181B] border border-white/10 hover:border-purple-500/50 transition-colors"
                    >
                      <img 
                        src={image.url} 
                        alt={image.prompt}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                          <p className="text-xs text-white line-clamp-2">{image.prompt}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1 h-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                              <Download className="w-3 h-3 mr-1" />
                              Save
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                              <Heart className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Pack badge */}
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-purple-500/80 text-white text-xs">
                          {image.packName}
                        </Badge>
                      </div>

                      {/* Seed badge */}
                      {image.seed != null && (
                        <div className="absolute top-2 right-2">
                          <Button
                            size="sm"
                            onClick={() => handleCopySeed(image.seed)}
                            className="h-6 bg-black/50 hover:bg-black/70 text-white text-xs px-2"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            {image.seed}
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROMPTS TAB */}
        {activeTab === 'prompts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Example Prompts & Styles</h2>
              <div className="flex items-center gap-3">
                <Label className="text-sm text-gray-400">Category:</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px] bg-[#18181B] border-purple-500/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#18181B] border-purple-500/30">
                    {CATEGORIES.map(cat => (
                      <SelectItem 
                        key={cat.id} 
                        value={cat.id}
                        className="text-white hover:bg-purple-500/20 cursor-pointer"
                      >
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoadingPhotos ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
              </div>
            ) : examplePhotos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  <ImageIcon className="w-12 h-12 text-purple-400" />
                </div>
                <p className="text-lg text-gray-400">No examples yet for this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {examplePhotos.map((photo, index) => (
                  <div
                    key={photo.id || index}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    className="group relative aspect-square rounded-lg overflow-hidden bg-[#18181B] border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer animate-fade-in-up"
                    onClick={() => handleExampleClick(photo.prompt, photo.seed)}
                  >
                    <img 
                      src={photo.image_url} 
                      alt={photo.prompt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                        <p className="text-xs text-white line-clamp-3">{photo.prompt}</p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-500/80 text-white text-xs">
                            Seed: {photo.seed}
                          </Badge>
                          <Button size="sm" className="flex-1 h-7 bg-purple-500 hover:bg-purple-600 text-white">
                            <Copy className="w-3 h-3 mr-1" />
                            Use Prompt
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVED TAB */}
        {activeTab === 'saved' && (
          <div className="text-center py-20">
            <p className="text-gray-400">Saved images will appear here</p>
          </div>
        )}

        {/* DELETED TAB */}
        {activeTab === 'deleted' && (
          <div className="text-center py-20">
            <p className="text-gray-400">Deleted images will appear here</p>
          </div>
        )}

        {/* MAKE VIDEO TAB - P0: Tab restauré avec composant existant */}
        {activeTab === 'makevideo' && (
          <CreateVideoPage onBack={onBack} />
        )}

      </div>
    </div>
  );
}
