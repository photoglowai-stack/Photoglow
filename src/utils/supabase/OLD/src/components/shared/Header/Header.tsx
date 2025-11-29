/**
 * @file Header - Composant d'en-tête global
 * @description Header responsive avec navigation et CTA
 */

import { Button } from '../../ui/button';

/**
 * Props pour le composant Header
 */
export interface HeaderProps {
  /** Callback pour afficher la page de pricing */
  onShowPricing?: () => void;
  /** Callback pour retourner à la landing page */
  onShowLanding?: () => void;
  /** Indique si on est sur la landing page */
  isLandingPage?: boolean;
  /** Classes CSS additionnelles */
  className?: string;
}

/**
 * Header global de l'application
 * 
 * Affiche :
 * - Logo PhotoGlow
 * - Navigation (si applicable)
 * - CTA pour pricing
 * 
 * @example
 * ```tsx
 * <Header 
 *   onShowPricing={() => navigate('/pricing')}
 *   isLandingPage={true}
 * />
 * ```
 */
export function Header({ 
  onShowPricing, 
  onShowLanding,
  isLandingPage = false,
  className = ''
}: HeaderProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-[#111111]/80 backdrop-blur-md border-b border-white/10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={onShowLanding}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">✨</span>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
              PhotoGlow
            </span>
          </button>

          {/* CTA */}
          {onShowPricing && (
            <Button
              onClick={onShowPricing}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white 
                       hover:shadow-lg hover:shadow-pink-500/50 transition-all"
            >
              {isLandingPage ? 'Get Started' : 'Pricing'}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
