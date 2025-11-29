/**
 * Page d'accueil de PhotoGlow
 * @module app/page
 */

import { PhotoGlowPage } from "@/components/PhotoGlowPage";

/**
 * Métadonnées spécifiques à la page d'accueil
 */
export const metadata = {
  title: "PhotoGlow - Créez des Photos de Profil IA Époustouflantes",
  description:
    "Transformez vos photos avec 7 services d'IA professionnels. Parfait pour Tinder, Bumble, LinkedIn. Essayez gratuitement !",
};

/**
 * Page d'accueil principale
 * Affiche le hero, les fonctionnalités, les exemples et le pricing
 * 
 * @returns Page d'accueil complète
 */
export default function HomePage(): JSX.Element {
  return <PhotoGlowPage />;
}
