/**
 * Configuration centrale de l'application PhotoGlow
 * Toutes les variables d'environnement et configs sont centralisées ici
 * @module lib/config
 */

/**
 * Valide qu'une variable d'environnement existe
 * @param key - Nom de la variable
 * @param value - Valeur de la variable
 * @throws Error si la variable est manquante
 */
function requireEnv(key: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

/**
 * Configuration de l'application
 */
export const appConfig = {
  /** Nom de l'application */
  name: 'PhotoGlow',
  /** Version de l'application */
  version: '1.0.0',
  /** Description */
  description: 'AI Photo Enhancement for Dating & Professional Photos',
  /** URL de l'application */
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://photoglow.ai',
  /** Environnement (development, production, test) */
  env: process.env.NODE_ENV || 'development',
  /** Mode debug activé */
  debug: process.env.NODE_ENV === 'development',
} as const

/**
 * Configuration Supabase
 */
export const supabaseConfig = {
  /** URL du projet Supabase */
  url: requireEnv('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
  /** Clé anon publique */
  anonKey: requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  /** Service role key (backend uniquement) */
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  /** URL de la base de données */
  databaseUrl: process.env.SUPABASE_DB_URL,
  /** Buckets Storage */
  buckets: {
    /** Galerie publique d'images générées */
    aiGallery: 'ai_gallery',
    /** Photos d'entraînement pour modèles AI */
    aiModels: 'ai-models',
  },
} as const

/**
 * Configuration Pollinations (générateur d'images)
 */
export const pollinationsConfig = {
  /** URL de base de l'API */
  baseUrl: 'https://image.pollinations.ai/prompt',
  /** Modèle par défaut (flux) */
  model: 'flux',
  /** Largeur par défaut */
  width: 1024,
  /** Hauteur par défaut */
  height: 1024,
  /** Seed aléatoire */
  nologo: true,
  /** Enhance activé */
  enhance: true,
  /** Pas de negative prompts (crucial pour éviter les cartoons) */
  noNegativePrompt: true,
} as const

/**
 * Configuration Replicate (modèles AI personnalisés)
 */
export const replicateConfig = {
  /** Clé API Replicate */
  apiToken: process.env.REPLICATE_API_TOKEN,
  /** URL de base */
  baseUrl: 'https://api.replicate.com/v1',
  /** Webhook URL pour les callbacks */
  webhookUrl: process.env.REPLICATE_WEBHOOK_URL,
} as const

/**
 * Configuration Stripe (paiements)
 */
export const stripeConfig = {
  /** Clé publique */
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  /** Clé secrète (backend uniquement) */
  secretKey: process.env.STRIPE_SECRET_KEY,
  /** Webhook secret */
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  /** Mode test */
  testMode: process.env.NODE_ENV !== 'production',
} as const

/**
 * Configuration des crédits
 */
export const creditsConfig = {
  /** Coût pour générer une image */
  imageGenerationCost: 1,
  /** Coût pour générer une vidéo */
  videoGenerationCost: 5,
  /** Coût pour entraîner un modèle */
  modelTrainingCost: 10,
  /** Bonus de bienvenue */
  welcomeBonus: 10,
  /** Prix par crédit (en centimes) */
  pricePerCredit: 10, // 0.10€
  /** Packages disponibles */
  packages: [
    { credits: 100, price: 9.99, bonus: 0 },
    { credits: 250, price: 19.99, bonus: 25 },
    { credits: 500, price: 39.99, bonus: 75 },
    { credits: 1000, price: 69.99, bonus: 200 },
  ],
} as const

/**
 * Configuration des limites
 */
export const limitsConfig = {
  /** Nombre max d'images par génération */
  maxImagesPerGeneration: 4,
  /** Taille max d'upload (MB) */
  maxUploadSizeMB: 10,
  /** Taille max d'upload (bytes) */
  maxUploadSizeBytes: 10 * 1024 * 1024,
  /** Nombre min de photos pour entraînement */
  minTrainingPhotos: 10,
  /** Nombre max de photos pour entraînement */
  maxTrainingPhotos: 30,
  /** Longueur max du prompt */
  maxPromptLength: 1000,
  /** Durée max de génération (ms) */
  maxGenerationTimeMs: 60000, // 60s
} as const

/**
 * Configuration des images
 */
export const imageConfig = {
  /** Largeur par défaut */
  defaultWidth: 1024,
  /** Hauteur par défaut */
  defaultHeight: 1024,
  /** Formats acceptés */
  acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'] as const,
  /** Extensions acceptées */
  acceptedExtensions: ['.jpg', '.jpeg', '.png', '.webp'] as const,
  /** Qualité JPEG (0-100) */
  jpegQuality: 90,
  /** Qualité WebP (0-100) */
  webpQuality: 85,
  /** Dimensions pour les thumbnails */
  thumbnailSize: 256,
} as const

/**
 * Configuration des catégories
 */
export const categoriesConfig = {
  /** Nombre total de catégories */
  totalCategories: 16,
  /** Catégories disponibles */
  categories: [
    'Tinder',
    'LinkedIn Headshots',
    'Instagram',
    'Bumble',
    'Hinge',
    'Professional Headshots',
    'AI Selfies',
    'Glamour',
    'Beach Bikini',
    'Old Money',
    'Luxury Lifestyle',
    'Corporate Headshots',
    'AI Influencer Generator',
    'Fitness',
    'Halloween',
    'Dating',
  ] as const,
  /** Nombre d'images par catégorie */
  imagesPerCategory: 30,
} as const

/**
 * Configuration des animations
 */
export const animationConfig = {
  /** Durée des transitions rapides (ms) */
  transitionFast: 150,
  /** Durée des transitions normales (ms) */
  transitionNormal: 300,
  /** Durée des transitions lentes (ms) */
  transitionSlow: 500,
  /** Fonction de timing par défaut */
  timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Désactiver animations (accessibility) */
  disableAnimations: false,
} as const

/**
 * Configuration SEO
 */
export const seoConfig = {
  /** Titre par défaut */
  defaultTitle: 'PhotoGlow - AI Photo Enhancement for Dating & Professional',
  /** Description par défaut */
  defaultDescription: 'Transform your photos with AI for Tinder, LinkedIn, Instagram and more. Professional headshots and dating photos in seconds.',
  /** Mots-clés */
  keywords: [
    'AI photo enhancement',
    'dating photos',
    'professional headshots',
    'tinder photos',
    'linkedin headshots',
    'AI photography',
  ],
  /** Image OG par défaut */
  ogImage: '/og-image.png',
  /** Twitter handle */
  twitterHandle: '@photoglow',
} as const

/**
 * Configuration des features flags
 */
export const featuresConfig = {
  /** Génération de vidéos activée */
  videoGeneration: true,
  /** Modèles AI personnalisés activés */
  customModels: true,
  /** Mode admin activé */
  adminMode: process.env.NEXT_PUBLIC_ADMIN_MODE === 'true',
  /** Analytics activées */
  analytics: process.env.NODE_ENV === 'production',
  /** Monitoring d'erreurs activé */
  errorTracking: process.env.NODE_ENV === 'production',
} as const

/**
 * Configuration complète exportée
 */
export const config = {
  app: appConfig,
  supabase: supabaseConfig,
  pollinations: pollinationsConfig,
  replicate: replicateConfig,
  stripe: stripeConfig,
  credits: creditsConfig,
  limits: limitsConfig,
  image: imageConfig,
  categories: categoriesConfig,
  animation: animationConfig,
  seo: seoConfig,
  features: featuresConfig,
} as const

/**
 * Helper pour vérifier si on est en production
 */
export const isProduction = appConfig.env === 'production'

/**
 * Helper pour vérifier si on est en développement
 */
export const isDevelopment = appConfig.env === 'development'

/**
 * Helper pour vérifier si on est en mode test
 */
export const isTest = appConfig.env === 'test'

/**
 * Type pour la configuration complète
 */
export type Config = typeof config
export type AppConfig = typeof appConfig
export type SupabaseConfig = typeof supabaseConfig
export type PollinationsConfig = typeof pollinationsConfig
export type ReplicateConfig = typeof replicateConfig
export type StripeConfig = typeof stripeConfig
export type CreditsConfig = typeof creditsConfig
export type LimitsConfig = typeof limitsConfig
export type ImageConfig = typeof imageConfig
export type CategoriesConfig = typeof categoriesConfig
export type AnimationConfig = typeof animationConfig
export type SEOConfig = typeof seoConfig
export type FeaturesConfig = typeof featuresConfig
