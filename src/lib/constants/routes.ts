/**
 * Routes de l'application
 * Centralise tous les chemins de navigation pour éviter les erreurs de typo
 * @module lib/constants/routes
 */

/**
 * Routes publiques accessibles sans authentification
 */
export const PUBLIC_ROUTES = {
  /** Page d'accueil */
  HOME: '/',
  /** Galerie d'idées (148 concepts) */
  IDEAS: '/ideas',
  /** Page de tarification */
  PRICING: '/pricing',
  /** À propos */
  ABOUT: '/about',
} as const

/**
 * Routes de catégories
 * Format: /category/[slug]
 */
export const CATEGORY_ROUTES = {
  /** Base path pour les catégories */
  BASE: '/category',
  /** Tinder dating photos */
  TINDER: '/category/tinder',
  /** LinkedIn professional headshots */
  LINKEDIN: '/category/linkedin-headshots',
  /** Instagram influencer photos */
  INSTAGRAM: '/category/instagram',
  /** Bumble dating photos */
  BUMBLE: '/category/bumble',
  /** Hinge dating photos */
  HINGE: '/category/hinge',
  /** Professional headshots généraux */
  PROFESSIONAL: '/category/professional-headshots',
  /** AI selfies */
  AI_SELFIES: '/category/ai-selfies',
  /** Glamour photos */
  GLAMOUR: '/category/glamour',
  /** Beach bikini */
  BEACH_BIKINI: '/category/beach-bikini',
  /** Old money aesthetic */
  OLD_MONEY: '/category/old-money',
  /** Luxury lifestyle */
  LUXURY: '/category/luxury-lifestyle',
  /** Corporate headshots */
  CORPORATE: '/category/corporate-headshots',
  /** AI influencer generator */
  AI_INFLUENCER: '/category/ai-influencer-generator',
  /** Fitness photos */
  FITNESS: '/category/fitness',
  /** Halloween */
  HALLOWEEN: '/category/halloween',
} as const

/**
 * Routes protégées nécessitant authentification
 */
export const PROTECTED_ROUTES = {
  /** Page de profil utilisateur */
  PROFILE: '/profile',
  /** Studio de génération AI */
  STUDIO: '/studio',
  /** Page de génération d'images */
  GENERATOR: '/generate',
  /** Dashboard des crédits */
  CREDITS: '/credits',
  /** Galerie de vidéos générées */
  VIDEOS: '/videos',
  /** Mes modèles AI */
  MY_MODELS: '/my-models',
} as const

/**
 * Routes d'administration (accès restreint)
 */
export const ADMIN_ROUTES = {
  /** Console d'administration principale */
  DASHBOARD: '/admin',
  /** Génération d'images catégories */
  GENERATE: '/admin/generate',
  /** Création de modèles AI */
  MODELS: '/admin/models',
  /** Monitoring système */
  HEALTH: '/admin/health',
  /** Gestion des utilisateurs */
  USERS: '/admin/users',
} as const

/**
 * Routes API (Next.js API Routes)
 */
export const API_ROUTES = {
  /** Débit de crédits */
  CREDITS_DEBIT: '/api/credits/debit',
  /** Génération de vidéo */
  GENERATE_VIDEO: '/api/generate-video',
  /** Upload signé Supabase Storage */
  STORAGE_UPLOAD: '/api/storage-signed-upload',
  /** Webhook Stripe */
  WEBHOOK: '/api/webhook',
  /** Info crédits utilisateur */
  CREDITS_INFO: '/api/credits',
} as const

/**
 * Routes externes
 */
export const EXTERNAL_ROUTES = {
  /** Documentation */
  DOCS: 'https://photoglow.ai/docs',
  /** Support */
  SUPPORT: 'https://photoglow.ai/support',
  /** Blog */
  BLOG: 'https://photoglow.ai/blog',
  /** Twitter */
  TWITTER: 'https://twitter.com/photoglow',
  /** Instagram */
  INSTAGRAM: 'https://instagram.com/photoglow',
} as const

/**
 * Helper pour construire une route de catégorie
 * @param slug - Slug de la catégorie
 * @returns Route complète de la catégorie
 * @example
 * getCategoryRoute('tinder') // '/category/tinder'
 */
export function getCategoryRoute(slug: string): string {
  return `${CATEGORY_ROUTES.BASE}/${slug}`
}

/**
 * Helper pour construire une route de photo detail
 * @param categorySlug - Slug de la catégorie
 * @param photoId - ID de la photo
 * @returns Route complète de la photo
 * @example
 * getPhotoRoute('tinder', '123') // '/category/tinder/photo/123'
 */
export function getPhotoRoute(categorySlug: string, photoId: string): string {
  return `${getCategoryRoute(categorySlug)}/photo/${photoId}`
}

/**
 * Vérifie si une route est publique
 * @param pathname - Chemin à vérifier
 * @returns true si la route est publique
 */
export function isPublicRoute(pathname: string): boolean {
  return Object.values(PUBLIC_ROUTES).some(route => pathname === route)
}

/**
 * Vérifie si une route est protégée
 * @param pathname - Chemin à vérifier
 * @returns true si la route nécessite authentification
 */
export function isProtectedRoute(pathname: string): boolean {
  return Object.values(PROTECTED_ROUTES).some(route => pathname.startsWith(route))
}

/**
 * Vérifie si une route est d'administration
 * @param pathname - Chemin à vérifier
 * @returns true si la route est réservée aux admins
 */
export function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith(ADMIN_ROUTES.DASHBOARD)
}

/**
 * Toutes les routes de l'application
 */
export const ROUTES = {
  PUBLIC: PUBLIC_ROUTES,
  CATEGORY: CATEGORY_ROUTES,
  PROTECTED: PROTECTED_ROUTES,
  ADMIN: ADMIN_ROUTES,
  API: API_ROUTES,
  EXTERNAL: EXTERNAL_ROUTES,
} as const

/**
 * Type pour toutes les routes possibles
 */
export type RouteKey = keyof typeof ROUTES
export type PublicRoute = typeof PUBLIC_ROUTES[keyof typeof PUBLIC_ROUTES]
export type ProtectedRoute = typeof PROTECTED_ROUTES[keyof typeof PROTECTED_ROUTES]
export type AdminRoute = typeof ADMIN_ROUTES[keyof typeof ADMIN_ROUTES]
