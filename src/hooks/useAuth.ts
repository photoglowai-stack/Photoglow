/**
 * @file useAuth - Hook d'authentification Supabase
 * @description Gère l'état d'authentification de l'utilisateur avec Supabase
 * 
 * Fonctionnalités :
 * - Récupération de la session au mount
 * - Écoute des changements d'état auth (login/logout)
 * - État de chargement pour UI
 * - Cleanup automatique de la subscription
 */

import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import type { User, Session } from '@supabase/supabase-js@2.47.10';

/**
 * Valeur de retour du hook useAuth
 */
export interface UseAuthReturn {
  /** Utilisateur authentifié (null si non connecté) */
  user: User | null;
  /** Session active (null si non connecté) */
  session: Session | null;
  /** Indique si l'état auth est en cours de chargement */
  loading: boolean;
  /** Indique si l'utilisateur est admin selon la configuration front */
  isAdmin: boolean;
}

/**
 * Hook d'authentification Supabase
 * 
 * Gère l'état d'authentification de manière centralisée.
 * S'abonne aux changements d'état (login/logout) et met à jour
 * automatiquement le state.
 * 
 * Utilise Supabase Auth avec :
 * - getSession() pour état initial
 * - onAuthStateChange() pour updates en temps réel
 * 
 * @returns État d'authentification (user, session, loading)
 * 
 * @example
 * ```tsx
 * function ProtectedPage() {
 *   const { user, session, loading } = useAuth();
 *   
 *   if (loading) return <LoadingSkeleton />;
 *   if (!user) return <LoginPrompt />;
 *   
 *   return (
 *     <div>
 *       <h1>Bienvenue {user.email}</h1>
 *       <p>Token: {session.access_token}</p>
 *     </div>
 *   );
 * }
 * 
 * // Usage avec navigation
 * function App() {
 *   const { user, loading } = useAuth();
 *   
 *   useEffect(() => {
 *     if (!loading && !user) {
 *       navigate('/login');
 *     }
 *   }, [user, loading]);
 * }
 * ```
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      const adminEmails = ((import.meta.env.VITE_ADMIN_EMAILS as string | undefined)?.split(',') || [])
        .map(s => s.trim().toLowerCase())
        .filter(Boolean);
      const isAdminEmail = session?.user?.email ? adminEmails.includes(session.user.email.toLowerCase()) : false;
      setIsAdmin(isAdminEmail || Boolean(session?.user?.user_metadata?.is_admin));
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      const adminEmails = ((import.meta.env.VITE_ADMIN_EMAILS as string | undefined)?.split(',') || [])
        .map(s => s.trim().toLowerCase())
        .filter(Boolean);
      const isAdminEmail = session?.user?.email ? adminEmails.includes(session.user.email.toLowerCase()) : false;
      setIsAdmin(isAdminEmail || Boolean(session?.user?.user_metadata?.is_admin));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, session, loading, isAdmin };
}
