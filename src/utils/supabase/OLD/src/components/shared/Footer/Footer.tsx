/**
 * @file Footer - Composant footer global
 * @description Footer responsive avec liens, branding et informations légales
 */

import { memo } from 'react';
import { Button } from '../../ui/button';
import { Heart, Mail, MessageCircle } from 'lucide-react';

/**
 * Props pour le composant Footer
 */
export interface FooterProps {
  /** Classes CSS additionnelles */
  className?: string;
}

/**
 * Footer global de l'application PhotoGlow
 * 
 * Affiche :
 * - Branding et description
 * - Liens de navigation (Product, Support, Legal)
 * - Réseaux sociaux
 * - Copyright et mentions légales
 * 
 * Memoizé car le footer ne change jamais
 * 
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export const Footer = memo(function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-black border-t border-purple-500/20 py-12 md:py-14 lg:py-16 px-4 md:px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-white font-bold text-xl">PhotoGlow</span>
            </div>
            
            {/* Description */}
            <p className="text-gray-400 text-sm">
              Transform your photos with AI-powered enhancement. 
              Create stunning, professional-quality images with ease.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-pink-400"
                aria-label="Contact via message"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-pink-400"
                aria-label="Contact via email"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Product</h4>
            <nav className="space-y-2 text-sm">
              <a href="#features" className="block text-gray-400 hover:text-white transition-colors">
                Features
              </a>
              <a href="#examples" className="block text-gray-400 hover:text-white transition-colors">
                Examples
              </a>
              <a href="#pricing" className="block text-gray-400 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#api" className="block text-gray-400 hover:text-white transition-colors">
                API
              </a>
            </nav>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Support</h4>
            <nav className="space-y-2 text-sm">
              <a href="#help" className="block text-gray-400 hover:text-white transition-colors">
                Help Center
              </a>
              <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="#faq" className="block text-gray-400 hover:text-white transition-colors">
                FAQ
              </a>
              <a href="#documentation" className="block text-gray-400 hover:text-white transition-colors">
                Documentation
              </a>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Legal</h4>
            <nav className="space-y-2 text-sm">
              <a href="#privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="block text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="block text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="#licenses" className="block text-gray-400 hover:text-white transition-colors">
                Licenses
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} PhotoGlow. All rights reserved.
            </p>
            
            {/* Made with love */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span>by the PhotoGlow team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
