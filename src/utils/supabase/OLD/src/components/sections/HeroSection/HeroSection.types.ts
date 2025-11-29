/**
 * @file HeroSection.types - Types pour la section Hero
 */

/**
 * Genre sélectionné pour la génération de photos
 */
export type Gender = 'male' | 'female';

/**
 * Props pour le composant HeroSection
 */
export interface HeroSectionProps {
  /** Callback au démarrage du formulaire avec genre sélectionné */
  onStartForm: (gender: Gender) => void;
  /** Callback pour explorer les modèles AI */
  onExploreModels: () => void;
  /** Callback au clic sur une photo (optionnel) */
  onPhotoClick?: (photoIndex: number, photoUrl: string) => void;
}
