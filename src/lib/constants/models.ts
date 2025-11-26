/**
 * Constantes pour les modèles AI
 * @module lib/constants/models
 */

/**
 * Modèles AI disponibles
 */
export const AI_MODELS = ['flux', 'sdxl', 'playground', 'custom'] as const;
export type AIModel = (typeof AI_MODELS)[number];

/**
 * Ratios d'aspect disponibles
 */
export const ASPECT_RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:4'] as const;
export type AspectRatio = (typeof ASPECT_RATIOS)[number];

/**
 * Mapping ratio → dimensions
 */
export const ASPECT_RATIO_DIMENSIONS: Record<AspectRatio, { width: number; height: number }> = {
  '1:1': { width: 1024, height: 1024 },
  '16:9': { width: 1024, height: 576 },
  '9:16': { width: 576, height: 1024 },
  '4:3': { width: 1024, height: 768 },
  '3:4': { width: 768, height: 1024 },
};

/**
 * Labels pour les ratios
 */
export const ASPECT_RATIO_LABELS: Record<AspectRatio, string> = {
  '1:1': 'Square',
  '16:9': 'Landscape',
  '9:16': 'Portrait',
  '4:3': 'Standard',
  '3:4': 'Vertical',
};
