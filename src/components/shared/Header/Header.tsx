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
  /** Callback pour afficher la page PhotoGlow/générateur */
  onShowPhotoGlow?: () => void;
  /** Callback pour afficher la page d'idées */
  onShowIdeas?: () => void;
  /** Callback pour afficher la modale de connexion */
  onShowAuth?: () => void;
  /** Callback pour accéder à l'interface admin */
  onShowAdmin?: () => void;
  /** Callback pour accéder au profil utilisateur */
  onShowProfile?: () => void;
  /** Callback pour retourner à la landing page */
  onShowLanding?: () => void;
  /** Indique si on est sur la landing page */
  isLandingPage?: boolean;
  /** Page courante (utilisée pour l'état actif du menu) */
  currentPage?: string;
  /** Afficher ou masquer le bouton Admin (par exemple si l'utilisateur n'est pas autorisé) */
  showAdminButton?: boolean;
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
  onShowPhotoGlow,
  onShowIdeas,
  onShowAuth,
  onShowAdmin,
  onShowProfile,
  onShowLanding,
  isLandingPage = false,
  currentPage,
  showAdminButton = false,
  className = ''
}: HeaderProps) {
  const navItems = [
    { label: 'Generator', onClick: onShowPhotoGlow, key: 'photoglow' },
    { label: 'Ideas', onClick: onShowIdeas, key: 'ideas' },
    { label: 'Profile', onClick: onShowProfile, key: 'profile' }
  ].filter(item => Boolean(item.onClick));

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

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-4 text-sm text-gray-300">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={item.onClick}
                className={`px-3 py-2 rounded-lg transition-colors hover:text-white hover:bg-white/10 ${
                  currentPage === item.key ? 'text-white bg-white/10' : ''
                }`}
              >
                {item.label}
              </button>
            ))}

            {onShowAdmin && showAdminButton && (
              <Button
                variant="outline"
                className="border-pink-500/40 text-pink-200 hover:text-white hover:bg-pink-500/10"
                onClick={onShowAdmin}
              >
                Admin
              </Button>
            )}
          </nav>

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

          {!onShowPricing && (onShowAdmin || onShowProfile || onShowAuth) && (
            <div className="flex items-center gap-2">
              {onShowAdmin && showAdminButton && (
                <Button variant="outline" className="border-pink-500/40 text-pink-200" onClick={onShowAdmin}>
                  Admin
                </Button>
              )}
              {onShowProfile && (
                <Button variant="ghost" className="text-gray-300 hover:text-white" onClick={onShowProfile}>
                  Profile
                </Button>
              )}
              {onShowAuth && (
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white" onClick={onShowAuth}>
                  Sign in
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
