/**
 * @file ProfilePage.types - Types pour la page de profil
 */

/**
 * Profil utilisateur
 */
export interface UserProfile {
  /** Email de l'utilisateur */
  email: string;
  /** Nom d'affichage (optionnel) */
  name?: string;
  /** ID unique de l'utilisateur */
  user_id: string;
}

/**
 * Photo générée par l'utilisateur
 */
export interface GeneratedPhoto {
  /** ID unique de la photo */
  id: string;
  /** URL de l'image */
  image_url: string;
  /** Prompt utilisé pour la génération */
  prompt: string;
  /** Catégorie de la photo */
  category: string;
  /** Date de création */
  created_at: string;
  /** Ratio d'aspect (optionnel) */
  aspect_ratio?: string;
}

/**
 * Props du composant ProfilePage
 */
export interface ProfilePageProps {
  /** Callback pour retourner à la page précédente */
  onBack: () => void;
}
