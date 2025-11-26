/**
 * Client Supabase configuré et typé
 * @module lib/supabase/client
 */

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "@/utils/supabase/info";
import type { Database } from "@/types/database";

/**
 * URL du projet Supabase
 */
const supabaseUrl = `https://${projectId}.supabase.co`;

/**
 * Client Supabase singleton avec types stricts
 * @description
 * Client configuré pour :
 * - Authentification utilisateur
 * - Accès à la base de données Postgres
 * - Stockage de fichiers
 * - Real-time subscriptions
 * 
 * @example
 * // Authentification
 * const { data, error } = await supabase.auth.signIn({ email, password })
 * 
 * @example
 * // Requête base de données
 * const { data } = await supabase.from("credits").select("*")
 * 
 * @example
 * // Upload de fichier
 * await supabase.storage.from("ai_gallery").upload("path/file.jpg", file)
 */
export const supabase = createSupabaseClient<Database>(
  supabaseUrl,
  publicAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Récupère la session utilisateur actuelle
 * @returns Session avec access_token ou null
 * @example
 * const session = await getCurrentSession()
 * if (session) {
 *   console.log("User ID:", session.user.id)
 * }
 */
export async function getCurrentSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session:", error);
    return null;
  }

  return session;
}

/**
 * Récupère l'utilisateur authentifié
 * @returns Utilisateur ou null
 * @example
 * const user = await getCurrentUser()
 * if (user) {
 *   console.log("Logged in as:", user.email)
 * }
 */
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error getting user:", error);
    return null;
  }

  return user;
}

/**
 * Déconnecte l'utilisateur actuel
 * @returns Promesse résolue lors de la déconnexion
 * @example
 * await signOut()
 * router.push("/")
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

/**
 * Vérifie si l'utilisateur est authentifié
 * @returns true si authentifié
 * @example
 * const isAuth = await isAuthenticated()
 * if (!isAuth) {
 *   router.push("/login")
 * }
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getCurrentSession();
  return !!session;
}
