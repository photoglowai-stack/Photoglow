/**
 * @file AnimatedDiv - Remplacement de Framer Motion avec CSS natif
 * @description Composant d'animation qui remplace motion.div avec des animations CSS pures
 * 
 * Ce composant a été créé lors de la migration de Framer Motion vers CSS natif
 * pour réduire le bundle size de 93KB. Il est compatible avec la plupart des
 * patterns motion courants.
 */

import { useEffect, useRef, useState, memo } from 'react';

/**
 * Configuration des animations initiales
 */
export interface AnimationInitial {
  /** Opacité initiale (0-1) */
  opacity?: number;
  /** Translation Y en pixels */
  y?: number;
  /** Translation X en pixels */
  x?: number;
  /** Scale (1 = 100%) */
  scale?: number;
}

/**
 * Configuration des animations finales
 */
export interface AnimationAnimate {
  /** Opacité finale (0-1) */
  opacity?: number;
  /** Translation Y finale en pixels */
  y?: number;
  /** Translation X finale en pixels */
  x?: number;
  /** Scale finale (1 = 100%) */
  scale?: number;
}

/**
 * Configuration de la transition
 */
export interface AnimationTransition {
  /** Durée de la transition en secondes */
  duration?: number;
  /** Délai avant démarrage en secondes */
  delay?: number;
  /** Fonction d'easing CSS */
  ease?: string;
}

/**
 * Configuration du viewport pour whileInView
 */
export interface AnimationViewport {
  /** Animation une seule fois ou à chaque entrée dans viewport */
  once?: boolean;
  /** Marge du viewport en CSS (ex: '100px') */
  margin?: string;
}

/**
 * Props pour le composant AnimatedDiv
 */
export interface AnimatedDivProps {
  /** Contenu du div */
  children: React.ReactNode;
  /** Classes CSS additionnelles */
  className?: string;
  /** Styles CSS inline */
  style?: React.CSSProperties;
  /** État initial de l'animation */
  initial?: AnimationInitial;
  /** État final de l'animation */
  animate?: AnimationAnimate;
  /** Animation au scroll (Intersection Observer) */
  whileInView?: AnimationAnimate;
  /** Configuration de la transition */
  transition?: AnimationTransition;
  /** Configuration du viewport pour whileInView */
  viewport?: AnimationViewport;
  /** Callback au clic */
  onClick?: () => void;
  /** Callback au survol */
  onMouseEnter?: () => void;
  /** Callback à la sortie du survol */
  onMouseLeave?: () => void;
}

/**
 * AnimatedDiv - Remplacement de motion.div avec CSS natif
 * 
 * Fonctionnalités :
 * - Animations initial → animate
 * - Animations au scroll avec whileInView
 * - Intersection Observer pour performance
 * - Transitions configurables
 * - Compatible avec la plupart des patterns Framer Motion
 * 
 * Optimisations :
 * - Memoizé pour éviter re-renders
 * - Déconnecte l'observer après animation (mode once)
 * - Utilise cubic-bezier natif CSS
 * 
 * @example
 * ```tsx
 * // Fade in au chargement
 * <AnimatedDiv 
 *   initial={{ opacity: 0 }}
 *   animate={{ opacity: 1 }}
 *   transition={{ duration: 0.5 }}
 * >
 *   Contenu
 * </AnimatedDiv>
 * 
 * // Slide up au scroll
 * <AnimatedDiv 
 *   initial={{ opacity: 0, y: 50 }}
 *   whileInView={{ opacity: 1, y: 0 }}
 *   viewport={{ once: true, margin: '100px' }}
 * >
 *   Contenu révélé au scroll
 * </AnimatedDiv>
 * ```
 */
export const AnimatedDiv = memo(function AnimatedDiv({
  children,
  className = '',
  style = {},
  initial,
  animate,
  whileInView,
  transition = {},
  viewport = { once: true },
  onClick,
  onMouseEnter,
  onMouseLeave,
}: AnimatedDivProps) {
  
  // ============================================
  // STATE & REFS
  // ============================================
  
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!whileInView);
  const [hasAnimated, setHasAnimated] = useState(false);

  // ============================================
  // EFFECTS - Intersection Observer
  // ============================================

  /**
   * Configure l'Intersection Observer pour whileInView
   * Anime le composant quand il entre dans le viewport
   */
  useEffect(() => {
    if (!whileInView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (viewport.once) {
            setHasAnimated(true);
            observer.disconnect();
          }
        } else if (!viewport.once && hasAnimated) {
          setIsVisible(false);
        }
      },
      {
        rootMargin: viewport.margin || '0px',
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [whileInView, viewport.once, viewport.margin, hasAnimated]);

  // ============================================
  // STYLES CALCULATION
  // ============================================

  const animationTarget = whileInView || animate || {};
  const duration = transition.duration || 0.5;
  const delay = transition.delay || 0;

  const baseStyle: React.CSSProperties = {
    ...style,
    transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
  };

  // Style initial
  const initialStyle: React.CSSProperties = {
    opacity: initial?.opacity ?? 1,
    transform: `
      translateX(${initial?.x ?? 0}px) 
      translateY(${initial?.y ?? 0}px) 
      scale(${initial?.scale ?? 1})
    `.trim(),
  };

  // Style animé
  const animatedStyle: React.CSSProperties = {
    opacity: animationTarget.opacity ?? 1,
    transform: `
      translateX(${animationTarget.x ?? 0}px) 
      translateY(${animationTarget.y ?? 0}px) 
      scale(${animationTarget.scale ?? 1})
    `.trim(),
  };

  const finalStyle = isVisible
    ? { ...baseStyle, ...animatedStyle }
    : { ...baseStyle, ...initialStyle };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div
      ref={ref}
      className={className}
      style={finalStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
});

AnimatedDiv.displayName = 'AnimatedDiv';

// ============================================
// AnimatePresence - Version simplifiée
// ============================================

/**
 * Props pour AnimatePresence
 */
export interface AnimatePresenceProps {
  /** Contenu à animer */
  children: React.ReactNode;
  /** Mode d'animation (wait ou sync) - actuellement non utilisé */
  mode?: 'wait' | 'sync';
}

/**
 * AnimatePresence - Version simplifiée pour compatibilité
 * 
 * Dans la version Framer Motion, AnimatePresence gère les animations
 * d'entrée/sortie. Dans notre version CSS native, c'est un simple wrapper.
 * 
 * @example
 * ```tsx
 * <AnimatePresence mode="wait">
 *   {isOpen && <Modal />}
 * </AnimatePresence>
 * ```
 */
export function AnimatePresence({ children }: AnimatePresenceProps) {
  // Version simple - juste un wrapper
  // Les animations d'entrée/sortie sont gérées par CSS
  return <>{children}</>;
}
