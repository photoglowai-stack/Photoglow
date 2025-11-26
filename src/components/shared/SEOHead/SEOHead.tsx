/**
 * @file SEOHead - Composant de gestion du SEO
 * @description Gère dynamiquement les meta tags pour le SEO et le partage social
 * 
 * Fonctionnalités :
 * - Title dynamique
 * - Meta description
 * - Meta keywords
 * - Open Graph tags (Facebook, LinkedIn)
 * - Twitter Card tags
 * - Preconnect links pour performance
 */

import { useEffect } from 'react';

/**
 * Props pour le composant SEOHead
 */
export interface SEOHeadProps {
  /** Titre de la page (apparaît dans l'onglet et les résultats de recherche) */
  title: string;
  /** Description de la page (snippet dans les résultats de recherche) */
  description: string;
  /** Mots-clés SEO (optionnel, moins important pour Google moderne) */
  keywords?: string;
  /** URL de l'image pour les partages sociaux (optionnel) */
  image?: string;
  /** URL canonique de la page (optionnel) */
  canonical?: string;
}

/**
 * Composant SEOHead - Gestion des meta tags SEO
 * 
 * Met à jour dynamiquement les meta tags du document pour :
 * - Améliorer le référencement naturel (SEO)
 * - Optimiser les partages sur réseaux sociaux
 * - Améliorer les performances avec preconnect
 * 
 * Utilise les effets de bord pour modifier le DOM du document.
 * 
 * @example
 * ```tsx
 * <SEOHead 
 *   title="PhotoGlow - AI Photo Enhancement"
 *   description="Transform your photos with AI"
 *   keywords="AI, photo, enhancement, PhotoGlow"
 * />
 * ```
 */
export function SEOHead({ 
  title, 
  description, 
  keywords,
  image,
  canonical 
}: SEOHeadProps) {
  useEffect(() => {
    // ============================================
    // PERFORMANCE - Preconnect Links
    // ============================================
    
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://images.unsplash.com'
    ];

    preconnectDomains.forEach(domain => {
      let link = document.querySelector(`link[rel="preconnect"][href="${domain}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'preconnect');
        link.setAttribute('href', domain);
        if (domain.includes('gstatic')) {
          link.setAttribute('crossorigin', '');
        }
        document.head.appendChild(link);
      }
    });

    // ============================================
    // BASIC SEO - Title & Description
    // ============================================

    // Update page title
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // ============================================
    // KEYWORDS - Optional
    // ============================================

    // Update or create meta keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // ============================================
    // OPEN GRAPH - Facebook, LinkedIn
    // ============================================

    // OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // OG Description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);

    // OG Image (if provided)
    if (image) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', image);
    }

    // ============================================
    // TWITTER CARD - X (Twitter)
    // ============================================

    // Twitter Title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', title);

    // Twitter Description
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', description);

    // Twitter Image (if provided)
    if (image) {
      let twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (!twitterImage) {
        twitterImage = document.createElement('meta');
        twitterImage.setAttribute('name', 'twitter:image');
        document.head.appendChild(twitterImage);
      }
      twitterImage.setAttribute('content', image);
    }

    // ============================================
    // CANONICAL URL - Duplicate Content Prevention
    // ============================================

    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }

  }, [title, description, keywords, image, canonical]);

  // Ce composant ne rend rien - il modifie seulement le <head>
  return null;
}
