/**
 * Layout public pour PhotoGlow
 * Utilisé par toutes les pages publiques (home, ideas, etc.)
 * 
 * Ce layout inclut :
 * - Header avec navigation
 * - Footer avec liens
 * - Styles globaux
 * 
 * @module app/(public)/layout
 */

import type { Metadata } from 'next';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import '@/styles/globals.css';

/**
 * Metadata par défaut pour les pages publiques
 */
export const metadata: Metadata = {
  title: 'PhotoGlow - AI Photo Enhancement for Dating & Professional',
  description: 'Transform your photos with AI for Tinder, LinkedIn, Instagram and more. Professional headshots and dating photos in seconds.',
  keywords: ['AI photo enhancement', 'dating photos', 'professional headshots', 'AI photography'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://photoglow.ai',
    siteName: 'PhotoGlow',
    title: 'PhotoGlow - AI Photo Enhancement',
    description: 'Transform your photos with AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PhotoGlow AI Photo Enhancement',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PhotoGlow - AI Photo Enhancement',
    description: 'Transform your photos with AI',
    images: ['/og-image.png'],
  },
};

/**
 * Props pour PublicLayout
 */
interface PublicLayoutProps {
  /** Contenu de la page */
  children: React.ReactNode;
}

/**
 * Layout Public - RSC
 * 
 * Wrapper pour toutes les pages publiques avec Header et Footer.
 * Pas de state, pas d'interactivité → RSC
 * 
 * @param props - Props avec children
 * @returns Layout complet
 */
export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header fixe en haut */}
      <Header />

      {/* Contenu principal */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
