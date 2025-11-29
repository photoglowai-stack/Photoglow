/**
 * @file Pages - Export barrel pour tous les composants de pages
 * @description Point d'entrée centralisé pour importer les pages
 */

// Pages principales
export * from './IdeasPage';
export * from './ProfilePage';

// Types communs (à ajouter au fur et à mesure)
export interface BasePageProps {
  /** Callback pour retourner en arrière */
  onBack?: () => void;
  /** Callback pour afficher le pricing */
  onShowPricing?: () => void;
}
