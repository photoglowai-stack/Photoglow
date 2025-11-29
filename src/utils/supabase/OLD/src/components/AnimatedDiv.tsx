import { useEffect, useRef, useState, memo } from 'react';

/**
 * AnimatedDiv - Remplace motion.div avec des animations CSS natives
 * Compatible avec la plupart des patterns motion courants
 */

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  initial?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  animate?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  whileInView?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
  };
  viewport?: {
    once?: boolean;
    margin?: string;
  };
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

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
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!whileInView);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Intersection Observer pour whileInView
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

  // Construire les styles CSS
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

/**
 * AnimatePresence - Version simplifiée pour les animations d'entrée/sortie
 */
interface AnimatePresenceProps {
  children: React.ReactNode;
  mode?: 'wait' | 'sync';
}

export function AnimatePresence({ children }: AnimatePresenceProps) {
  // Version simple - juste un wrapper
  return <>{children}</>;
}
