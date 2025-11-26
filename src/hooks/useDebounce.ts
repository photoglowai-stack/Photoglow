/**
 * @file useDebounce - Hooks de debouncing pour valeurs et fonctions
 * @description Utilitaires pour optimiser les performances en évitant
 * les re-renders et appels excessifs lors d'inputs utilisateur rapides
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook pour debouncer une valeur
 * 
 * Retarde la mise à jour d'une valeur jusqu'à ce que l'utilisateur
 * arrête de la modifier pendant un certain délai.
 * 
 * Cas d'usage :
 * - Recherche en temps réel (éviter API calls à chaque touche)
 * - Filtrage de listes
 * - Validation de formulaire
 * 
 * @template T - Type de la valeur à debouncer
 * @param value - Valeur à debouncer
 * @param delay - Délai en millisecondes (défaut: 300ms)
 * @returns Valeur debouncée
 * 
 * @example
 * ```tsx
 * function SearchInput() {
 *   const [search, setSearch] = useState('');
 *   const debouncedSearch = useDebouncedValue(search, 500);
 *   
 *   // API call uniquement quand l'utilisateur arrête de taper
 *   useEffect(() => {
 *     if (debouncedSearch) {
 *       searchAPI(debouncedSearch);
 *     }
 *   }, [debouncedSearch]);
 *   
 *   return <input value={search} onChange={e => setSearch(e.target.value)} />;
 * }
 * ```
 */
export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook pour debouncer une fonction
 * 
 * Crée une version debouncée d'une fonction qui attend un certain délai
 * avant de s'exécuter après le dernier appel.
 * 
 * Cas d'usage :
 * - Sauvegarde automatique (éviter saves multiples)
 * - Resize handlers
 * - Scroll handlers
 * - Analytics events
 * 
 * @template T - Type de la fonction à debouncer
 * @param callback - Fonction à debouncer
 * @param delay - Délai en millisecondes
 * @returns Fonction debouncée
 * 
 * @example
 * ```tsx
 * function AutoSave() {
 *   const saveToServer = (data: FormData) => {
 *     fetch('/api/save', { method: 'POST', body: data });
 *   };
 *   
 *   // Sauvegarde uniquement 1 seconde après la dernière modification
 *   const debouncedSave = useDebounce(saveToServer, 1000);
 *   
 *   const handleChange = (e) => {
 *     const formData = new FormData(e.target.form);
 *     debouncedSave(formData);
 *   };
 *   
 *   return <input onChange={handleChange} />;
 * }
 * ```
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  // Garder la référence du callback à jour sans re-créer la fonction debouncée
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay] // callback retiré des dépendances pour éviter de recréer la fonction
  );
}
