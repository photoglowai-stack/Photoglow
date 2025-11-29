/**
 * Page de création d'images AI
 * Formulaire complet pour générer des images
 * 
 * @module app/create/page
 */

'use client';

import { useState, useCallback } from 'react';
import { SEOHead } from '@/components/shared/SEOHead';
import {
  PromptForm,
  ModelSelect,
  AspectRatioSelect,
  ImageGrid,
  JobStatusBadgeWithProgress,
} from '@/components/feature';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import type { AIModel, AspectRatio } from '@/lib/constants/models';
import type { JobResponse, Photo } from '@/lib/validators';

/**
 * Create Page - Page de création d'images
 * 
 * Page complète pour générer des images AI.
 * Composant client car contient des formulaires et du state.
 * 
 * Fonctionnalités :
 * - Formulaire de prompt
 * - Sélection modèle et ratio
 * - Preview en temps réel
 * - Génération de jobs
 * - Polling du statut
 * - Affichage des résultats
 * 
 * @returns Page complète
 */
export default function CreatePage() {
  // ============================================
  // STATE
  // ============================================

  const [model, setModel] = useState<AIModel>('flux');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentJob, setCurrentJob] = useState<JobResponse | null>(null);
  const [generatedPhotos, setGeneratedPhotos] = useState<Photo[]>([]);

  // ============================================
  // HANDLERS
  // ============================================

  /**
   * Handler pour preview
   */
  const handlePreview = useCallback(
    async (prompt: string) => {
      try {
        toast.info('Generating preview...');

        const url = await api.getPreview({
          prompt,
          model,
          aspectRatio,
        });

        setPreviewUrl(url);
        toast.success('Preview ready!');
      } catch (error) {
        console.error('Preview error:', error);
        toast.error('Failed to generate preview');
      }
    },
    [model, aspectRatio]
  );

  /**
   * Handler pour génération
   */
  const handleGenerate = useCallback(
    async (params: { prompt: string; model: AIModel; aspectRatio: AspectRatio }) => {
      setIsGenerating(true);

      try {
        toast.info('Creating generation job...');

        // Créer le job
        const job = await api.createJob({
          ...params,
          numOutputs: 4, // Générer 4 images
        });

        setCurrentJob(job);
        toast.success('Job created! Generating images...');

        // Polling du statut toutes les 2 secondes
        const pollStatus = async () => {
          try {
            const status = await api.getJobStatus(job.id);
            setCurrentJob(status);

            if (status.status === 'completed') {
              // Job terminé
              if (status.imageUrls && status.imageUrls.length > 0) {
                // Convertir les URLs en objets Photo
                const photos: Photo[] = status.imageUrls.map((url, index) => ({
                  id: `${job.id}-${index}`,
                  url,
                  prompt: status.prompt,
                  model: status.model,
                  aspectRatio: status.aspectRatio,
                  width: 1024,
                  height: 1024,
                  createdAt: new Date().toISOString(),
                  isPublic: false,
                  views: 0,
                  likes: 0,
                }));

                setGeneratedPhotos(photos);
                toast.success('Images generated successfully!');
              }
              setIsGenerating(false);
            } else if (status.status === 'failed') {
              // Job échoué
              toast.error(`Generation failed: ${status.error || 'Unknown error'}`);
              setIsGenerating(false);
            } else if (status.status === 'cancelled') {
              // Job annulé
              toast.error('Generation cancelled');
              setIsGenerating(false);
            } else {
              // Continuer le polling
              setTimeout(pollStatus, 2000);
            }
          } catch (error) {
            console.error('Polling error:', error);
            toast.error('Failed to check job status');
            setIsGenerating(false);
          }
        };

        // Démarrer le polling
        pollStatus();
      } catch (error) {
        console.error('Generation error:', error);
        toast.error('Failed to create generation job');
        setIsGenerating(false);
      }
    },
    []
  );

  // ============================================
  // RENDER
  // ============================================

  return (
    <>
      <SEOHead
        title="Create AI Images | PhotoGlow"
        description="Generate stunning AI images for dating, professional headshots, and more"
      />

      <div className="min-h-screen bg-black text-white py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              Create AI Images
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Generate stunning photos with AI. Describe what you want and let our AI create it.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left side - Form */}
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-800 p-6">
                <div className="space-y-6">
                  {/* Model Select */}
                  <ModelSelect value={model} onChange={setModel} disabled={isGenerating} />

                  {/* Aspect Ratio Select */}
                  <AspectRatioSelect
                    value={aspectRatio}
                    onChange={setAspectRatio}
                    disabled={isGenerating}
                  />

                  {/* Prompt Form */}
                  <PromptForm
                    onSubmit={handleGenerate}
                    onPreview={handlePreview}
                    isLoading={isGenerating}
                  />
                </div>
              </Card>

              {/* Job Status */}
              {currentJob && (
                <Card className="bg-gray-900/50 border-gray-800 p-6">
                  <h3 className="text-lg font-semibold mb-4">Generation Status</h3>
                  <JobStatusBadgeWithProgress
                    status={currentJob.status}
                    progress={currentJob.progress || 0}
                  />
                  {currentJob.error && (
                    <p className="text-sm text-red-400 mt-2">Error: {currentJob.error}</p>
                  )}
                </Card>
              )}
            </div>

            {/* Right side - Preview/Results */}
            <div className="space-y-6">
              {/* Preview */}
              {previewUrl && !isGenerating && generatedPhotos.length === 0 && (
                <Card className="bg-gray-900/50 border-gray-800 p-6">
                  <h3 className="text-lg font-semibold mb-4">Preview</h3>
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>
              )}

              {/* Generated Images */}
              {generatedPhotos.length > 0 && (
                <Card className="bg-gray-900/50 border-gray-800 p-6">
                  <h3 className="text-lg font-semibold mb-4">Generated Images</h3>
                  <ImageGrid
                    photos={generatedPhotos}
                    columns={{ mobile: 1, tablet: 2, desktop: 2 }}
                    showMetadata={false}
                  />
                </Card>
              )}

              {/* Tips */}
              {!previewUrl && generatedPhotos.length === 0 && (
                <Card className="bg-gray-900/50 border-gray-800 p-6">
                  <h3 className="text-lg font-semibold mb-4">Tips for Best Results</h3>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Be specific and descriptive in your prompt</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Mention lighting, style, and composition</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-pink-500">•</span>
                      <span>FLUX model works best for realistic photos</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Use Preview to test before generating</span>
                    </li>
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
