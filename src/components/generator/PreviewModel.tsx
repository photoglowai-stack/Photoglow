import { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { 
  Sparkles,
  Loader2,
  User,
  Palette,
  ImageIcon,
  AlertCircle
} from 'lucide-react';

/**
 * PREVIEW AI MODEL TAB — Auto-Preview Simplifié
 * 
 * Comportement naturel :
 * - Auto-preview sur chaque onChange (debounce 300ms)
 * - Seulement 2-3 attributs requis (gender, hair_length, eye_color)
 * - Seed intelligente : déterministe par défaut, change naturellement
 * - Retry automatique sur 502 (1x), toast seulement si 2 échecs
 * - scaleMode: FIT (pas de crop agressif)
 * - Cadre 1:1 (512×512) pour rendu net
 */

const API_URL = "https://image-generator-api-chi.vercel.app/api/v1-preview.mjs";

interface PreviewMeta {
  seed: string | null;
  px: string | null;
  framing: string | null;
  ratio: string | null;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// FNV-1a 32-bit hash
function fnv1a32(str: string): number {
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

// Dérive une seed stable à partir d'une clé
function deriveSeed(key: string): number {
  return fnv1a32('PGv1|' + key);
}

// Génère une seed aléatoire
function randSeed(): number {
  const u = new Uint32Array(1);
  crypto?.getRandomValues?.(u);
  return (u[0] || Math.floor(Math.random() * 0xffffffff)) >>> 0;
}

// Crée une clé stable à partir des attributs (pour seed déterministe)
function stableKey(attrs: any): string {
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
}

export function PreviewAIModelTab() {
  // ==========================================
  // STATE - Attributs
  // ==========================================
  const [gender, setGender] = useState<'woman' | 'man' | ''>('');
  const [skinTone, setSkinTone] = useState('medium');
  const [hairLength, setHairLength] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [bodyType, setBodyType] = useState('athletic');
  const [bustSize, setBustSize] = useState('medium');
  const [buttSize, setButtSize] = useState('medium');
  const [background, setBackground] = useState('studio');
  const [outfit, setOutfit] = useState('athleisure');
  const [neckline, setNeckline] = useState('vneck');
  const [mood, setMood] = useState('confident');

  // ==========================================
  // STATE - Preview
  // ==========================================
  const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [blobURL, setBlobURL] = useState<string | null>(null);
  const [meta, setMeta] = useState<PreviewMeta>({
    seed: null,
    px: null,
    framing: null,
    ratio: null
  });
  const [error, setError] = useState<string | null>(null);
  const [lastSeed, setLastSeed] = useState<number | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  // ==========================================
  // REFS
  // ==========================================
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentBlobURLRef = useRef<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastRevRef = useRef<number>(0);

  // ==========================================
  // CLEANUP
  // ==========================================
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
  // CHECK REQUIRED FIELDS (Minimal: 2-3 attributs)
  // ==========================================
  const requiredFields = ['gender', 'hair_length', 'eye_color'];
  const isReady = () => {
    return (
      gender && 
      hairLength && 
      eyeColor
    );
  };

  // ==========================================
  // AUTO-PREVIEW avec DEBOUNCE (300ms)
  // ==========================================
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Check required fields
    if (!isReady()) {
      setStatus('idle');
      return;
    }

    // Schedule preview after debounce (300ms)
    debounceTimerRef.current = setTimeout(() => {
      setRetryCount(0); // Reset retry count on new request
      runPreview();
    }, 300);

  }, [gender, skinTone, hairLength, hairColor, eyeColor, bodyType, bustSize, buttSize, background, outfit, neckline, mood]);

  // ==========================================
  // RUN PREVIEW (with auto-retry on 502)
  // ==========================================
  const runPreview = async (isRetry = false) => {
    if (!isReady()) return;

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
    // La seed change automatiquement quand les attributs changent
    const seed = deriveSeed(key);

    // Build payload (minimal, backend gère framing/ratio)
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

    console.log(`[v1-preview] 🎨 Seed: ${seed}, Px: ${px}${isRetry ? ' (retry ' + retryCount + ')' : ''}, Auto-preview...`);

    // Anti-race: increment revision
    const currentRev = ++lastRevRef.current;

    // UI: Start generating (collapse)
    setStatus('generating');
    setError(null);

    try {
      // Add timeout (30s)
      const timeoutId = setTimeout(() => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      }, 30000);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'idempotency-key': String(Date.now())
        },
        body: JSON.stringify(payload),
        signal: abortControllerRef.current.signal
      });

      clearTimeout(timeoutId);

      console.log('[v1-preview] 📡 Response status:', response.status);

      const contentType = response.headers.get('content-type') || '';
      console.log('[v1-preview] 📄 Content-Type:', contentType);

      // Handle error responses
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        let canRetry = false;

        // Check for 502 Bad Gateway or similar temporary errors
        if (response.status === 502 || response.status === 503 || response.status === 504) {
          canRetry = true;
          errorMessage = '⚠️ Provider temporairement indisponible';
        } else {
          try {
            const errorData = await response.json();
            
            if (errorData.error === 'pollinations_failed') {
              const details = errorData.details || '';
              
              // Check if it's a temporary error
              if (details.includes('_500') || details.includes('_502') || details.includes('_503') || details.includes('_504') || 
                  details.includes('Internal Server Error') || details.includes('Bad Gateway')) {
                canRetry = true;
                errorMessage = '⚠️ Provider temporairement surchargé';
              } else {
                errorMessage = 'Erreur provider Pollinations';
              }
            } else if (errorData.error) {
              errorMessage = `Erreur API: ${errorData.error}`;
            }
          } catch (parseError) {
            // If we can't parse JSON, check status code
            if (response.status >= 500 && response.status < 600) {
              canRetry = true;
              errorMessage = '⚠️ Erreur serveur temporaire';
            } else {
              const errorText = await response.text().catch(() => response.statusText);
              errorMessage = `[${response.status}] ${errorText}`;
            }
          }
        }

        // Auto-retry immediat sur 502 (1 seule fois)
        if (canRetry && retryCount === 0) {
          console.log('[v1-preview] 🔄 Auto-retry immédiat (502)...');
          setRetryCount(1);
          setTimeout(() => {
            if (currentRev === lastRevRef.current) {
              runPreview(true);
            }
          }, 500); // Retry immédiat (500ms)
          return;
        }

        // Toast seulement si 2 échecs
        if (retryCount > 0) {
          toast.error('Erreur de génération', {
            description: errorMessage,
            duration: 4000
          });
        }

        throw new Error(errorMessage);
      }

      // Check if this is still the latest request
      if (currentRev !== lastRevRef.current) {
        console.log('[v1-preview] ⏭️ Request outdated, ignoring...');
        return;
      }

      // Verify content type
      if (!contentType.startsWith('image/')) {
        throw new Error(`Expected image/*, got ${contentType}. Proxy mode may not be working.`);
      }

      // Get binary blob
      const blob = await response.blob();
      console.log('[v1-preview] 📦 Blob size:', blob.size, 'bytes');

      // Cleanup old blob URL
      if (currentBlobURLRef.current) {
        URL.revokeObjectURL(currentBlobURLRef.current);
      }

      // Create new blob URL
      const newBlobURL = URL.createObjectURL(blob);
      currentBlobURLRef.current = newBlobURL;

      // Extract metadata from headers
      const returnedSeed = response.headers.get('x-seed');
      const returnedPx = response.headers.get('x-px');
      const returnedFraming = response.headers.get('x-framing');
      const returnedRatio = response.headers.get('x-ratio');

      console.log('[v1-preview] ✅ Success!', { 
        seed: returnedSeed, 
        px: returnedPx, 
        framing: returnedFraming, 
        ratio: returnedRatio 
      });

      // Success toast seulement si retry réussi
      if (retryCount > 0) {
        toast.success('Preview générée avec succès', {
          description: 'Retry réussi',
          duration: 2000
        });
      }

      // Update state
      setBlobURL(newBlobURL);
      setMeta({
        seed: returnedSeed,
        px: returnedPx,
        framing: returnedFraming,
        ratio: returnedRatio
      });
      setLastSeed(seed);
      setStatus('success');

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('[v1-preview] ⏹️ Request aborted');
        return;
      }

      // Network error (Failed to fetch, timeout, etc.)
      const isNetworkError = error.message?.includes('fetch') || 
                             error.message?.includes('network') ||
                             error.name === 'TypeError';

      // Auto-retry on network errors (once)
      if (isNetworkError && retryCount === 0) {
        console.log('[v1-preview] 🔄 Network error, auto-retry...');
        setRetryCount(1);
        setTimeout(() => {
          if (currentRev === lastRevRef.current) {
            runPreview(true);
          }
        }, 1000); // 1s delay for network errors
        return;
      }

      // Show error only after retry attempt
      console.error('[v1-preview] ❌ Error:', error.message || error);
      
      if (retryCount > 0) {
        toast.error('Erreur réseau', {
          description: 'Impossible de générer la preview après retry',
          duration: 4000
        });
      }
      
      setStatus('error');
      setError(error.message || 'Preview generation failed');
    }
  };

  // ==========================================
  // HELPERS
  // ==========================================
  const isHairColorDisabled = hairLength === 'bald';
  const isWomanSpecific = gender === 'woman';
  const missingFields = requiredFields.filter(field => {
    if (field === 'gender') return !gender;
    if (field === 'hair_length') return !hairLength;
    if (field === 'eye_color') return !eyeColor;
    return false;
  });

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-6">
      {/* LEFT - PREVIEW */}
      <Card className="p-6 bg-[#18181B] border-pink-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-pink-400" />
            <h3 className="text-lg text-white">Live Preview</h3>
          </div>
          <Badge variant="outline" className="bg-pink-500/10 text-pink-300 border-pink-500/30 text-xs">
            Auto • 512×512
          </Badge>
        </div>

        {/* Preview Frame with Collapse Animation */}
        <div 
          className={`relative bg-[#0B0B0D] rounded-lg border-2 border-pink-500/20 overflow-hidden transition-all duration-300 ${
            status === 'generating' ? 'scale-95 opacity-60' : 'scale-100 opacity-100'
          }`}
          style={{ 
            aspectRatio: meta.ratio === '3:4' ? '3/4' : '1/1',
            maxHeight: '600px'
          }}
        >
          {status === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-6">
              <Sparkles className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-sm text-center">Sélectionnez les attributs requis</p>
              {missingFields.length > 0 && (
                <div className="mt-3 text-xs text-orange-400">
                  Manquants: {missingFields.join(', ')}
                </div>
              )}
            </div>
          )}

          {status === 'generating' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10">
              <Loader2 className="w-12 h-12 animate-spin text-pink-400 mb-3" />
              <p className="text-sm text-white">Génération en cours...</p>
              <p className="text-xs text-gray-400 mt-1">Auto-preview</p>
            </div>
          )}

          {status === 'success' && blobURL && (
            <img
              src={blobURL}
              alt="Preview"
              className="w-full h-full object-contain"
              style={{ imageRendering: 'auto' }}
            />
          )}

          {status === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 p-6">
              <AlertCircle className="w-12 h-12 mb-3" />
              <p className="text-sm text-center px-4 mb-4">{error}</p>
              <button
                onClick={() => runPreview()}
                className="px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/50 rounded-lg text-pink-300 text-sm transition-colors"
              >
                🔄 Réessayer
              </button>
            </div>
          )}
        </div>

        {/* Metadata */}
        {status === 'success' && meta.seed && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <Badge variant="outline" className="bg-gray-800/50 border-gray-700">
              Seed: {meta.seed}
            </Badge>
            <Badge variant="outline" className="bg-gray-800/50 border-gray-700">
              {meta.px}px
            </Badge>
            <Badge variant="outline" className="bg-gray-800/50 border-gray-700">
              {meta.framing?.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="bg-gray-800/50 border-gray-700">
              {meta.ratio}
            </Badge>
          </div>
        )}

        {/* Info note */}
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
          <div className="flex gap-2 text-xs text-blue-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Auto-preview intelligent • 512×512 (1:1) • Seed naturelle</p>
              <p className="text-blue-300/70">
                Chaque modification déclenche automatiquement une nouvelle génération (300ms). 
                La seed change intelligemment selon vos choix pour un résultat optimal.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* RIGHT - CONTROLS */}
      <div className="space-y-6">
        {/* ATTRIBUTS PHYSIQUES */}
        <Card className="p-6 bg-[#1C2237] border-gray-700 space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg text-white">Attributs Physiques</h3>
            <Badge variant="outline" className="ml-auto bg-red-500/10 text-red-300 border-red-500/30 text-xs">
              Requis
            </Badge>
          </div>

          <div className="space-y-4">
            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-orange-400 text-sm">Gender *</Label>
              <Select value={gender} onValueChange={(v: any) => setGender(v)}>
                <SelectTrigger className="bg-[#2A3449] border-gray-600 text-white">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f2e] border-gray-700">
                  <SelectItem value="woman">👩 Woman</SelectItem>
                  <SelectItem value="man">👨 Man</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Skin Tone */}
            <div className="space-y-2">
              <Label className="text-orange-400 text-sm">Skin Tone</Label>
              <Select value={skinTone} onValueChange={setSkinTone}>
                <SelectTrigger className="bg-[#2A3449] border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f2e] border-gray-700">
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="tan">Tan</SelectItem>
                  <SelectItem value="deep">Deep</SelectItem>
                  <SelectItem value="olive">Olive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Hair Length + Hair Color */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-orange-400 text-sm">Hair Length *</Label>
                <Select value={hairLength} onValueChange={setHairLength}>
                  <SelectTrigger className="bg-[#2A3449] border-gray-600 text-white">
                    <SelectValue placeholder="Choisir..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f2e] border-gray-700">
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                    <SelectItem value="bald">Bald</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className={`text-sm ${isHairColorDisabled ? 'text-gray-500' : 'text-orange-400'}`}>
                  Hair Color {!isHairColorDisabled && '*'}
                </Label>
                <Select value={hairColor} onValueChange={setHairColor} disabled={isHairColorDisabled}>
                  <SelectTrigger className={`border-gray-600 text-white ${isHairColorDisabled ? 'bg-gray-800 opacity-50' : 'bg-[#2A3449]'}`}>
                    <SelectValue placeholder={isHairColorDisabled ? 'N/A' : 'Choisir...'} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f2e] border-gray-700">
                    <SelectItem value="black">🖤 Black</SelectItem>
                    <SelectItem value="brown">🤎 Brown</SelectItem>
                    <SelectItem value="blonde">👱 Blonde</SelectItem>
                    <SelectItem value="red">❤️ Red</SelectItem>
                    <SelectItem value="gray">🩶 Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Eye Color */}
            <div className="space-y-2">
              <Label className="text-orange-400 text-sm">Eye Color *</Label>
              <Select value={eyeColor} onValueChange={setEyeColor}>
                <SelectTrigger className="bg-[#2A3449] border-gray-600 text-white">
                  <SelectValue placeholder="Choisir..." />
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

            {/* Body Type */}
            <div className="space-y-2">
              <Label className="text-orange-400 text-sm">Body Type</Label>
              <Select value={bodyType} onValueChange={setBodyType}>
                <SelectTrigger className="bg-[#2A3449] border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f2e] border-gray-700">
                  <SelectItem value="athletic">Athletic</SelectItem>
                  <SelectItem value="slim">Slim</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="curvy">Curvy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Woman-specific: Bust Size + Butt Size */}
            {isWomanSpecific && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-orange-400 text-sm">Bust Size</Label>
                  <Select value={bustSize} onValueChange={setBustSize}>
                    <SelectTrigger className="bg-[#2A3449] border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1f2e] border-gray-700">
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-orange-400 text-sm">Butt Size</Label>
                  <Select value={buttSize} onValueChange={setButtSize}>
                    <SelectTrigger className="bg-[#2A3449] border-gray-600 text-white">
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
            )}
          </div>
        </Card>

        {/* STYLE & APPARENCE */}
        <Card className="p-6 bg-[#1C2237] border-gray-700 space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg text-white">Style & Apparence</h3>
          </div>

          <div className="space-y-4">
            {/* Background */}
            <div className="space-y-2">
              <Label className="text-purple-400 text-sm">Background</Label>
              <Select value={background} onValueChange={setBackground}>
                <SelectTrigger className="bg-[#2A3449] border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f2e] border-gray-700">
                  <SelectItem value="studio">🎬 Studio</SelectItem>
                  <SelectItem value="outdoor">🌳 Outdoor</SelectItem>
                  <SelectItem value="urban">🏙️ Urban</SelectItem>
                  <SelectItem value="indoor">🏠 Indoor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Outfit */}
            <div className="space-y-2">
              <Label className="text-purple-400 text-sm">Outfit</Label>
              <Select value={outfit} onValueChange={setOutfit}>
                <SelectTrigger className="bg-[#2A3449] border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f2e] border-gray-700">
                  <SelectItem value="tee">👕 Tee</SelectItem>
                  <SelectItem value="shirt">👔 Shirt</SelectItem>
                  <SelectItem value="blazer">🧥 Blazer</SelectItem>
                  <SelectItem value="athleisure">🏃 Athleisure</SelectItem>
                  <SelectItem value="dress">👗 Dress</SelectItem>
                  <SelectItem value="casual">👖 Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Woman-specific: Neckline */}
            {isWomanSpecific && (
              <div className="space-y-2">
                <Label className="text-purple-400 text-sm">Neckline</Label>
                <Select value={neckline} onValueChange={setNeckline}>
                  <SelectTrigger className="bg-[#2A3449] border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f2e] border-gray-700">
                    <SelectItem value="crew">Crew</SelectItem>
                    <SelectItem value="vneck">V-Neck</SelectItem>
                    <SelectItem value="scoop">Scoop</SelectItem>
                    <SelectItem value="plunge">Plunge</SelectItem>
                    <SelectItem value="strapless">Strapless</SelectItem>
                    <SelectItem value="sleeveless">Sleeveless</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Mood */}
            <div className="space-y-2">
              <Label className="text-purple-400 text-sm">Mood</Label>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger className="bg-[#2A3449] border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f2e] border-gray-700">
                  <SelectItem value="confident">😎 Confident</SelectItem>
                  <SelectItem value="happy">😊 Happy</SelectItem>
                  <SelectItem value="serious">😐 Serious</SelectItem>
                  <SelectItem value="mysterious">😏 Mysterious</SelectItem>
                  <SelectItem value="playful">😜 Playful</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
