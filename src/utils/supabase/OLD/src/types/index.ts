/**
 * Types centralisés pour PhotoGlow
 * @module types
 */

/**
 * Catégorie de photos disponibles
 */
export type CategoryType =
  | "Holidays & Events"
  | "Dating & Social"
  | "Professional Headshots"
  | "AI & Creative"
  | "Lifestyle & Travel"
  | "Fashion & Style"
  | "Fitness & Sports"
  | "Retro & Vintage"
  | "Events & Parties"
  | "Cosplay & Fantasy"
  | "Creative Portraits"
  | "Adult Content (18+)";

/**
 * Idée de photo avec métadonnées complètes
 */
export interface PhotoIdea {
  /** Titre de l'idée (ex: "Photo AI Halloween") */
  title: string;
  /** Description détaillée */
  description: string;
  /** URL de l'image d'exemple */
  image: string;
  /** Catégorie parente */
  category: CategoryType;
}

/**
 * Configuration d'une catégorie avec prompts
 */
export interface CategoryConfig {
  /** Nom de la catégorie */
  name: string;
  /** Slug URL-friendly */
  slug: string;
  /** Description courte */
  description: string;
  /** Nombre de prompts disponibles */
  promptCount: number;
  /** Nombre d'images ciblées */
  targetImages: number;
  /** Liste des prompts optimisés Flux */
  prompts: string[];
}

/**
 * Utilisateur authentifié
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
}

/**
 * Crédits utilisateur
 */
export interface Credits {
  user_id: string;
  balance: number;
  total_used: number;
  last_updated: string;
}

/**
 * Job de génération d'image
 */
export interface GenerationJob {
  id: string;
  user_id: string;
  status: "pending" | "processing" | "completed" | "failed";
  prompt: string;
  image_url?: string;
  error_message?: string;
  created_at: string;
  completed_at?: string;
}

/**
 * Modèle IA personnalisé
 */
export interface AIModel {
  id: string;
  user_id: string;
  name: string;
  status: "training" | "ready" | "failed";
  replicate_model_id?: string;
  training_images_count: number;
  created_at: string;
}

/**
 * Configuration de schéma de couleurs pour catégorie
 */
export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

/**
 * Données d'exemple pour une catégorie
 */
export interface CategoryExample {
  category: string;
  images: string[];
  description: string;
}

/**
 * FAQ pour une catégorie
 */
export interface CategoryFAQ {
  question: string;
  answer: string;
}

/**
 * Témoignage utilisateur
 */
export interface Testimonial {
  name: string;
  role?: string;
  content: string;
  rating?: number;
  avatar?: string;
}

/**
 * Réponse API standard
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Paramètres de génération d'image
 */
export interface GenerationParams {
  prompt: string;
  model?: string;
  width?: number;
  height?: number;
  num_outputs?: number;
  guidance_scale?: number;
  num_inference_steps?: number;
}
