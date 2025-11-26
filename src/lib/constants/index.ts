/**
 * Constantes globales de l'application
 * @module lib/constants
 */

/**
 * Configuration des crédits
 */
export const CREDITS_CONFIG = {
  /** Coût en crédits pour générer une image */
  IMAGE_GENERATION_COST: 1,
  /** Coût en crédits pour générer une vidéo */
  VIDEO_GENERATION_COST: 5,
  /** Coût en crédits pour entraîner un modèle IA */
  MODEL_TRAINING_COST: 10,
  /** Crédits offerts à l'inscription */
  WELCOME_BONUS: 10,
} as const;

/**
 * Limites de l'application
 */
export const LIMITS = {
  /** Nombre maximum d'images par génération */
  MAX_IMAGES_PER_GENERATION: 4,
  /** Taille maximale d'upload en MB */
  MAX_UPLOAD_SIZE_MB: 10,
  /** Nombre minimum de photos pour entraîner un modèle */
  MIN_TRAINING_PHOTOS: 10,
  /** Nombre maximum de photos pour entraîner un modèle */
  MAX_TRAINING_PHOTOS: 30,
} as const;

/**
 * Configuration des images
 */
export const IMAGE_CONFIG = {
  /** Largeur par défaut des images générées */
  DEFAULT_WIDTH: 1024,
  /** Hauteur par défaut des images générées */
  DEFAULT_HEIGHT: 1024,
  /** Formats d'image acceptés */
  ACCEPTED_FORMATS: ["image/jpeg", "image/png", "image/webp"],
  /** Extensions d'image acceptées */
  ACCEPTED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".webp"],
} as const;

/**
 * URLs de l'application
 */
export const ROUTES = {
  HOME: "/",
  IDEAS: "/ideas",
  PROFILE: "/profile",
  ADMIN: "/admin",
  CATEGORY: "/category",
  GENERATOR: "/generate",
  PRICING: "/pricing",
  VIDEOS: "/videos",
} as const;

/**
 * Catégories disponibles (ordre d'affichage)
 */
export const CATEGORIES = [
  "All",
  "Holidays & Events",
  "Dating & Social",
  "Professional Headshots",
  "AI & Creative",
  "Lifestyle & Travel",
  "Fashion & Style",
  "Fitness & Sports",
  "Retro & Vintage",
  "Events & Parties",
  "Cosplay & Fantasy",
  "Creative Portraits",
  "Adult Content (18+)",
] as const;

/**
 * Configuration Supabase Storage
 */
export const STORAGE_BUCKETS = {
  /** Bucket pour la galerie publique */
  AI_GALLERY: "ai_gallery",
  /** Bucket pour les photos d'entraînement de modèles */
  AI_MODELS: "ai-models",
} as const;

/**
 * Messages d'erreur standardisés
 */
export const ERROR_MESSAGES = {
  AUTH_REQUIRED: "Vous devez être connecté pour effectuer cette action",
  INSUFFICIENT_CREDITS: "Crédits insuffisants pour cette opération",
  INVALID_INPUT: "Les données fournies sont invalides",
  GENERATION_FAILED: "La génération a échoué, veuillez réessayer",
  NETWORK_ERROR: "Erreur réseau, vérifiez votre connexion",
  SERVER_ERROR: "Erreur serveur, veuillez réessayer plus tard",
} as const;

/**
 * Messages de succès standardisés
 */
export const SUCCESS_MESSAGES = {
  IMAGE_GENERATED: "Image générée avec succès !",
  MODEL_CREATED: "Modèle IA créé avec succès !",
  CREDITS_ADDED: "Crédits ajoutés à votre compte",
  PROFILE_UPDATED: "Profil mis à jour avec succès",
} as const;

/**
 * Configuration des animations CSS natives
 */
export const ANIMATION_CONFIG = {
  /** Durée des transitions courtes (ms) */
  TRANSITION_FAST: 150,
  /** Durée des transitions moyennes (ms) */
  TRANSITION_NORMAL: 300,
  /** Durée des transitions longues (ms) */
  TRANSITION_SLOW: 500,
  /** Fonction de timing par défaut */
  TIMING_FUNCTION: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;
