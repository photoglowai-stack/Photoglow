/**
 * 🎨 PHOTOGLOW - INDEX MASTER DE TOUS LES PROMPTS FLUX
 * 
 * Ce fichier centralise TOUS les prompts optimisés Flux pour un accès facile.
 * Utilisé par le système de génération automatique d'images de catégories.
 * 
 * Total: 39 catégories, ~425 images cibles
 */

import {
  FluxCategoryConfig,
  FluxPromptTemplate,
  fluxOptimizedCategories,
  specialCategories,
  getAllFluxCategories,
  getCategoryById as getMainCategoryById,
  getTotalTargetImages
} from './fluxOptimizedPrompts';

import {
  extendedFluxCategories,
  festivalCategories,
  getAllExtendedCategories,
  getCombinedTotalImages
} from './fluxOptimizedPromptsExtended';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎯 FONCTION PRINCIPALE - GET ALL CATEGORIES
 * ═══════════════════════════════════════════════════════════════
 */

export function getAllPhotoglowCategories(): FluxCategoryConfig[] {
  return [
    ...fluxOptimizedCategories,
    ...specialCategories,
    ...extendedFluxCategories,
    ...festivalCategories
  ];
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 🔍 RECHERCHE ET FILTRAGE
 * ═══════════════════════════════════════════════════════════════
 */

export function findCategoryById(id: string): FluxCategoryConfig | undefined {
  return getAllPhotoglowCategories().find(cat => cat.id === id);
}

export function getCategoriesByType(type: 'professional' | 'dating' | 'fashion' | 'retro' | 'festival' | 'creative'): FluxCategoryConfig[] {
  const typeMapping: Record<string, string[]> = {
    professional: ['ai-headshots', 'startup-headshots', 'ai-portrait', 'podcast-host'],
    dating: ['ai-dating-photos', 'ai-selfie'],
    fashion: ['ai-model-photo', 'luxury-lifestyle', 'mob-wife', 'e-girl'],
    retro: ['retro-90s', 'retro-80s', 'y2k-aesthetic', '1950s-film-noir', 'instant-camera'],
    festival: ['halloween', 'christmas', 'diwali', 'holi', 'ramadan', 'eid-mubarak', 'hanukkah', 'chinese-new-year', 'day-of-the-dead'],
    creative: ['ai-cosplay-fantasy', 'rgb-portrait', 'youtube-thumbnail', 'ai-influencer']
  };

  const categoryIds = typeMapping[type] || [];
  return getAllPhotoglowCategories().filter(cat => categoryIds.includes(cat.id));
}

export function getCategoriesByAspectRatio(ratio: '1:1' | '3:4' | '4:5' | '9:16' | '16:9'): FluxCategoryConfig[] {
  return getAllPhotoglowCategories().filter(cat => 
    cat.prompts.some(prompt => prompt.aspectRatio === ratio)
  );
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 📊 STATISTIQUES
 * ═══════════════════════════════════════════════════════════════
 */

export interface PhotoglowStats {
  totalCategories: number;
  totalPrompts: number;
  totalTargetImages: number;
  averagePromptsPerCategory: number;
  categoriesByType: Record<string, number>;
  promptsByRatio: Record<string, number>;
}

export function getPhotoglowStats(): PhotoglowStats {
  const allCategories = getAllPhotoglowCategories();
  const totalPrompts = allCategories.reduce((sum, cat) => sum + cat.prompts.length, 0);
  const totalTargetImages = allCategories.reduce((sum, cat) => sum + cat.targetImages, 0);

  // Count by type
  const categoriesByType: Record<string, number> = {
    professional: 0,
    dating: 0,
    fashion: 0,
    retro: 0,
    festival: 0,
    creative: 0
  };

  Object.keys(categoriesByType).forEach(type => {
    categoriesByType[type] = getCategoriesByType(type as any).length;
  });

  // Count prompts by aspect ratio
  const promptsByRatio: Record<string, number> = {
    '1:1': 0,
    '3:4': 0,
    '4:5': 0,
    '9:16': 0,
    '16:9': 0
  };

  allCategories.forEach(cat => {
    cat.prompts.forEach(prompt => {
      promptsByRatio[prompt.aspectRatio]++;
    });
  });

  return {
    totalCategories: allCategories.length,
    totalPrompts,
    totalTargetImages,
    averagePromptsPerCategory: Math.round(totalPrompts / allCategories.length * 10) / 10,
    categoriesByType,
    promptsByRatio
  };
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎲 GÉNÉRATION UTILITAIRES
 * ═══════════════════════════════════════════════════════════════
 */

export interface GenerationOptions {
  gender?: 'male' | 'female' | 'both';
  testMode?: boolean;
  maxImagesPerCategory?: number;
}

export function preparePromptsForGeneration(
  categoryId: string,
  options: GenerationOptions = {}
): Array<{ prompt: string; aspectRatio: string; title: string }> {
  const category = findCategoryById(categoryId);
  if (!category) return [];

  const { gender = 'both', testMode = false, maxImagesPerCategory = 5 } = options;
  const limit = testMode ? Math.min(maxImagesPerCategory, category.prompts.length) : category.prompts.length;
  const selectedPrompts = category.prompts.slice(0, limit);

  const results: Array<{ prompt: string; aspectRatio: string; title: string }> = [];

  selectedPrompts.forEach(template => {
    const genders = gender === 'both' 
      ? (template.gender === 'both' ? ['male', 'female'] : [template.gender])
      : [gender];

    genders.forEach(g => {
      if (template.gender === 'both' || template.gender === g) {
        results.push({
          prompt: template.prompt.replace('[gender]', g),
          aspectRatio: template.aspectRatio,
          title: `${template.title} (${g})`
        });
      }
    });
  });

  return results;
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 📋 QUICK REFERENCE LISTS
 * ═══════════════════════════════════════════════════════════════
 */

export const CATEGORY_IDS = {
  // Main categories
  HEADSHOTS: 'ai-headshots',
  DATING: 'ai-dating-photos',
  SELFIE: 'ai-selfie',
  MODEL: 'ai-model-photo',
  REALISTIC: 'ai-realistic-photo',
  PORTRAIT: 'ai-portrait',
  FITNESS: 'ai-fitness-photos',
  BEACH: 'ai-fitness-bikini',
  TRAVEL: 'ai-lifestyle-travel',
  COSPLAY: 'ai-cosplay-fantasy',

  // Special categories
  OLD_MONEY: 'old-money',
  HALLOWEEN: 'halloween',
  CHRISTMAS: 'christmas',
  NIGHTLIFE: 'nightlife',
  RETRO_90S: 'retro-90s',
  RETRO_80S: 'retro-80s',
  Y2K: 'y2k-aesthetic',

  // Extended categories
  LUXURY: 'luxury-lifestyle',
  INFLUENCER: 'ai-influencer',
  INSTANT: 'instant-camera',
  MOB_WIFE: 'mob-wife',
  E_GIRL: 'e-girl',
  PODCAST: 'podcast-host',
  NOIR: '1950s-film-noir',
  RGB: 'rgb-portrait',
  YOUTUBE: 'youtube-thumbnail',

  // Festival categories
  DAY_OF_DEAD: 'day-of-the-dead',
  DIWALI: 'diwali',
  HOLI: 'holi',
  RAMADAN: 'ramadan',
  EID: 'eid-mubarak',
  HANUKKAH: 'hanukkah',
  CHINESE_NY: 'chinese-new-year'
} as const;

export const ASPECT_RATIOS = {
  SQUARE: '1:1',        // Avatar, headshot, Instagram post
  PORTRAIT: '3:4',      // Portrait standard
  INSTAGRAM: '4:5',     // Instagram portrait optimal
  STORY: '9:16',        // Story, Reels, TikTok
  LANDSCAPE: '16:9'     // YouTube thumbnail
} as const;

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎯 EXPORT TYPES
 * ═══════════════════════════════════════════════════════════════
 */

export type { FluxCategoryConfig, FluxPromptTemplate };

export type CategoryType = 'professional' | 'dating' | 'fashion' | 'retro' | 'festival' | 'creative';
export type AspectRatioType = '1:1' | '3:4' | '4:5' | '9:16' | '16:9';
export type GenderType = 'male' | 'female' | 'both';

/**
 * ═══════════════════════════════════════════════════════════════
 * 📖 DOCUMENTATION RAPIDE
 * ═══════════════════════════════════════════════════════════════
 */

export const USAGE_EXAMPLES = {
  getAllCategories: `
    // Obtenir toutes les catégories
    import { getAllPhotoglowCategories } from './allFluxPromptsIndex';
    const allCats = getAllPhotoglowCategories();
    console.log(\`Total: \${allCats.length} categories\`);
  `,

  findCategory: `
    // Trouver une catégorie spécifique
    import { findCategoryById, CATEGORY_IDS } from './allFluxPromptsIndex';
    const headshots = findCategoryById(CATEGORY_IDS.HEADSHOTS);
    console.log(\`\${headshots?.name}: \${headshots?.prompts.length} prompts\`);
  `,

  generatePrompts: `
    // Préparer les prompts pour génération
    import { preparePromptsForGeneration } from './allFluxPromptsIndex';
    
    const prompts = preparePromptsForGeneration('ai-headshots', {
      gender: 'both',
      testMode: true,
      maxImagesPerCategory: 5
    });
    
    prompts.forEach(p => {
      console.log(p.prompt, p.aspectRatio);
    });
  `,

  getStats: `
    // Obtenir les statistiques
    import { getPhotoglowStats } from './allFluxPromptsIndex';
    const stats = getPhotoglowStats();
    console.log(\`Total images: \${stats.totalTargetImages}\`);
    console.log(\`By ratio:\`, stats.promptsByRatio);
  `,

  filterByType: `
    // Filtrer par type
    import { getCategoriesByType } from './allFluxPromptsIndex';
    const festivalCats = getCategoriesByType('festival');
    console.log(\`\${festivalCats.length} festival categories\`);
  `
};

/**
 * ═══════════════════════════════════════════════════════════════
 * 🚀 QUICK START
 * ═══════════════════════════════════════════════════════════════
 * 
 * // 1. Get all categories
 * const all = getAllPhotoglowCategories();
 * 
 * // 2. Find specific category
 * const dating = findCategoryById('ai-dating-photos');
 * 
 * // 3. Prepare for generation
 * const prompts = preparePromptsForGeneration('ai-headshots', { testMode: true });
 * 
 * // 4. Get statistics
 * const stats = getPhotoglowStats();
 * 
 * // 5. Filter by type
 * const professional = getCategoriesByType('professional');
 */

// Default export
export default {
  getAllCategories: getAllPhotoglowCategories,
  findCategory: findCategoryById,
  getCategoriesByType,
  getCategoriesByAspectRatio,
  preparePromptsForGeneration,
  getStats: getPhotoglowStats,
  CATEGORY_IDS,
  ASPECT_RATIOS,
  USAGE_EXAMPLES
};
