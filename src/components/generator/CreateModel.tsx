import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { 
  User,
  Upload,
  Loader2,
  CheckCircle2,
  X,
  Trash2,
  Sparkles,
  AlertCircle,
  ImageIcon,
  RefreshCw,
  Zap
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { useAIModels } from '../hooks/useAIModels';

/**
 * CREATE AI MODEL TAB — V2 REDESIGN
 * Inspiré du design Pollinations Preview avec thème PhotoGlow pink/orange
 * 
 * Structure:
 * 1. Header avec badges de statut
 * 2. Preview Card (attributs visuels du modèle)
 * 3. Controls (attributs physiques organisés)
 * 4. Photo Upload zone
 * 5. Actions (Create/Train/Cancel)
 * 6. Models Gallery
 */

export function CreateAIModelTab() {
  const { 
    models: aiModels, 
    loading: aiModelsLoading, 
    createModel, 
    deleteModel,
    uploadMultiplePhotos,
    trainModel
  } = useAIModels();

  // Form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [modelName, setModelName] = useState('');
  const [modelGender, setModelGender] = useState('woman');
  const [modelSkinTone, setModelSkinTone] = useState('medium');
  const [modelHairLength, setModelHairLength] = useState('long');
  const [modelHairColor, setModelHairColor] = useState('brown');
  const [modelEyeColor, setModelEyeColor] = useState('hazel');
  const [modelBodyType, setModelBodyType] = useState('athletic');
  const [modelBustSize, setModelBustSize] = useState('medium');
  const [modelButtSize, setModelButtSize] = useState('medium');
  
  // Current model being worked on
  const [currentModelId, setCurrentModelId] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [trainingStatus, setTrainingStatus] = useState('');

  const currentModel = aiModels.find(m => m.id === currentModelId);

  // Handle file selection
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    setSelectedFiles(prev => [...prev, ...files]);
    toast.success(`${files.length} photo(s) sélectionnée(s)`);
  };

  // Remove selected file
  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Create new model
  const handleCreateModel = async () => {
    if (!modelName.trim()) {
      toast.error('Veuillez entrer un nom de modèle');
      return;
    }

    try {
      const attributes = {
        gender: modelGender,
        eyeColor: modelEyeColor,
        hairColor: modelHairColor,
        hairLength: modelHairLength,
        skinTone: modelSkinTone,
        bodyType: modelBodyType,
        bustSize: modelBustSize,
        buttSize: modelButtSize
      };

      const model = await createModel({
        name: modelName,
        description: JSON.stringify(attributes)
      });

      setCurrentModelId(model.id);
      setShowCreateForm(false);
      toast.success(`Modèle "${model.name}" créé ! Ajoutez maintenant au moins 5 photos.`);
      
      // Reset form
      setModelName('');
      
    } catch (error: any) {
      console.error('Error creating model:', error);
      toast.error(error.message || 'Échec de création du modèle');
    }
  };

  // Upload photos to current model
  const handleUploadPhotos = async () => {
    if (!currentModelId) {
      toast.error('Veuillez créer un modèle d\'abord');
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error('Veuillez sélectionner des photos');
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const result = await uploadMultiplePhotos(
        currentModelId,
        selectedFiles,
        (current, total) => {
          const progress = Math.round((current / total) * 100);
          setUploadProgress(progress);
        }
      );

      if (result.errors.length > 0) {
        toast.warning(`${result.uploaded} photos uploadées avec ${result.errors.length} erreurs`);
      } else {
        toast.success(`✅ ${result.uploaded} photos uploadées avec succès !`);
      }

      setSelectedFiles([]);
      setUploadProgress(0);
      
    } catch (error: any) {
      console.error('Error uploading photos:', error);
      toast.error(error.message || 'Échec de l\'upload');
    } finally {
      setIsUploading(false);
    }
  };

  // Train current model
  const handleTrainModel = async (modelId: string) => {
    try {
      setTrainingStatus('training');
      
      await trainModel(
        modelId,
        (status, progress) => {
          setTrainingStatus(status);
          console.log(`Training: ${status} - ${progress}%`);
        }
      );

      toast.success('✨ Modèle entraîné avec succès !');
      setCurrentModelId(null);
      setTrainingStatus('');
      
    } catch (error: any) {
      console.error('Error training model:', error);
      toast.error(error.message || 'Échec de l\'entraînement');
      setTrainingStatus('failed');
    }
  };

  // Delete model
  const handleDeleteModel = async (modelId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce modèle ?')) return;

    try {
      await deleteModel(modelId);
      toast.success('Modèle supprimé');
      
      if (currentModelId === modelId) {
        setCurrentModelId(null);
      }
    } catch (error: any) {
      console.error('Error deleting model:', error);
      toast.error('Échec de suppression');
    }
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-gray-500/20 text-gray-300 border-gray-500/30">En attente</Badge>;
      case 'training':
        return <Badge variant="outline" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">⏳ Entraînement...</Badge>;
      case 'trained':
        return <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">✅ Entraîné</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30">❌ Échec</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-500/20 text-gray-300 border-gray-500/30">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">Créer un Modèle IA Personnalisé</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-pink-500/10 text-pink-300 border-pink-500/30">
              🎯 Endpoint: v1/ai-models
            </Badge>
          </div>
        </div>
        <p className="text-gray-400">
          Créez votre modèle IA personnalisé avec vos attributs physiques et générez des photos ultra-réalistes
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-[#18181B] border-pink-500/20">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Modèles</div>
          <div className="text-lg text-pink-400">{aiModels.length}</div>
        </Card>
        <Card className="p-4 bg-[#18181B] border-pink-500/20">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Entraînés</div>
          <div className="text-lg text-green-400">
            {aiModels.filter(m => m.status === 'trained').length}
          </div>
        </Card>
        <Card className="p-4 bg-[#18181B] border-pink-500/20">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">En cours</div>
          <div className="text-lg text-yellow-400">
            {aiModels.filter(m => m.status === 'training').length}
          </div>
        </Card>
      </div>

      {/* CREATE NEW MODEL BUTTON */}
      {!showCreateForm && !currentModelId && (
        <Card className="p-6 bg-[#18181B] border-pink-500/30">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-pink-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg text-white mb-2">Créer un nouveau modèle IA</h3>
              <p className="text-sm text-gray-400">
                Définissez vos attributs physiques et uploadez 5+ photos d'entraînement
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Créer Nouveau Modèle
            </Button>
          </div>
        </Card>
      )}

      {/* CREATE FORM */}
      {showCreateForm && (
        <div className="space-y-6">
          {/* PREVIEW CARD - Attributs du modèle */}
          <Card className="p-6 bg-[#18181B] border-pink-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-pink-400" />
                <h3 className="text-lg text-white">Attributs du Modèle</h3>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setShowCreateForm(false);
                  setModelName('');
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Model Name */}
            <div className="space-y-2">
              <Label className="text-white">Nom du Modèle</Label>
              <Input
                className="bg-[#0B0B0D] border-pink-500/30 text-white"
                placeholder="ex: Emma Summer, Alex Stone..."
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              />
              <p className="text-xs text-gray-400">
                Ce nom sera utilisé pour identifier votre modèle IA personnalisé
              </p>
            </div>

            {/* Visual Preview Summary */}
            <div className="p-4 bg-pink-500/5 border border-pink-500/20 rounded-lg">
              <div className="text-xs text-pink-300 mb-2">APERÇU DES ATTRIBUTS</div>
              <div className="grid grid-cols-4 gap-3 text-xs">
                <div>
                  <div className="text-gray-400">Genre</div>
                  <div className="text-white">{modelGender === 'woman' ? '👩 Femme' : '👨 Homme'}</div>
                </div>
                <div>
                  <div className="text-gray-400">Peau</div>
                  <div className="text-white">{modelSkinTone}</div>
                </div>
                <div>
                  <div className="text-gray-400">Cheveux</div>
                  <div className="text-white">{modelHairColor} • {modelHairLength}</div>
                </div>
                <div>
                  <div className="text-gray-400">Yeux</div>
                  <div className="text-white">{modelEyeColor}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* CONTROLS - Physical Attributes */}
          <Card className="p-6 bg-[#18181B] border-pink-500/30 space-y-6">
            <h3 className="text-lg text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              Configuration des Attributs Physiques
            </h3>

            {/* Bloc A - Genre & Morphologie */}
            <div className="space-y-4">
              <div className="text-sm text-pink-300 uppercase tracking-wide">👤 Identité</div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white text-xs uppercase tracking-wide text-gray-400">Genre</Label>
                  <Select value={modelGender} onValueChange={setModelGender}>
                    <SelectTrigger className="bg-[#0B0B0D] border-pink-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1f2e] border-gray-700">
                      <SelectItem value="woman">👩 Femme</SelectItem>
                      <SelectItem value="man">👨 Homme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-xs uppercase tracking-wide text-gray-400">Teint</Label>
                  <Select value={modelSkinTone} onValueChange={setModelSkinTone}>
                    <SelectTrigger className="bg-[#0B0B0D] border-pink-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1f2e] border-gray-700">
                      <SelectItem value="light">🏻 Clair</SelectItem>
                      <SelectItem value="fair">🤍 Très Clair</SelectItem>
                      <SelectItem value="medium">🏼 Moyen</SelectItem>
                      <SelectItem value="tan">🏾 Bronzé</SelectItem>
                      <SelectItem value="deep">🏿 Foncé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-xs uppercase tracking-wide text-gray-400">Morphologie</Label>
                  <Select value={modelBodyType} onValueChange={setModelBodyType}>
                    <SelectTrigger className="bg-[#0B0B0D] border-pink-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1f2e] border-gray-700">
                      <SelectItem value="athletic">💪 Athlétique</SelectItem>
                      <SelectItem value="slim">🌱 Mince</SelectItem>
                      <SelectItem value="average">👤 Moyenne</SelectItem>
                      <SelectItem value="curvy">🍑 Ronde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-xs uppercase tracking-wide text-gray-400">Yeux</Label>
                  <Select value={modelEyeColor} onValueChange={setModelEyeColor}>
                    <SelectTrigger className="bg-[#0B0B0D] border-pink-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1f2e] border-gray-700">
                      <SelectItem value="brown">🟤 Marron</SelectItem>
                      <SelectItem value="blue">🔵 Bleu</SelectItem>
                      <SelectItem value="green">🟢 Vert</SelectItem>
                      <SelectItem value="hazel">🟡 Noisette</SelectItem>
                      <SelectItem value="gray">⚪ Gris</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Bloc B - Cheveux */}
            <div className="space-y-4">
              <div className="text-sm text-pink-300 uppercase tracking-wide">💇 Cheveux</div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white text-xs uppercase tracking-wide text-gray-400">Longueur</Label>
                  <Select value={modelHairLength} onValueChange={setModelHairLength}>
                    <SelectTrigger className="bg-[#0B0B0D] border-pink-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1f2e] border-gray-700">
                      <SelectItem value="bald">🪒 Chauve</SelectItem>
                      <SelectItem value="short">✂️ Courts</SelectItem>
                      <SelectItem value="medium">💇 Mi-longs</SelectItem>
                      <SelectItem value="long">👸 Longs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-xs uppercase tracking-wide text-gray-400">Couleur</Label>
                  <Select value={modelHairColor} onValueChange={setModelHairColor} disabled={modelHairLength === 'bald'}>
                    <SelectTrigger className="bg-[#0B0B0D] border-pink-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1f2e] border-gray-700">
                      <SelectItem value="blonde">👱 Blond</SelectItem>
                      <SelectItem value="brown">🤎 Brun</SelectItem>
                      <SelectItem value="black">🖤 Noir</SelectItem>
                      <SelectItem value="red">❤️ Roux</SelectItem>
                      <SelectItem value="gray">🩶 Gris</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Bloc C - Proportions (Femmes uniquement) */}
            {modelGender === 'woman' && (
              <div className="space-y-4">
                <div className="text-sm text-pink-300 uppercase tracking-wide">📐 Proportions</div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white text-xs uppercase tracking-wide text-gray-400">Poitrine</Label>
                    <Select value={modelBustSize} onValueChange={setModelBustSize}>
                      <SelectTrigger className="bg-[#0B0B0D] border-pink-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1f2e] border-gray-700">
                        <SelectItem value="small">Petite</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white text-xs uppercase tracking-wide text-gray-400">Hanches</Label>
                    <Select value={modelButtSize} onValueChange={setModelButtSize}>
                      <SelectTrigger className="bg-[#0B0B0D] border-pink-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1f2e] border-gray-700">
                        <SelectItem value="small">Petites</SelectItem>
                        <SelectItem value="medium">Moyennes</SelectItem>
                        <SelectItem value="large">Larges</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <Button
              onClick={handleCreateModel}
              disabled={!modelName.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              size="lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Créer le Modèle
            </Button>
          </Card>
        </div>
      )}

      {/* UPLOAD PHOTOS SECTION (for current model) */}
      {currentModel && currentModel.status === 'pending' && (
        <Card className="p-6 bg-[#18181B] border-pink-500/30 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-pink-400" />
              <h3 className="text-lg text-white">Upload Photos — "{currentModel.name}"</h3>
            </div>
            <Badge variant="outline" className="bg-pink-500/10 text-pink-300 border-pink-500/30">
              {currentModel.photos?.length || 0}/5+ photos
            </Badge>
          </div>

          {/* Uploaded Photos Grid */}
          {currentModel.photos && currentModel.photos.length > 0 && (
            <div>
              <Label className="text-white text-xs uppercase tracking-wide text-gray-400 mb-3 block">
                Photos Uploadées ({currentModel.photos.length})
              </Label>
              <div className="grid grid-cols-5 gap-2">
                {currentModel.photos.map((photo, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border-2 border-pink-500/30">
                    <img
                      src={photo.url}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* File Selection Zone */}
          <div className="space-y-3">
            <Label className="text-white text-xs uppercase tracking-wide text-gray-400">
              Ajouter des Photos (minimum 5 au total)
            </Label>
            
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-pink-500/30 rounded-lg cursor-pointer hover:border-pink-500/50 bg-[#0B0B0D] transition-colors">
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-pink-400 mb-3" />
                <span className="text-sm text-gray-300">
                  {selectedFiles.length > 0 
                    ? `${selectedFiles.length} fichier(s) sélectionné(s)`
                    : 'Cliquez pour sélectionner des photos'
                  }
                </span>
                <span className="text-xs text-gray-500 mt-1">JPG, PNG (max 10MB chacun)</span>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelection}
                className="hidden"
              />
            </label>

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                {selectedFiles.map((file, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border-2 border-pink-500/50">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Selected ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeSelectedFile(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1.5 hover:bg-red-600 shadow-lg"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {isUploading && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Upload en cours...</span>
                <span className="text-pink-400">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Warning if not enough photos */}
          {currentModel.photos && currentModel.photos.length < 5 && (
            <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-200">
                <p className="mb-1">Minimum requis : 5 photos</p>
                <p className="text-xs text-yellow-300/70">
                  Actuellement : {currentModel.photos.length}/5 • Ajoutez {5 - currentModel.photos.length} photo(s) supplémentaire(s)
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={handleUploadPhotos}
              disabled={selectedFiles.length === 0 || isUploading}
              className="bg-pink-600 hover:bg-pink-700"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Upload...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </>
              )}
            </Button>

            {currentModel.photos && currentModel.photos.length >= 5 && (
              <Button
                onClick={() => handleTrainModel(currentModel.id)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <Zap className="w-4 h-4 mr-2" />
                Entraîner
              </Button>
            )}

            <Button
              onClick={() => {
                setCurrentModelId(null);
                setSelectedFiles([]);
              }}
              variant="outline"
              className="border-gray-700 text-gray-400"
            >
              Annuler
            </Button>
          </div>
        </Card>
      )}

      {/* MODELS GALLERY */}
      {aiModels.length > 0 && (
        <Card className="p-6 bg-[#18181B] border-pink-500/30">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-pink-400" />
                <h3 className="text-lg text-white">Vos Modèles IA</h3>
                <Badge variant="outline" className="bg-pink-500/10 text-pink-300 border-pink-500/30">
                  {aiModels.length}
                </Badge>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.location.reload()}
                className="border-pink-500/30 text-pink-400 hover:bg-pink-500/10"
              >
                <RefreshCw className="w-3 h-3 mr-2" />
                Actualiser
              </Button>
            </div>
            
            {aiModelsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiModels.map((model) => (
                  <Card key={model.id} className="p-4 bg-[#0B0B0D] border-pink-500/20 hover:border-pink-500/50 transition-all">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-white">{model.name}</h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {model.photos?.length || 0} photos
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(model.status)}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteModel(model.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-7 w-7 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Training Progress */}
                      {model.status === 'training' && model.training_progress !== undefined && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Entraînement</span>
                            <span className="text-pink-400">{model.training_progress}%</span>
                          </div>
                          <Progress value={model.training_progress} className="h-1.5" />
                        </div>
                      )}

                      {/* Photo Grid Preview */}
                      {model.photos && model.photos.length > 0 && (
                        <div className="grid grid-cols-3 gap-1">
                          {model.photos.slice(0, 3).map((photo, idx) => (
                            <div key={idx} className="aspect-square rounded overflow-hidden">
                              <img
                                src={photo.url}
                                alt={`${model.name} ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      {model.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => setCurrentModelId(model.id)}
                          variant="outline"
                          className="w-full border-pink-500/30 text-pink-400 hover:bg-pink-500/10"
                        >
                          <Upload className="w-3 h-3 mr-2" />
                          Ajouter Photos
                        </Button>
                      )}

                      {model.status === 'trained' && (
                        <Button
                          size="sm"
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-2" />
                          Prêt à Générer
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* HELP CARD */}
      <Card className="p-4 bg-pink-50 border-pink-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-pink-900">
            <p className="mb-1">💡 <strong>Comment ça marche ?</strong></p>
            <ul className="list-disc list-inside space-y-1 text-pink-800 text-xs">
              <li><strong>Étape 1 :</strong> Définissez vos attributs physiques (genre, teint, cheveux, yeux...)</li>
              <li><strong>Étape 2 :</strong> Uploadez minimum 5 photos variées (différents angles, éclairages)</li>
              <li><strong>Étape 3 :</strong> Entraînez le modèle (2-5 minutes)</li>
              <li><strong>Étape 4 :</strong> Générez des photos ultra-réalistes avec votre visage !</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
