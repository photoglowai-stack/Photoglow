/**
 * Configuration centralisée de l'application
 * Toutes les URLs et constantes d'environnement
 */

// API Backend Vercel (external - for image generation)
export const VERCEL_API_BASE = 'https://image-generator-api-chi.vercel.app';

// Endpoints API unifiés
export const API_ENDPOINTS = {
  // Génération d'images (EXTERNAL - Vercel backend)
  generateGen4: `${VERCEL_API_BASE}/api/generate-gen4-image`,
  generateFromScratch: `${VERCEL_API_BASE}/api/generate-from-scratch`,
  generate: `${VERCEL_API_BASE}/api/generate`,
  
  // Preview V1 (EXTERNAL - Vercel backend optimisé V6)
  // Using Vercel endpoint for fast preview with server-side prompt construction
  V1_PREVIEW: `${VERCEL_API_BASE}/api/v1-preview`,
  
  // Crédits (LOCAL - this project's /api routes)
  credits: `/api/credits`,
  creditsDebit: `/api/credits/debit`,
  
  // Modèles personnalisés
  trainModel: `${VERCEL_API_BASE}/api/train-model`,
  generateFromModel: `${VERCEL_API_BASE}/api/generate-from-model`,
  checkTrainingStatus: `${VERCEL_API_BASE}/api/check-training-status`,
  uploadTrainingPhoto: `${VERCEL_API_BASE}/api/upload-training-photo`,
  
  // Webhooks
  webhook: `${VERCEL_API_BASE}/api/webhook`,
} as const;

// Configuration Supabase (importée depuis info.tsx)
export { projectId, publicAnonKey } from './supabase/info';

// URL Supabase Function
export const getSupabaseFunctionUrl = (path: string = '') => {
  const { projectId } = require('./supabase/info');
  return `https://${projectId}.supabase.co/functions/v1/make-server-ab844084${path}`;
};

// Constantes de l'application
export const APP_CONFIG = {
  defaultCredits: 420,
  defaultCreditCost: 1,
  maxUploadSize: 4.5 * 1024 * 1024, // 4.5 MB (Vercel limit)
  supportedImageFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  storageKey: 'photoglow-supabase-auth',
} as const;

// Aspect ratios supportés
export const ASPECT_RATIOS = {
  '1:1': '1:1',
  '16:9': '16:9',
  '9:16': '9:16',
  '21:9': '21:9',
  '3:2': '3:2',
  '2:3': '2:3',
  '4:5': '4:5',
  '5:4': '5:4',
  '3:4': '3:4',
  '4:3': '4:3',
} as const;

// Modèles IA disponibles
export const AI_MODELS = {
  flux: {
    id: 'flux',
    name: 'Flux 1.1 Pro',
    backendId: 'flux',
    replicateId: 'black-forest-labs/flux-1.1-pro',
    supportsPhotos: true,
    supportsNegativePrompt: true,
  },
  gen4: {
    id: 'gen4',
    name: 'Runway Gen-4',
    backendId: 'gen4',
    replicateId: 'runwayml/gen4-image',
    supportsPhotos: true,
    supportsNegativePrompt: false,
  },
  turbo: {
    id: 'turbo',
    name: 'Gen-4 Turbo',
    backendId: 'gen4-turbo',
    replicateId: 'runwayml/gen4-image-turbo',
    supportsPhotos: true,
    supportsNegativePrompt: false,
    requiresPhotos: true, // Gen-4 Turbo nécessite au moins 1 photo
  },
} as const;

// Types de catégories de photos
export const PHOTO_CATEGORIES = [
  'ai-headshots',
  'ai-dating-photos',
  'ai-fitness-photos',
  'ai-lifestyle-travel',
  'ai-model-photo',
  'ai-realistic-photo',
  'ai-selfie',
  'ai-portrait',
  'ai-cosplay-fantasy',
  'ai-fitness-bikini',
] as const;

export type PhotoCategory = typeof PHOTO_CATEGORIES[number];
export type AIModelId = keyof typeof AI_MODELS;
