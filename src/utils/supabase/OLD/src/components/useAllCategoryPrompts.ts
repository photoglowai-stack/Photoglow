/**
 * 🎯 HOOK REACT - Utilisation des Prompts de Catégories
 * 
 * Hook personnalisé pour accéder facilement aux prompts configurés
 * dans n'importe quel composant React
 */

import { useMemo } from 'react';
import {
  getAllCategories,
  getCategoryById,
  getPromptsByCategory,
  getTotalImageCount,
  getGlobalStats,
  type CategoryConfig,
  type PromptTemplate
} from './allCategoriesPromptsConfig';

export interface UseCategoryPromptsReturn {
  // Toutes les catégories
  allCategories: CategoryConfig[];
  
  // Statistiques globales
  stats: {
    totalCategories: number;
    totalTargetImages: number;
    mainCategories: number;
    ideasCategories: number;
    avgImagesPerCategory: number;
  };
  
  // Fonctions utilitaires
  getCategoryById: (id: string) => CategoryConfig | undefined;
  getPromptsByCategory: (categoryId: string) => PromptTemplate[];
  getCategoryPrompt: (categoryId: string, index: number) => PromptTemplate | undefined;
  getRandomPrompt: (categoryId: string) => PromptTemplate | undefined;
  getTotalImageCount: () => number;
}

/**
 * Hook principal pour accéder aux prompts de catégories
 */
export function useAllCategoryPrompts(): UseCategoryPromptsReturn {
  // Mémoriser les catégories pour éviter les re-calculs
  const allCategories = useMemo(() => getAllCategories(), []);
  
  // Mémoriser les stats
  const stats = useMemo(() => getGlobalStats(), []);
  
  /**
   * Récupère un prompt spécifique par catégorie et index
   */
  const getCategoryPrompt = (categoryId: string, index: number): PromptTemplate | undefined => {
    const prompts = getPromptsByCategory(categoryId);
    return prompts[index];
  };
  
  /**
   * Récupère un prompt aléatoire d'une catégorie
   */
  const getRandomPrompt = (categoryId: string): PromptTemplate | undefined => {
    const prompts = getPromptsByCategory(categoryId);
    if (prompts.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  };
  
  return {
    allCategories,
    stats,
    getCategoryById,
    getPromptsByCategory,
    getCategoryPrompt,
    getRandomPrompt,
    getTotalImageCount
  };
}

/**
 * Hook pour une catégorie spécifique
 */
export function useCategoryPrompts(categoryId: string) {
  const category = useMemo(() => getCategoryById(categoryId), [categoryId]);
  const prompts = useMemo(() => getPromptsByCategory(categoryId), [categoryId]);
  
  const getPromptByIndex = (index: number): PromptTemplate | undefined => {
    return prompts[index];
  };
  
  const getRandomPrompt = (): PromptTemplate | undefined => {
    if (prompts.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  };
  
  return {
    category,
    prompts,
    promptCount: prompts.length,
    getPromptByIndex,
    getRandomPrompt
  };
}

/**
 * Hook pour générer une URL d'image Pollinations à partir d'un prompt
 */
export function usePollinationsImageUrl(
  prompt: string,
  options?: {
    width?: number;
    height?: number;
    seed?: number;
    model?: string;
    nologo?: boolean;
  }
) {
  const imageUrl = useMemo(() => {
    if (!prompt) return null;
    
    // Paramètres par défaut
    const width = options?.width || 1024;
    const height = options?.height || 1024;
    const seed = options?.seed || Math.floor(Math.random() * 1000000);
    const model = options?.model || 'flux';
    const nologo = options?.nologo !== false; // true par défaut
    
    // Encoder le prompt pour l'URL
    const encodedPrompt = encodeURIComponent(prompt);
    
    // Construire l'URL Pollinations
    let url = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
    url += `?width=${width}`;
    url += `&height=${height}`;
    url += `&seed=${seed}`;
    url += `&model=${model}`;
    if (nologo) {
      url += `&nologo=true`;
    }
    
    return url;
  }, [prompt, options]);
  
  return imageUrl;
}

/**
 * EXEMPLES D'UTILISATION
 */

/*

// ═══════════════════════════════════════════════════════════════
// EXEMPLE 1 : Utiliser tous les prompts dans un composant
// ═══════════════════════════════════════════════════════════════

import { useAllCategoryPrompts } from './components/useAllCategoryPrompts';

function CategoriesOverview() {
  const { allCategories, stats } = useAllCategoryPrompts();
  
  return (
    <div>
      <h1>PhotoGlow Categories</h1>
      <p>Total: {stats.totalCategories} categories</p>
      <p>Images to generate: {stats.totalTargetImages}</p>
      
      {allCategories.map(category => (
        <div key={category.id}>
          <h2>{category.emoji} {category.name}</h2>
          <p>{category.description}</p>
          <p>Prompts: {category.promptTemplates.length}</p>
        </div>
      ))}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// EXEMPLE 2 : Utiliser une catégorie spécifique
// ═══════════════════════════════════════════════════════════════

import { useCategoryPrompts } from './components/useAllCategoryPrompts';

function HeadshotsGallery() {
  const { category, prompts, getRandomPrompt } = useCategoryPrompts('ai-headshots');
  
  const handleGenerateRandom = () => {
    const randomPrompt = getRandomPrompt();
    console.log('Random prompt:', randomPrompt);
  };
  
  return (
    <div>
      <h1>{category?.emoji} {category?.name}</h1>
      <p>{category?.description}</p>
      <button onClick={handleGenerateRandom}>
        Generate Random Headshot
      </button>
      
      <div className="grid">
        {prompts.map((prompt, index) => (
          <div key={index}>
            <h3>{prompt.title}</h3>
            <p>{prompt.prompt}</p>
            <small>Ratio: {prompt.aspectRatio}</small>
          </div>
        ))}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// EXEMPLE 3 : Générer une image Pollinations
// ═══════════════════════════════════════════════════════════════

import { useCategoryPrompts, usePollinationsImageUrl } from './components/useAllCategoryPrompts';

function ImageGenerator() {
  const { prompts } = useCategoryPrompts('ai-dating-photos');
  const firstPrompt = prompts[0];
  
  const imageUrl = usePollinationsImageUrl(firstPrompt?.prompt || '', {
    width: 1024,
    height: 1024,
    model: 'flux',
    nologo: true
  });
  
  return (
    <div>
      <h2>{firstPrompt?.title}</h2>
      {imageUrl && (
        <img src={imageUrl} alt={firstPrompt?.title} />
      )}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// EXEMPLE 4 : Sélecteur de catégories
// ═══════════════════════════════════════════════════════════════

import { useState } from 'react';
import { useAllCategoryPrompts } from './components/useAllCategoryPrompts';

function CategorySelector() {
  const { allCategories, getCategoryById } = useAllCategoryPrompts();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  
  const selectedCategory = selectedCategoryId 
    ? getCategoryById(selectedCategoryId) 
    : null;
  
  return (
    <div>
      <select 
        value={selectedCategoryId} 
        onChange={(e) => setSelectedCategoryId(e.target.value)}
      >
        <option value="">Select a category...</option>
        {allCategories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.emoji} {cat.name} ({cat.targetImages} images)
          </option>
        ))}
      </select>
      
      {selectedCategory && (
        <div>
          <h2>{selectedCategory.emoji} {selectedCategory.name}</h2>
          <p>{selectedCategory.description}</p>
          <p>Prompts available: {selectedCategory.promptTemplates.length}</p>
        </div>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// EXEMPLE 5 : Galerie avec génération automatique
// ═══════════════════════════════════════════════════════════════

import { useCategoryPrompts, usePollinationsImageUrl } from './components/useAllCategoryPrompts';

function AutoGeneratedGallery({ categoryId }: { categoryId: string }) {
  const { category, prompts } = useCategoryPrompts(categoryId);
  
  return (
    <div>
      <h1>{category?.emoji} {category?.name}</h1>
      
      <div className="grid grid-cols-3 gap-4">
        {prompts.map((prompt, index) => {
          const imageUrl = usePollinationsImageUrl(prompt.prompt, {
            width: 512,
            height: 512,
            seed: index
          });
          
          return (
            <div key={index} className="card">
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={prompt.title}
                  className="w-full h-auto"
                />
              )}
              <h3>{prompt.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

*/
