/**
 * @file useCredits - Hook de gestion des crédits utilisateur
 * @description Gère le solde de crédits de l'utilisateur avec états loading/error
 * 
 * Ce hook centralise la logique de récupération des crédits qui était
 * auparavant dupliquée dans Header.tsx et AdminV2Unified.tsx.
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchCredits } from '../utils/api-client';

/**
 * Valeur de retour du hook useCredits
 */
export interface UseCreditsReturn {
  /** Solde de crédits (null si non chargé ou erreur) */
  credits: number | null;
  /** Indique si les crédits sont en cours de chargement */
  loading: boolean;
  /** Message d'erreur (null si pas d'erreur) */
  error: string | null;
  /** Fonction pour recharger les crédits */
  refetch: () => Promise<void>;
}

/**
 * Hook de gestion des crédits utilisateur
 * 
 * Charge automatiquement le solde de crédits au mount et fournit
 * une fonction `refetch()` pour recharger manuellement.
 * 
 * Gère les états :
 * - `loading` : true pendant le chargement
 * - `error` : message d'erreur si échec
 * - `credits` : solde actuel
 * 
 * @returns État des crédits (credits, loading, error, refetch)
 * 
 * @example
 * ```tsx
 * function CreditsBadge() {
 *   const { credits, loading, error, refetch } = useCredits();
 *   
 *   if (loading) return <Spinner />;
 *   if (error) return <ErrorMessage error={error} />;
 *   
 *   return (
 *     <div>
 *       <Badge>{credits} crédits</Badge>
 *       <Button onClick={refetch}>Actualiser</Button>
 *     </div>
 *   );
 * }
 * 
 * // Usage après génération d'image
 * function PhotoGenerator() {
 *   const { credits, refetch } = useCredits();
 *   
 *   const handleGenerate = async () => {
 *     await generatePhoto();
 *     await refetch(); // Recharger le solde après génération
 *   };
 * }
 * ```
 */
export function useCredits(): UseCreditsReturn {
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCredits = useCallback(async () => {
    try {
      setLoading(true);
      const balance = await fetchCredits();
      setCredits(balance);
      setError(null);
    } catch (err: any) {
      console.error('Error loading credits:', err);
      setError(err.message);
      setCredits(null);
    } finally {
      setLoading(false);
    }
  }, []); // Pas de dépendances - fetchCredits est stable

  useEffect(() => {
    loadCredits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Charge une seule fois au montage

  const refetch = loadCredits; // Pas besoin de useCallback supplémentaire

  return { credits, loading, error, refetch };
}
