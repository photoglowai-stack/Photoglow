import { useState } from 'react';
import { Header } from '../shared/Header';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import {
  Wand2,
  Activity,
  ImageIcon,
  Sparkles,
  Upload,
  Loader2,
  CheckCircle2,
  X,
  Trash2,
  AlertCircle,
  Terminal
} from 'lucide-react';
import HealthCheckPanel from './HealthCheckPanel';
import { GenerateJobsTab } from './GenerateJobsTab';
// import { PreviewAIModelTab } from './PreviewAIModelTab';  // TODO: File missing
import { AdminConsole } from './AdminConsole';
import { AdminGenerateTab } from './AdminGenerateTab';
// import { AdminGenerateIdeasSimple } from './AdminGenerateIdeasSimple';  // TODO: File missing
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../../utils/supabase/client';
import { API_ENDPOINTS } from '../../utils/config';
import { projectId } from '../../utils/supabase/info';

type TabType = 'generate' | 'gallery' | 'health' | 'preview-model' | 'categories';

interface GeneratedImage {
  id: string;
  image_url: string;
  created_at: string;
  prompt?: string;
  model?: string;
}

interface AIModel {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'training' | 'trained' | 'failed';
  photos: Array<{ id: string; url: string; filename: string; uploaded_at: string }>;
  training_progress?: number;
  created_at: string;
  updated_at: string;
}

export function AdminV2Unified({ onBack }: { onBack?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('generate');

  // Console state
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  // Generate tab state - GEN4 vs FLUX
  const [selectedModel, setSelectedModel] = useState<'flux' | 'gen4'>('flux');
  const [prompt, setPrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [referenceImagePreview, setReferenceImagePreview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<string>('');
  const [generatedItems, setGeneratedItems] = useState<GeneratedImage[]>([]);

  // Gallery state
  const [galleryImages, setGalleryImages] = useState<GeneratedImage[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);

  // Handle reference image upload
  const handleReferenceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setReferenceImage(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setReferenceImagePreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Upload file to Supabase Storage
  const uploadToSupabase = async (file: File | null): Promise<string | null> => {
    if (!file) return null;

    try {
      const path = `uploads/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

      const { data, error } = await supabase.storage
        .from("photos")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (error) {
        console.error("Upload error:", error);
        toast.error(`Upload failed: ${error.message}`);
        return null;
      }

      const { data: pub } = supabase.storage
        .from("photos")
        .getPublicUrl(path);

      return pub?.publicUrl ?? null;
    } catch (error: any) {
      console.error("Upload exception:", error);
      toast.error(`Upload exception: ${error.message}`);
      return null;
    }
  };

  // Generate image with FLUX or GEN4
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    try {
      let imageUrl = '';

      if (selectedModel === 'flux') {
        // FLUX via v1-preview (Pollinations)
        console.log('🎬 Using FLUX via v1-preview');

        // Upload reference image if provided
        let referenceUrl = null;
        if (referenceImage) {
          toast.info("Uploading reference image...");
          referenceUrl = await uploadToSupabase(referenceImage);
        }

        const payload: any = {
          prompt: prompt,
          proxy: true,  // Binary JPEG mode
          fast: true,
          safe: false,
          ratio: '1:1',
          px: 512,
          seed: Math.floor(Math.random() * 1000000),
        };

        if (referenceUrl) {
          payload.reference_images = [referenceUrl];
        }

        console.log('📤 FLUX payload:', payload);

        const { data: session } = await supabase.auth.getSession();

        const res = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/v1-preview`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${session?.session?.access_token || ''}`
            },
            body: JSON.stringify(payload)
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `HTTP ${res.status}`);
        }

        const blob = await res.blob();
        imageUrl = URL.createObjectURL(blob);

      } else if (selectedModel === 'gen4') {
        // GEN4 via Replicate
        console.log('🎬 Using GEN4 via Replicate');

        // Upload reference images
        let referenceUrls: string[] = [];
        if (referenceImage) {
          toast.info("Uploading reference image...");
          const url = await uploadToSupabase(referenceImage);
          if (url) referenceUrls.push(url);
        }

        const mode = referenceUrls.length > 0 ? 'img2img' : 'text2img';

        const payload = {
          mode,
          model: 'gen4',
          prompt_final: prompt,
          reference_images: referenceUrls.length > 0 ? referenceUrls : undefined,
          aspect_ratio: '1:1'
        };

        console.log('📤 GEN4 payload:', payload);

        const res = await fetch(API_ENDPOINTS.generateGen4, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok || !data.image_url) {
          throw new Error(data.error || 'Gen4 generation failed');
        }

        imageUrl = data.image_url;
      }

      // Save to preview and gallery
      setGeneratedPreview(imageUrl);

      const newItem: GeneratedImage = {
        id: crypto.randomUUID(),
        image_url: imageUrl,
        prompt,
        model: selectedModel,
        created_at: new Date().toISOString()
      };

      setGeneratedItems(prev => [newItem, ...prev]);

      // Optionally save to Supabase
      const { data: session } = await supabase.auth.getSession();
      if (session?.session?.user?.id) {
        await supabase
          .from('gallery_photos')
          .insert({
            user_id: session.session.user.id,
            image_url: imageUrl,
            prompt: prompt,
            model: selectedModel,
          });
      }

      toast.success(`✨ Image generated with ${selectedModel.toUpperCase()}!`);

    } catch (error: any) {
      console.error('❌ Generation error:', error);
      toast.error(error.message || 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  // Load gallery images
  const loadGallery = async () => {
    setIsLoadingGallery(true);
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (error: any) {
      console.error('Error loading gallery:', error);
      toast.error('Failed to load gallery');
    } finally {
      setIsLoadingGallery(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onShowLanding={onBack} currentPage="admin" />

      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent mb-2">
                  PhotoGlow Admin Panel
                </h1>
                <p className="text-gray-400">
                  Generate AI images, manage models, and monitor system health
                </p>
              </div>
              <Button
                onClick={() => setActiveTab('categories')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                🎨 Generate Category Images
              </Button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Button
              onClick={() => setActiveTab('generate')}
              variant={activeTab === 'generate' ? 'default' : 'outline'}
              className="whitespace-nowrap"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Generate
            </Button>
            <Button
              onClick={() => {
                setActiveTab('gallery');
                loadGallery();
              }}
              variant={activeTab === 'gallery' ? 'default' : 'outline'}
              className="whitespace-nowrap"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Gallery
            </Button>
            <Button
              onClick={() => setActiveTab('health')}
              variant={activeTab === 'health' ? 'default' : 'outline'}
              className="whitespace-nowrap"
            >
              <Activity className="w-4 h-4 mr-2" />
              Health Check
            </Button>
            <Button
              onClick={() => setActiveTab('preview-model')}
              variant={activeTab === 'preview-model' ? 'default' : 'outline'}
              className="whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              PREVIEW MODEL
            </Button>
            <Button
              onClick={() => setActiveTab('categories')}
              variant={activeTab === 'categories' ? 'default' : 'outline'}
              className="whitespace-nowrap bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30"
            >
              🎨 Categories
            </Button>
          </div>

          {/* Tab Content */}
          {activeTab === 'generate' && (
            <AdminGenerateTab />
          )}

          {activeTab === 'preview-model' && (
            <div className="text-white p-8 text-center">Preview Model Tab - TODO</div>
          )}

          {activeTab === 'categories' && (
            <div className="text-white p-8 text-center">Categories Tab - TODO</div>
          )}

          {/* OLD GENERATE TAB - REPLACED WITH JOBS API */}
          {false && (
            <div className="grid lg:grid-cols-[420px_1fr] gap-6">
              {/* LEFT PANEL - Form Controls */}
              <Card className="bg-[#18181B] border-purple-500/30 p-6 space-y-6 h-fit">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl text-white">Generate Image</h3>
                </div>

                {/* Model Selection: FLUX vs GEN4 */}
                <div className="space-y-3">
                  <Label className="text-white">AI Model</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedModel('flux')}
                      className={`p-4 rounded-lg border-2 transition-all ${selectedModel === 'flux'
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-purple-500/30 bg-[#0B0B0D] hover:border-purple-500/50'
                        }`}
                    >
                      <div className="text-center">
                        <Sparkles className={`w-6 h-6 mx-auto mb-2 ${selectedModel === 'flux' ? 'text-purple-400' : 'text-gray-400'}`} />
                        <p className={`text-sm font-semibold ${selectedModel === 'flux' ? 'text-white' : 'text-gray-400'}`}>FLUX</p>
                        <p className="text-xs text-gray-500 mt-1">Pollinations</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedModel('gen4')}
                      className={`p-4 rounded-lg border-2 transition-all ${selectedModel === 'gen4'
                          ? 'border-pink-500 bg-pink-500/20'
                          : 'border-pink-500/30 bg-[#0B0B0D] hover:border-pink-500/50'
                        }`}
                    >
                      <div className="text-center">
                        <Wand2 className={`w-6 h-6 mx-auto mb-2 ${selectedModel === 'gen4' ? 'text-pink-400' : 'text-gray-400'}`} />
                        <p className={`text-sm font-semibold ${selectedModel === 'gen4' ? 'text-white' : 'text-gray-400'}`}>GEN-4</p>
                        <p className="text-xs text-gray-500 mt-1">Runway</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Prompt */}
                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-white">Prompt</Label>
                  <Textarea
                    id="prompt"
                    className="bg-[#0B0B0D] border-purple-500/30 text-white min-h-[120px]"
                    placeholder="professional portrait, cinematic lighting, 85mm lens..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                {/* Reference Image Upload */}
                <div className="space-y-2">
                  <Label className="text-white">Reference Image (Optional)</Label>
                  <p className="text-xs text-gray-400">Upload an image to use as reference</p>

                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-purple-500/30 rounded-lg cursor-pointer hover:border-purple-500/50 bg-[#0B0B0D] transition-colors relative">
                    {referenceImagePreview ? (
                      <>
                        <img src={referenceImagePreview} alt="Reference" className="w-full h-full object-cover rounded-lg" />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setReferenceImage(null);
                            setReferenceImagePreview('');
                          }}
                          className="absolute top-2 right-2 bg-red-500 rounded-full p-2 hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-10 h-10 text-purple-400 mb-2" />
                        <span className="text-sm text-gray-400">Click to upload image</span>
                        <span className="text-xs text-gray-500 mt-1">JPG, PNG (max 10MB)</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleReferenceImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className={`w-full ${selectedModel === 'flux'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      : 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600'
                    }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating with {selectedModel.toUpperCase()}...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate with {selectedModel.toUpperCase()}
                    </>
                  )}
                </Button>
              </Card>

              {/* RIGHT PANEL - Generated Images */}
              <div className="space-y-6">
                {/* Preview */}
                {generatedPreview && (
                  <Card className="bg-[#18181B] border-purple-500/30 p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <h3 className="text-xl text-white">Latest Generation</h3>
                      </div>
                      <img
                        src={generatedPreview}
                        alt="Generated preview"
                        className="w-full rounded-lg shadow-xl"
                      />
                    </div>
                  </Card>
                )}

                {/* Gallery */}
                {generatedItems.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-purple-400" />
                      <h3 className="text-xl text-white">Generated Images</h3>
                      <span className="text-sm text-gray-400">({generatedItems.length})</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {generatedItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden bg-[#18181B] border-purple-500/20 hover:border-purple-500/50 transition-colors">
                          <img
                            src={item.image_url}
                            alt={item.prompt}
                            className="w-full aspect-square object-cover"
                          />
                          <div className="p-3 space-y-1">
                            <p className="text-xs text-gray-300 line-clamp-2">
                              {item.prompt}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {new Date(item.created_at).toLocaleString()}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl text-white">Generated Images</h2>
                  <Button onClick={loadGallery} variant="outline" size="sm">
                    Refresh
                  </Button>
                </div>

                {isLoadingGallery ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                  </div>
                ) : galleryImages.length === 0 ? (
                  <p className="text-center text-gray-400 py-12">
                    No images yet. Generate some images first!
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((img) => (
                      <Card key={img.id} className="overflow-hidden bg-[#18181B] border-purple-500/20">
                        <img
                          src={img.image_url}
                          alt={img.prompt || 'Generated image'}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="p-3 space-y-1">
                          <p className="text-xs text-gray-300 line-clamp-2">
                            {img.prompt || 'No prompt'}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {new Date(img.created_at).toLocaleString()}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}

          {activeTab === 'health' && (
            <HealthCheckPanel />
          )}

          {/* OLD CREATE MODEL CODE - REPLACED */}
          {false && (
            <div className="space-y-6">
              {/* Saved Models List */}
              <Card className="bg-gray-900 border-gray-800 p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-400" />
                    <h2 className="text-xl text-white">Your Models</h2>
                  </div>

                  {isLoadingModels ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                    </div>
                  ) : savedModels.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">
                      No models yet. Create your first model below!
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {savedModels.map((model) => (
                        <div key={model.id} className="flex items-center justify-between p-3 rounded-lg bg-[#0B0B0D] border border-gray-700">
                          <div>
                            <p className="text-sm text-white">{model.name}</p>
                            <p className="text-xs text-gray-400">
                              {model.gender} • {model.photo_count || 0} photos
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteModel(model.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>

              {/* Create New Model - 2 Columns Layout */}
              <div className="grid lg:grid-cols-[420px_1fr] gap-6">
                {/* LEFT PANEL - Model Attributes & Preview */}
                <Card className="bg-gray-900 border-gray-800 p-6 space-y-4 h-fit">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg text-white">Preview Model</h3>
                  </div>

                  {/* Preview Prompt */}
                  <div className="space-y-2">
                    <Label className="text-white text-xs">Preview Prompt</Label>
                    <Textarea
                      className="bg-[#0B0B0D] border-purple-500/30 text-white min-h-[60px] text-sm"
                      placeholder="professional headshot, studio lighting"
                      value={modelPreviewPrompt}
                      onChange={(e) => setModelPreviewPrompt(e.target.value)}
                    />
                  </div>

                  {/* Physical Attributes */}
                  <div className="space-y-3 p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                    <h4 className="text-sm text-orange-400 font-semibold flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Attributs Physiques
                    </h4>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Gender */}
                      <div className="space-y-2 col-span-2">
                        <Label className="text-xs text-orange-400">Gender</Label>
                        <Select value={modelGender} onValueChange={setModelGender}>
                          <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1f2e] border-gray-700">
                            <SelectItem value="woman">👩 Woman</SelectItem>
                            <SelectItem value="man">👨 Man</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Eye Color */}
                      <div className="space-y-2">
                        <Label className="text-xs text-orange-400">Eye Color</Label>
                        <Select value={modelEyeColor} onValueChange={setModelEyeColor}>
                          <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1f2e] border-gray-700">
                            <SelectItem value="brown">🟤 Brown</SelectItem>
                            <SelectItem value="blue">🔵 Blue</SelectItem>
                            <SelectItem value="green">🟢 Green</SelectItem>
                            <SelectItem value="hazel">🟡 Hazel</SelectItem>
                            <SelectItem value="gray">⚪ Gray</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Hair Color */}
                      <div className="space-y-2">
                        <Label className="text-xs text-orange-400">Hair Color</Label>
                        <Select value={modelHairColor} onValueChange={setModelHairColor}>
                          <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1f2e] border-gray-700">
                            <SelectItem value="blonde">🟡 Blonde</SelectItem>
                            <SelectItem value="brown">🤎 Brown</SelectItem>
                            <SelectItem value="black">🖤 Black</SelectItem>
                            <SelectItem value="red">❤️ Red</SelectItem>
                            <SelectItem value="gray">🩶 Gray</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Hair Length */}
                      <div className="space-y-2">
                        <Label className="text-xs text-orange-400">Hair Length</Label>
                        <Select value={modelHairLength} onValueChange={setModelHairLength}>
                          <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1f2e] border-gray-700">
                            <SelectItem value="bald">🪒 Bald</SelectItem>
                            <SelectItem value="short">✂️ Short</SelectItem>
                            <SelectItem value="medium">💇 Medium</SelectItem>
                            <SelectItem value="long">👸 Long</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Skin Tone */}
                      <div className="space-y-2">
                        <Label className="text-xs text-orange-400">Skin Tone</Label>
                        <Select value={modelSkinTone} onValueChange={setModelSkinTone}>
                          <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1f2e] border-gray-700">
                            <SelectItem value="light">🏻 Light</SelectItem>
                            <SelectItem value="fair">🤍 Fair</SelectItem>
                            <SelectItem value="medium">🏼 Medium</SelectItem>
                            <SelectItem value="tan">🏾 Tan</SelectItem>
                            <SelectItem value="deep">🏿 Deep</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Body Type */}
                      <div className="space-y-2">
                        <Label className="text-xs text-orange-400">Body Type</Label>
                        <Select value={modelBodyType} onValueChange={setModelBodyType}>
                          <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1f2e] border-gray-700">
                            <SelectItem value="athletic">💪 Athletic</SelectItem>
                            <SelectItem value="slim">🌱 Slim</SelectItem>
                            <SelectItem value="average">👤 Average</SelectItem>
                            <SelectItem value="curvy">🍑 Curvy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Bust Size */}
                      <div className="space-y-2">
                        <Label className="text-xs text-orange-400">Bust Size</Label>
                        <Select value={modelBustSize} onValueChange={setModelBustSize}>
                          <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1f2e] border-gray-700">
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Butt Size */}
                      <div className="space-y-2">
                        <Label className="text-xs text-orange-400">Butt Size</Label>
                        <Select value={modelButtSize} onValueChange={setModelButtSize}>
                          <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1f2e] border-gray-700">
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Scene & Style */}
                  <div className="space-y-3 p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                    <h4 className="text-sm text-orange-400 font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Scene & Style
                    </h4>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Background */}
                      <div className="space-y-2">
                        <Label className="text-xs text-orange-400">Background</Label>
                        <Select value={modelBackground} onValueChange={setModelBackground}>
                          <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white h-9">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1f2e] border-gray-700">
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="outdoor">Outdoor</SelectItem>
                            <SelectItem value="urban">Urban</SelectItem>
                            <SelectItem value="nature">Nature</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Outfit */}
                      <div className="space-y-2">
                        <Label className="text-xs text-orange-400">Outfit</Label>
                        <Select value={modelOutfit} onValueChange={setModelOutfit}>
                          <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white h-9">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1f2e] border-gray-700">
                            <SelectItem value="tee">T-shirt</SelectItem>
                            <SelectItem value="dress">Dress</SelectItem>
                            <SelectItem value="suit">Suit</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Mood */}
                      <div className="space-y-2 col-span-2">
                        <Label className="text-xs text-orange-400">Mood</Label>
                        <Select value={modelMood} onValueChange={setModelMood}>
                          <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white h-9">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1f2e] border-gray-700">
                            <SelectItem value="neutral">😐 Neutral</SelectItem>
                            <SelectItem value="friendly">😊 Friendly</SelectItem>
                            <SelectItem value="confident">😎 Confident</SelectItem>
                            <SelectItem value="serious">😐 Serious</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Preview Button */}
                  <Button
                    onClick={handlePreviewModel}
                    disabled={isPreviewingModel || !modelPreviewPrompt.trim()}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                  >
                    {isPreviewingModel ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Preview...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Preview Model
                      </>
                    )}
                  </Button>
                </Card>

                {/* RIGHT PANEL - Preview + Create Form */}
                <div className="space-y-6">
                  {/* Preview Image */}
                  {modelPreviewImage && (
                    <Card className="bg-gray-900 border-gray-800 p-6">
                      <div className="space-y-3">
                        <h3 className="text-lg text-white flex items-center gap-2">
                          <ImageIcon className="w-5 h-5 text-purple-400" />
                          Model Preview
                        </h3>
                        <img
                          src={modelPreviewImage}
                          alt="Model preview"
                          className="w-full rounded-lg shadow-xl"
                        />
                      </div>
                    </Card>
                  )}

                  {/* Create Model Form */}
                  <Card className="bg-gray-900 border-gray-800 p-6 space-y-4">
                    <h3 className="text-lg text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-purple-400" />
                      Create New Model
                    </h3>

                    {/* Model Name */}
                    <div className="space-y-2">
                      <Label htmlFor="modelName" className="text-white">Model Name</Label>
                      <Input
                        id="modelName"
                        className="bg-[#0B0B0D] border-purple-500/30 text-white"
                        placeholder="e.g., Sarah Summer"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                      />
                      <p className="text-xs text-gray-400">
                        This model will use the attributes configured in the preview panel
                      </p>
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <Label className="text-white flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Photos (minimum 5)
                      </Label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePhotoUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center hover:border-purple-500/50 transition-colors">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                          <p className="text-sm text-gray-300">
                            {uploadedPhotos.length > 0
                              ? `${uploadedPhotos.length} photo(s) uploaded`
                              : 'Click to upload photos'
                            }
                          </p>
                        </div>
                      </div>

                      {/* Photo Previews */}
                      {uploadedPhotos.length > 0 && (
                        <div className="grid grid-cols-5 gap-2 mt-3">
                          {uploadedPhotos.map((photo, idx) => (
                            <div key={idx} className="relative aspect-square">
                              <img
                                src={photo}
                                alt={`Upload ${idx + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                onClick={() => setUploadedPhotos(prev => prev.filter((_, i) => i !== idx))}
                                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                              >
                                <X className="w-3 h-3 text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Create Button */}
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={handleCreateModel}
                        disabled={!modelName.trim() || uploadedPhotos.length < 5 || isCreatingModel}
                        className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        {isCreatingModel ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Create Model
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOUTON TOGGLE CONSOLE - Fixe en bas à gauche */}
      <button
        onClick={() => setIsConsoleOpen(!isConsoleOpen)}
        className="fixed bottom-6 left-6 z-[9998] bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
        title={isConsoleOpen ? 'Fermer la console' : 'Ouvrir la console'}
      >
        <Terminal className="w-6 h-6" />
        {!isConsoleOpen && (
          <Badge
            variant="outline"
            className="absolute -top-1 -right-1 bg-orange-500 text-white border-orange-600 text-xs px-2"
          >
            Debug
          </Badge>
        )}
      </button>

      {/* ADMIN CONSOLE - Flotant en bas à droite */}
      <AdminConsole isOpen={isConsoleOpen} onClose={() => setIsConsoleOpen(false)} />
    </div>
  );
}
