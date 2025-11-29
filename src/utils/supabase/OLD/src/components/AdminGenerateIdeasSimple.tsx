/**
 * PhotoGlow Admin - Simple Ideas Generator
 * 
 * Génération massive d'images directement depuis ideasData.ts
 * 
 * Fonctionnalités:
 * - Generate ALL → Génère toutes les catégories
 * - OU sélectionne une catégorie → Génère uniquement celle-là
 * - Suivi en temps réel de la progression
 * - ZÉRO configuration externe
 * 
 * @module AdminGenerateIdeasSimple
 */

'use client';

import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';
import { Play, Square, RefreshCw } from 'lucide-react';
import { photoIdeas, categories } from './ideasData';

// ========================================
// CONFIG
// ========================================

const ENDPOINT = 'https://image-generator-api-chi.vercel.app/v1/ideas/generate';
const DELAY_MS = 450; // Anti-429
const MAX_RETRIES = 2;

// ========================================
// TYPES
// ========================================

interface Job {
  categoryId: string;
  categoryName: string;
  ideaTitle: string;
  ideaDescription: string;
  prompt: string;
}

interface JobResult {
  job: Job;
  success: boolean;
  imageUrl?: string;
  error?: string;
}

// ========================================
// HELPER: OPTIMIZE FLUX PROMPT
// ========================================

/**
 * Transforme une description en prompt FLUX optimisé
 * CRITIQUE: Prompts longs et descriptifs pour éviter le style cartoon/illustration
 */
function optimizeFluxPrompt(description: string): string {
  // Mots-clés photographiques critiques pour réalisme
  const photographyTerms = [
    'high resolution portrait photo',
    'photorealistic skin texture with visible pores and natural imperfections',
    'realistic human facial features with detailed iris and catchlights in eyes',
    'shot on professional full-frame DSLR camera',
    '85mm portrait lens',
    'f/1.8 shallow depth of field',
    'natural window light or soft studio lighting',
    'proper human anatomy and realistic proportions',
    'no cartoon style',
    'no illustration',
    'no anime',
    'no digital art style',
    'real photography aesthetic',
    'genuine skin texture',
    'natural facial expressions',
    'authentic human features',
    'professional portrait photography',
    'high quality image',
    'sharp focus on subject',
    'creamy bokeh background',
    'natural color grading',
    'no text',
    'no watermark',
    'no frame'
  ];
  
  // Construit un prompt très long et descriptif
  return `${description}, ${photographyTerms.join(', ')}`;
}

/**
 * Crée un slug depuis un texte
 */
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/photo ai /gi, '')
    .replace(/ai /gi, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Génère la clé d'idempotence SHA-256
 */
async function makeIdempotencyKey(job: Job): Promise<string> {
  const data = `${job.categoryId}:${job.ideaTitle}:${job.prompt}`;
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ========================================
// COMPONENT
// ========================================

export function AdminGenerateIdeasSimple() {
  const [selectedIdea, setSelectedIdea] = useState<string>('ALL');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [stats, setStats] = useState({ success: 0, failed: 0 });
  const [currentJob, setCurrentJob] = useState<string>('');
  const [results, setResults] = useState<JobResult[]>([]);
  
  const abortRef = useRef<boolean>(false);
  
  // ========================================
  // PREPARE JOBS
  // ========================================
  
  /**
   * Prépare la liste des jobs à générer
   */
  function prepareJobs(ideaFilter: string): Job[] {
    const jobs: Job[] = [];
    
    // Filtre les ideas: ALL ou une seule idée spécifique
    const ideasToGenerate = ideaFilter === 'ALL' 
      ? photoIdeas 
      : photoIdeas.filter(idea => {
          const cleanTitle = idea.title.replace(/Photo AI /gi, '').replace(/AI /gi, '').trim();
          return cleanTitle === ideaFilter;
        });
    
    // Crée un job pour chaque idea
    ideasToGenerate.forEach(idea => {
      const categorySlug = createSlug(idea.category);
      const ideaTitle = idea.title.replace(/Photo AI /gi, '').replace(/AI /gi, '');
      const optimizedPrompt = optimizeFluxPrompt(idea.description);
      
      jobs.push({
        categoryId: categorySlug,
        categoryName: idea.category,
        ideaTitle,
        ideaDescription: idea.description,
        prompt: optimizedPrompt
      });
    });
    
    return jobs;
  }
  
  // ========================================
  // GENERATE SINGLE JOB
  // ========================================
  
  /**
   * Génère une seule image via l'endpoint Vercel
   */
  async function generateSingleJob(job: Job, retries = 0): Promise<JobResult> {
    try {
      // Génère la clé d'idempotence
      const idempotencyKey = await makeIdempotencyKey(job);
      
      // Construit le payload selon le format Vercel API
      const payload = {
        slug: job.categoryId,
        prompt: job.prompt,
        aspect_ratio: '3:4',  // Format portrait pour les headshots
        width: 1344,          // Largeur optimale pour FLUX
        model: 'flux'
      };
      
      // Appel API Vercel
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey
        },
        body: JSON.stringify(payload)
      });
      
      // Gestion erreurs
      if (!response.ok) {
        // Retry sur 429 ou 5xx
        if ((response.status === 429 || response.status >= 500) && retries < MAX_RETRIES) {
          const delay = DELAY_MS * (retries + 1);
          await new Promise(resolve => setTimeout(resolve, delay));
          return generateSingleJob(job, retries + 1);
        }
        
        const errorText = await response.text().catch(() => '');
        throw new Error(`HTTP ${response.status}: ${errorText.slice(0, 200)}`);
      }
      
      const data = await response.json();
      
      // Vérifie que l'image_url est présente
      if (!data.success || !data.image_url) {
        throw new Error('No image_url in response');
      }
      
      return {
        job,
        success: true,
        imageUrl: data.image_url,
        error: undefined
      };
      
    } catch (error: any) {
      return {
        job,
        success: false,
        error: error.message
      };
    }
  }
  
  // ========================================
  // GENERATE ALL
  // ========================================
  
  /**
   * Lance la génération
   */
  async function handleStartGeneration() {
    // Reset
    abortRef.current = false;
    setIsGenerating(true);
    setProgress({ current: 0, total: 0 });
    setStats({ success: 0, failed: 0 });
    setResults([]);
    
    // Prépare les jobs
    const jobs = prepareJobs(selectedIdea);
    
    if (jobs.length === 0) {
      toast.error('No jobs to generate');
      setIsGenerating(false);
      return;
    }
    
    setProgress({ current: 0, total: jobs.length });
    toast.success(`Starting generation: ${jobs.length} images`);
    
    // Génère séquentiellement
    const allResults: JobResult[] = [];
    let successCount = 0;
    let failedCount = 0;
    
    for (let i = 0; i < jobs.length; i++) {
      // Check abort
      if (abortRef.current) {
        toast.info('Generation stopped');
        break;
      }
      
      const job = jobs[i];
      setCurrentJob(`${job.categoryName} - ${job.ideaTitle}`);
      
      // Génère
      const result = await generateSingleJob(job);
      allResults.push(result);
      
      // Update stats
      if (result.success) {
        successCount++;
      } else {
        failedCount++;
      }
      
      setStats({ success: successCount, failed: failedCount });
      setProgress({ current: i + 1, total: jobs.length });
      setResults([...allResults]);
      
      // Délai anti-429
      if (i < jobs.length - 1) {
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      }
    }
    
    setIsGenerating(false);
    setCurrentJob('');
    
    toast.success(`Generation complete: ${successCount} success, ${failedCount} failed`);
  }
  
  /**
   * Stop la génération
   */
  function handleStopGeneration() {
    abortRef.current = true;
    setIsGenerating(false);
    setCurrentJob('');
  }
  
  /**
   * Reset
   */
  function handleReset() {
    setProgress({ current: 0, total: 0 });
    setStats({ success: 0, failed: 0 });
    setResults([]);
    setCurrentJob('');
  }
  
  // ========================================
  // RENDER
  // ========================================
  
  const progressPercent = progress.total > 0 
    ? Math.round((progress.current / progress.total) * 100) 
    : 0;
  
  // Créer une liste unique de toutes les idées avec leurs titres nettoyés
  const allIdeasList = photoIdeas.map(idea => {
    const cleanTitle = idea.title.replace(/Photo AI /gi, '').replace(/AI /gi, '').trim();
    return {
      cleanTitle,
      category: idea.category,
      fullTitle: idea.title
    };
  });
  
  // Groupe les ideas complètes par catégorie pour l'affichage détaillé
  const ideasGroupedByCategory = photoIdeas.reduce((acc, idea) => {
    if (!acc[idea.category]) acc[idea.category] = [];
    acc[idea.category].push(idea);
    return acc;
  }, {} as Record<string, typeof photoIdeas>);
  
  return (
    <div className="min-h-screen bg-[#111111] text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Category Image Generator</h1>
          <p className="text-gray-400">
            Generate images for all IDEAS categories - Vercel Endpoint + FLUX
          </p>
          <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-purple-300 text-sm mb-2">
              ✅ <strong>{photoIdeas.length} idées</strong> réparties dans <strong>{categories.length - 1} catégories</strong>
            </p>
            <p className="text-purple-400 text-xs mb-2">
              Cela inclut toutes les idées de la page IDEAS : Halloween, Diwali, Christmas, Easter, Tinder, Instagram, LinkedIn, etc.
            </p>
            <p className="text-green-400 text-xs">
              🚀 <strong>Nouveau:</strong> Utilise l'endpoint Vercel avec prompts optimisés FLUX (longs et descriptifs, pas de negative prompts)
            </p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#1f1f1f] border-[#343434] p-6">
            <div className="text-gray-400 text-sm mb-2">Categories</div>
            <div className="text-3xl">{categories.length - 1}</div>
          </Card>
          
          <Card className="bg-[#1f1f1f] border-[#343434] p-6">
            <div className="text-gray-400 text-sm mb-2">Total Ideas</div>
            <div className="text-3xl">{photoIdeas.length}</div>
          </Card>
          
          <Card className="bg-[#1f1f1f] border-[#343434] p-6">
            <div className="text-gray-400 text-sm mb-2">Success</div>
            <div className="text-3xl text-green-500">{stats.success}</div>
          </Card>
          
          <Card className="bg-[#1f1f1f] border-[#343434] p-6">
            <div className="text-gray-400 text-sm mb-2">Failed</div>
            <div className="text-3xl text-red-500">{stats.failed}</div>
          </Card>
        </div>
        
        {/* Controls */}
        <Card className="bg-[#1f1f1f] border-[#343434] p-6 mb-8">
          <div className="flex items-center gap-4">
            {/* Idea Select - Toutes les idées individuellement */}
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">Select Idea</label>
              <select
                value={selectedIdea}
                onChange={(e) => setSelectedIdea(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-[#111111] border border-[#343434] rounded-lg px-4 py-2 text-white"
              >
                <option value="ALL">ALL IDEAS ({photoIdeas.length} ideas)</option>
                {allIdeasList.map((idea, idx) => (
                  <option key={idx} value={idea.cleanTitle}>
                    {idea.cleanTitle} ({idea.category})
                  </option>
                ))}
              </select>
            </div>
            
            {/* Actions */}
            <div className="flex gap-2">
              {!isGenerating ? (
                <>
                  <Button
                    onClick={handleStartGeneration}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Generation
                  </Button>
                  
                  {results.length > 0 && (
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="border-[#343434]"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  onClick={handleStopGeneration}
                  variant="destructive"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              )}
            </div>
          </div>
        </Card>
        
        {/* Progress */}
        {progress.total > 0 && (
          <Card className="bg-[#1f1f1f] border-[#343434] p-6 mb-8">
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">
                  {progress.current} / {progress.total} ({progressPercent}%)
                </span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
            
            {currentJob && (
              <div className="text-sm text-gray-400">
                <span className="text-purple-400">Current:</span> {currentJob}
              </div>
            )}
          </Card>
        )}
        
        {/* Results Table */}
        {results.length > 0 && (
          <Card className="bg-[#1f1f1f] border-[#343434] p-6">
            <h3 className="text-xl mb-4">Results ({results.length})</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#343434]">
                    <th className="text-left py-2 px-4 text-gray-400">#</th>
                    <th className="text-left py-2 px-4 text-gray-400">Category</th>
                    <th className="text-left py-2 px-4 text-gray-400">Idea</th>
                    <th className="text-left py-2 px-4 text-gray-400">Status</th>
                    <th className="text-left py-2 px-4 text-gray-400">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, idx) => (
                    <tr key={idx} className="border-b border-[#343434]/50">
                      <td className="py-2 px-4 text-gray-400">{idx + 1}</td>
                      <td className="py-2 px-4">{result.job.categoryName}</td>
                      <td className="py-2 px-4">{result.job.ideaTitle}</td>
                      <td className="py-2 px-4">
                        {result.success ? (
                          <span className="text-green-500">✓ Success</span>
                        ) : (
                          <span className="text-red-500">✗ Failed</span>
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {result.imageUrl ? (
                          <a 
                            href={result.imageUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline text-xs"
                          >
                            View
                          </a>
                        ) : result.error ? (
                          <span className="text-red-400 text-xs">{result.error}</span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
        
        {/* ALL IDEAS PREVIEW - Shows every single idea */}
        <Card className="bg-[#1f1f1f] border-[#343434] p-6 mt-8">
          <h3 className="text-xl mb-4">📋 ALL IDEAS TO GENERATE ({photoIdeas.length} total)</h3>
          <div className="space-y-6">
            {categories.filter(c => c !== 'All').map(category => {
              const categoryIdeas = ideasGroupedByCategory[category] || [];
              if (categoryIdeas.length === 0) return null;
              
              return (
                <div key={category} className="border-l-2 border-purple-500/30 pl-4">
                  <h4 className="text-lg text-purple-400 mb-3">
                    {category} ({categoryIdeas.length} ideas)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {categoryIdeas.map((idea, idx) => (
                      <div 
                        key={idx}
                        className="bg-[#111111] border border-[#343434] rounded px-3 py-2 text-sm"
                      >
                        <div className="text-white truncate" title={idea.title}>
                          {idea.title}
                        </div>
                        <div className="text-gray-500 text-xs truncate" title={idea.description}>
                          {idea.description.substring(0, 60)}...
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        
        {/* Config Info */}
        <div className="mt-8 p-4 bg-[#1f1f1f] border border-[#343434] rounded-lg">
          <h4 className="text-sm text-gray-400 mb-2">Configuration</h4>
          <div className="text-xs text-gray-500 space-y-1">
            <p><strong className="text-gray-400">Endpoint:</strong> {ENDPOINT}</p>
            <p><strong className="text-gray-400">Model:</strong> FLUX (via Pollinations)</p>
            <p><strong className="text-gray-400">Aspect Ratio:</strong> 3:4 (1344x1792 portrait)</p>
            <p><strong className="text-gray-400">Delay:</strong> {DELAY_MS}ms | <strong className="text-gray-400">Max Retries:</strong> {MAX_RETRIES}</p>
            <p><strong className="text-gray-400">Storage:</strong> Supabase bucket ai_gallery/categories/{'<slug>'}/ </p>
            <p className="text-green-400 mt-2">✅ Prompts optimisés: Longs et descriptifs, sans negative prompts</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
