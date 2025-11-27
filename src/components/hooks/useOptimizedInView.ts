import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Hook optimisé pour les animations au scroll
 * Utilise des marges pour précharger les animations
 */
export function useOptimizedInView() {
  const ref = useRef(null);
  
  // Précharge les animations 100px avant qu'elles soient visibles
  const isInView = useInView(ref, { 
    once: true, // Animation une seule fois pour meilleures perfs
    margin: "0px 0px -100px 0px" // Trigger plus tôt
  });

  return { ref, isInView };
}

/**
 * Hook pour les animations qui doivent se répéter
 * Utilise une marge plus petite pour éviter les animations prématurées
 */
export function useOptimizedInViewRepeat() {
  const ref = useRef(null);
  
  const isInView = useInView(ref, { 
    once: false,
    margin: "0px 0px -50px 0px"
  });

  return { ref, isInView };
}
