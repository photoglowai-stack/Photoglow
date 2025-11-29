/**
 * PATCH POUR AIPhotoGenerator.tsx
 * 
 * Ce fichier contient les snippets de code à ajouter dans AIPhotoGenerator.tsx
 * pour implémenter les fonctionnalités :
 * - Modes exclusifs (Add Object/Decor vs Virtual Try-On)
 * - Zones d'upload pour object, decor, clothing
 * - Bouton "Generate Video" sur chaque image
 * 
 * INSTRUCTIONS D'INSTALLATION : Voir INSTALLATION_GUIDE.md
 */

// ============================================
// 1. AJOUTER DANS LES IMPORTS (ligne ~25)
// ============================================
/*
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
  Palette,        // NOUVEAU
  PackagePlus,    // NOUVEAU
  Video           // NOUVEAU
} from 'lucide-react';
*/

// ============================================
// 2. AJOUTER DANS LES STATES (après ligne ~127)
// ============================================
/*
  // New: Exclusive modes for object/decor vs try-on
  const [creationMode, setCreationMode] = useState<'default' | 'object-decor' | 'virtual-tryon'>('default');
  const [uploadedObjectUrl, setUploadedObjectUrl] = useState<string | null>(null);
  const [uploadedDecorUrl, setUploadedDecorUrl] = useState<string | null>(null);
  const [uploadedClothingUrl, setUploadedClothingUrl] = useState<string | null>(null);
*/

// ============================================
// 3. AJOUTER APRÈS handleClothesUpload (ligne ~247)
// ============================================
/*
  // New: Handle object upload with Supabase signed URL
  const handleObjectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!session?.access_token) {
      toast.error('Please sign in to upload images');
      return;
    }

    try {
      const signedUrlResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/upload-signed-url`,
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
        throw new Error('Failed to get upload URL');
      }

      const { signedUrl, publicUrl } = await signedUrlResponse.json();

      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload object image');
      }

      setUploadedObjectUrl(publicUrl);
      toast.success('Object image uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading object:', error);
      toast.error('Failed to upload object image');
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
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/upload-signed-url`,
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
        throw new Error('Failed to get upload URL');
      }

      const { signedUrl, publicUrl } = await signedUrlResponse.json();

      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload decor image');
      }

      setUploadedDecorUrl(publicUrl);
      toast.success('Decor image uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading decor:', error);
      toast.error('Failed to upload decor image');
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
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/upload-signed-url`,
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
        throw new Error('Failed to get upload URL');
      }

      const { signedUrl, publicUrl } = await signedUrlResponse.json();

      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload clothing image');
      }

      setUploadedClothingUrl(publicUrl);
      toast.success('Clothing image uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading clothing:', error);
      toast.error('Failed to upload clothing image');
    }
  };
*/

// ============================================
// 4. MODIFIER handleGenerate - Ajouter dans body (ligne ~484-488)
// ============================================
/*
body: JSON.stringify({
  prompt: prompt,
  negative_prompt: negativePrompt || undefined,
  num_outputs: numberOfImages[0],
  // NEW: Add object/decor/clothing URLs based on creation mode
  ...(creationMode === 'object-decor' && uploadedObjectUrl && { object_url: uploadedObjectUrl }),
  ...(creationMode === 'object-decor' && uploadedDecorUrl && { decor_url: uploadedDecorUrl }),
  ...(creationMode === 'virtual-tryon' && uploadedClothingUrl && { clothing_url: uploadedClothingUrl }),
  mode: 'img2img',
  prompt_final: prompt
})
*/

// ============================================
// 5. AJOUTER DANS LE JSX - AVANT "Number of Images" (ligne ~1168)
// ============================================

export const CreationModeSection = `
                {/* NEW: Creation Mode Selection */}
                <div className="space-y-4 p-4 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-lg border border-pink-500/20">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-pink-400" />
                    <Label className="font-semibold text-white">Creation Mode</Label>
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
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#0B0B0D] border border-gray-700 hover:border-pink-500/50 transition-colors">
                        <RadioGroupItem value="default" id="mode-default" className="border-pink-400" />
                        <Label htmlFor="mode-default" className="flex-1 cursor-pointer text-white">
                          Standard Generation
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#0B0B0D] border border-gray-700 hover:border-pink-500/50 transition-colors">
                        <RadioGroupItem value="object-decor" id="mode-object" className="border-pink-400" />
                        <Label htmlFor="mode-object" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <PackagePlus className="w-4 h-4 text-pink-400" />
                            <span className="font-semibold text-white">Add Object / Decor</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Add objects or decorations to the scene</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#0B0B0D] border border-gray-700 hover:border-pink-500/50 transition-colors">
                        <RadioGroupItem value="virtual-tryon" id="mode-tryon" className="border-pink-400" />
                        <Label htmlFor="mode-tryon" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Shirt className="w-4 h-4 text-pink-400" />
                            <span className="font-semibold text-white">Virtual Try-On</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Try on different clothing items</p>
                        </Label>
                      </div>
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
`;

// ============================================
// 6. BOUTON VIDÉO SUR LES IMAGES (exemple dans Prompts tab)
// ============================================
/*
// À ajouter sur chaque image générée (dans la carte d'image)
<Button
  size="sm"
  onClick={(e) => {
    e.stopPropagation();
    // Rediriger vers create-video avec l'URL de l'image
    window.location.href = `/create-video?image=${encodeURIComponent(photo.image_url)}`;
  }}
  className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
>
  <Video className="w-3 h-3 mr-1" />
  Video
</Button>
*/

export default {};
