/**
 * Mapping entre les états de l'app et les IDs de catégorie
 * Utilisé par UniversalCategoryPage
 */

export type CategoryId = 
  | 'professional'
  | 'dating'
  | 'model'
  | 'realistic'
  | 'selfie'
  | 'portrait'
  | 'cosplay'
  | 'beach'
  | 'lifestyle'
  | 'fitness';

export type AppState =
  | 'landing'
  | 'photoglow'
  | 'photoglow-pricing'
  | 'category'
  | 'explore-models'
  | 'photo-detail'
  | 'ideas'
  | 'ai-headshots'
  | 'ai-model-photo'
  | 'ai-cosplay-fantasy'
  | 'ai-fitness-bikini'
  | 'ai-fitness-photos'
  | 'ai-lifestyle-travel'
  | 'ai-realistic-photo'
  | 'ai-selfie'
  | 'ai-photo-generator'
  | 'ai-portrait'
  | 'ai-dating-photos'
  | 'admin'
  | 'pricing'
  | 'profile'
  | 'system-health'
  | 'ai-headshots-examples'
  | 'ai-model-photo-examples'
  | 'ai-dating-photos-examples'
  | 'ai-fitness-photos-examples'
  | 'ai-selfie-examples'
  | 'ai-portrait-examples'
  | 'ai-realistic-photo-examples';

/**
 * Map app states to category IDs for UniversalCategoryPage
 */
export const APP_STATE_TO_CATEGORY: Record<string, CategoryId> = {
  'ai-headshots': 'professional',
  'ai-dating-photos': 'dating',
  'ai-model-photo': 'model',
  'ai-realistic-photo': 'realistic',
  'ai-selfie': 'selfie',
  'ai-portrait': 'portrait',
  'ai-cosplay-fantasy': 'cosplay',
  'ai-fitness-bikini': 'beach',
  'ai-lifestyle-travel': 'lifestyle',
  'ai-fitness-photos': 'fitness',
};
