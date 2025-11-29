import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Wand2, 
  Upload, 
  Sparkles,
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  Zap,
  Video,
  Crown
} from 'lucide-react';
import svgPaths from "../imports/svg-cvedlvvamu";
import { toast } from 'sonner@2.0.3';

type AIModel = 'flux' | 'runway' | 'gen4';
type PhotoType = 'selfie' | 'fullbody' | 'portrait';

interface AdminGenerateTabProps {
  credits?: number;
}

export function AdminGenerateTab({ credits = 150 }: AdminGenerateTabProps) {
  const [selectedModel, setSelectedModel] = useState<AIModel>('flux');
  const [selectedPhotoType, setSelectedPhotoType] = useState<PhotoType>('selfie');
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [isTestMode, setIsTestMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const aiModels = [
    {
      id: 'flux' as AIModel,
      name: 'Flux',
      icon: Sparkles,
      description: 'Ultra-realistic photos',
      gradient: 'from-purple-500 to-pink-500',
      cost: 5,
      badge: 'FAST'
    },
    {
      id: 'runway' as AIModel,
      name: 'Runway',
      icon: Video,
      description: 'Video & Motion',
      gradient: 'from-blue-500 to-cyan-500',
      cost: 15,
      badge: 'VIDEO'
    },
    {
      id: 'gen4' as AIModel,
      name: 'Gen-4',
      icon: Crown,
      description: 'Premium Quality',
      gradient: 'from-orange-500 to-red-500',
      cost: 10,
      badge: 'PRO'
    }
  ];

  const photoTypes = [
    { id: 'selfie' as PhotoType, label: 'Selfie', emoji: '🤳' },
    { id: 'fullbody' as PhotoType, label: 'Full Body', emoji: '🧍' },
    { id: 'portrait' as PhotoType, label: 'Portrait', emoji: '👤' }
  ];

  const quickPrompts = [
    '🏖️ Beach sunset vibes',
    '🌆 Urban street style',
    '🎨 Artistic portrait',
    '💼 Professional headshot',
    '🌸 Dreamy aesthetic'
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + uploadedPhotos.length > 5) {
      toast.error('Maximum 5 photos allowed');
      return;
    }
    setUploadedPhotos([...uploadedPhotos, ...files]);
    toast.success(`${files.length} photo(s) uploaded`);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }
    if (uploadedPhotos.length === 0) {
      toast.error('Please upload at least one reference photo');
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      setGeneratedImage('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=512&h=512&fit=crop');
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] pb-20">
      {/* Header - Responsive */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">PhotoGlow Admin</h1>
              <p className="text-xs md:text-sm text-white/80">AI Generation Studio</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-semibold text-white">{credits} Credits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6">
        {/* AI Model Selection */}
        <Card className="bg-[#17171B] border-[#2A2A31] p-4 md:p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg md:text-xl font-bold text-[#E6E7EB]">Sélection du Modèle IA</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {aiModels.map((model) => {
                const Icon = model.icon;
                const isSelected = selectedModel === model.id;
                
                return (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`relative p-4 md:p-5 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-[#2A2A31] bg-[#0B0B0D] hover:border-purple-500/50'
                    }`}
                  >
                    {/* Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge className={`text-xs bg-gradient-to-r ${model.gradient} border-0 text-white`}>
                        {model.badge}
                      </Badge>
                    </div>

                    {/* Icon */}
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${model.gradient} flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="text-left">
                      <h3 className="text-base md:text-lg font-bold text-[#E6E7EB] mb-1">{model.name}</h3>
                      <p className="text-xs md:text-sm text-[#A1A1AA] mb-2">{model.description}</p>
                      <div className="flex items-center gap-1 text-purple-400">
                        <Zap className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="text-xs md:text-sm font-semibold">{model.cost} credits</span>
                      </div>
                    </div>

                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute top-2 left-2">
                        <CheckCircle2 className="w-5 h-5 text-purple-400" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Photos de Référence */}
        <Card className="bg-[#17171B] border-[#2A2A31] p-4 md:p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-pink-400" />
              <h2 className="text-lg md:text-xl font-bold text-[#E6E7EB]">Photos de Référence</h2>
            </div>

            {/* Photo Type Selection */}
            <div className="flex flex-wrap gap-2">
              {photoTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedPhotoType(type.id)}
                  className={`px-4 py-2 rounded-lg border transition-all text-sm ${
                    selectedPhotoType === type.id
                      ? 'border-pink-500 bg-pink-500/10 text-[#E6E7EB]'
                      : 'border-[#2A2A31] bg-[#0B0B0D] text-[#A1A1AA] hover:border-pink-500/50'
                  }`}
                >
                  <span className="mr-2">{type.emoji}</span>
                  {type.label}
                </button>
              ))}
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-[#2A2A31] rounded-xl p-6 md:p-8 text-center hover:border-pink-500/50 transition-colors">
              <input
                type="file"
                id="photo-upload"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-pink-500/10 flex items-center justify-center">
                    <Upload className="w-6 h-6 md:w-8 md:h-8 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-[#E6E7EB] font-semibold">Upload Reference Photos</p>
                    <p className="text-xs md:text-sm text-[#A1A1AA] mt-1">Max 5 photos • JPG, PNG</p>
                  </div>
                </div>
              </label>
            </div>

            {/* Uploaded Photos Grid */}
            {uploadedPhotos.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {uploadedPhotos.map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-[#2A2A31]">
                    <img 
                      src={URL.createObjectURL(photo)} 
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <span className="text-white text-xs">×</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Quick Prompts */}
        <Card className="bg-[#17171B] border-[#2A2A31] p-4 md:p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg md:text-xl font-bold text-[#E6E7EB]">Quick Prompts Universels</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((quickPrompt, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(quickPrompt)}
                  className="px-4 py-2 rounded-lg border border-[#2A2A31] bg-[#0B0B0D] text-[#E6E7EB] text-sm hover:border-purple-500/50 transition-colors"
                >
                  {quickPrompt}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Paramètres de Génération */}
        <Card className="bg-[#17171B] border-[#2A2A31] p-4 md:p-6">
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-[#E6E7EB]">Paramètres de Génération</h2>

            <div className="space-y-4">
              {/* Prompt */}
              <div className="space-y-2">
                <Label className="text-sm text-[#E6E7EB]">Prompt Principal</Label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] placeholder:text-[#A1A1AA] min-h-[100px] resize-none"
                />
              </div>

              {/* Negative Prompt */}
              <div className="space-y-2">
                <Label className="text-sm text-[#E6E7EB]">Negative Prompt (Optional)</Label>
                <Textarea
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="What to avoid in the image..."
                  className="bg-[#0B0B0D] border-[#2A2A31] text-[#E6E7EB] placeholder:text-[#A1A1AA] min-h-[80px] resize-none"
                />
              </div>

              {/* Aspect Ratio & Test Mode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-[#E6E7EB]">Aspect Ratio</Label>
                  <div className="flex gap-2">
                    {['1:1', '16:9', '9:16'].map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors text-sm ${
                          aspectRatio === ratio
                            ? 'border-purple-500 bg-purple-500/10 text-[#E6E7EB]'
                            : 'border-[#2A2A31] bg-[#0B0B0D] text-[#A1A1AA] hover:border-purple-500/50'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#E6E7EB]">Mode</Label>
                  <button
                    onClick={() => setIsTestMode(!isTestMode)}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors text-sm ${
                      isTestMode
                        ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                        : 'border-[#2A2A31] bg-[#0B0B0D] text-[#A1A1AA] hover:border-yellow-500/50'
                    }`}
                  >
                    {isTestMode ? '⚡ Test Mode (Free)' : '💎 Production Mode'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim() || uploadedPhotos.length === 0}
          className="w-full h-12 md:h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-base md:text-lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Image ({aiModels.find(m => m.id === selectedModel)?.cost} credits)
            </>
          )}
        </Button>

        {/* Image Générée */}
        {generatedImage && (
          <Card className="bg-[#17171B] border-[#2A2A31] p-4 md:p-6">
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl font-bold text-[#E6E7EB]">Image Générée</h2>
              <div className="relative rounded-xl overflow-hidden border border-[#2A2A31]">
                <img 
                  src={generatedImage} 
                  alt="Generated" 
                  className="w-full h-auto"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Download Image
                </Button>
                <Button variant="outline" className="flex-1 border-[#2A2A31] text-[#E6E7EB]">
                  Generate Variation
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
