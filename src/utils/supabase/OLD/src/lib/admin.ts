/**
 * SDK Admin pour actions administratives
 * Uniquement accessible aux utilisateurs admin
 * @module lib/admin
 */

import { revalidatePath as nextRevalidatePath } from 'next/cache';
import { APIError, API_BASE, fetchWithTimeout } from './api';
import {
  type TriggerDeployInput,
  TriggerDeploySchema,
  type DeployResult,
  DeployResultSchema,
  type RevalidatePathInput,
  RevalidatePathSchema,
  validateData,
} from './validators';

// ============================================
// CUSTOM ERRORS
// ============================================

/**
 * Erreur d'autorisation admin
 */
export class AdminError extends APIError {
  constructor(message: string = 'Admin access required') {
    super(message, 'ADMIN_ERROR', 403);
    this.name = 'AdminError';
  }
}

// ============================================
// ADMIN SDK
// ============================================

/**
 * SDK Admin PhotoGlow
 * 
 * Fonctionnalités :
 * - Déploiement Vercel
 * - Revalidation de cache Next.js
 * - Monitoring de jobs
 * - Gestion de la galerie
 */
export const admin = {
  /**
   * Déclenche un déploiement Vercel
   * 
   * Utilise l'API Vercel pour redéployer l'application.
   * Nécessite un token admin.
   * 
   * @param input - Paramètres de déploiement
   * @returns Résultat du déploiement
   * @throws {AdminError} Si pas d'accès admin
   * @throws {APIError} Si erreur déploiement
   * 
   * @example
   * ```ts
   * // Déploiement production
   * const result = await admin.triggerDeploy({
   *   environment: 'production',
   *   message: 'Update prompts config'
   * });
   * 
   * if (result.success) {
   *   console.log('Deployed to:', result.deployUrl);
   * }
   * ```
   */
  async triggerDeploy(input: TriggerDeployInput = {}): Promise<DeployResult> {
    // Validation de l'input
    const validatedInput = validateData(TriggerDeploySchema, input);

    const response = await fetchWithTimeout(`${API_BASE}/api/admin/deploy`, {
      method: 'POST',
      body: JSON.stringify(validatedInput),
    });

    const data = await response.json();
    return validateData(DeployResultSchema, data);
  },

  /**
   * Revalide un chemin Next.js (ISR)
   * 
   * Force Next.js à régénérer une page statique.
   * Utilise la fonction native `revalidatePath` de Next.js.
   * 
   * @param path - Chemin à revalider (ex: '/gallery', '/ideas')
   * @param type - Type de revalidation ('page' ou 'layout')
   * @throws {AdminError} Si pas d'accès admin
   * 
   * @example
   * ```ts
   * // Revalider la galerie
   * await admin.revalidatePath('/gallery');
   * 
   * // Revalider toutes les pages d'idées
   * await admin.revalidatePath('/ideas', 'page');
   * ```
   */
  async revalidatePath(
    path: string,
    type: 'page' | 'layout' = 'page'
  ): Promise<void> {
    // Validation de l'input
    validateData(RevalidatePathSchema, { path, type });

    try {
      // Utiliser la fonction Next.js native
      nextRevalidatePath(path, type);
    } catch (error) {
      throw new AdminError(
        `Failed to revalidate ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  },

  /**
   * Revalide plusieurs chemins en batch
   * 
   * @param paths - Tableau de chemins à revalider
   * @returns Nombre de chemins revalidés
   * 
   * @example
   * ```ts
   * await admin.revalidateMultiplePaths([
   *   '/gallery',
   *   '/ideas',
   *   '/create'
   * ]);
   * ```
   */
  async revalidateMultiplePaths(paths: string[]): Promise<number> {
    let revalidated = 0;

    for (const path of paths) {
      try {
        await this.revalidatePath(path);
        revalidated++;
      } catch (error) {
        console.error(`Failed to revalidate ${path}:`, error);
      }
    }

    return revalidated;
  },

  /**
   * Récupère les statistiques de jobs
   * 
   * @returns Statistiques (pending, processing, completed, failed)
   * @throws {AdminError} Si pas d'accès admin
   * 
   * @example
   * ```ts
   * const stats = await admin.getJobStats();
   * console.log(`${stats.pending} pending, ${stats.completed} completed`);
   * ```
   */
  async getJobStats(): Promise<{
    pending: number;
    processing: number;
    completed: number;
    failed: number;
    total: number;
  }> {
    const response = await fetchWithTimeout(`${API_BASE}/api/admin/jobs/stats`);
    const data = await response.json();

    return {
      pending: data.pending || 0,
      processing: data.processing || 0,
      completed: data.completed || 0,
      failed: data.failed || 0,
      total: data.total || 0,
    };
  },

  /**
   * Liste tous les jobs avec filtres
   * 
   * @param status - Filtrer par statut (optionnel)
   * @param limit - Nombre de jobs
   * @param page - Numéro de page
   * @returns Liste de jobs
   * 
   * @example
   * ```ts
   * // Tous les jobs failed
   * const failedJobs = await admin.listJobs('failed', 50, 1);
   * 
   * // Tous les jobs
   * const allJobs = await admin.listJobs(undefined, 100, 1);
   * ```
   */
  async listJobs(
    status?: string,
    limit: number = 50,
    page: number = 1
  ): Promise<any[]> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    });

    if (status) {
      params.append('status', status);
    }

    const response = await fetchWithTimeout(
      `${API_BASE}/api/admin/jobs?${params.toString()}`
    );

    const data = await response.json();
    return data.jobs || [];
  },

  /**
   * Supprime un job par ID
   * 
   * @param jobId - ID du job à supprimer
   * @throws {AdminError} Si pas d'accès admin
   * 
   * @example
   * ```ts
   * await admin.deleteJob('uuid-here');
   * ```
   */
  async deleteJob(jobId: string): Promise<void> {
    await fetchWithTimeout(`${API_BASE}/api/admin/jobs/${jobId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Nettoie les jobs failed de plus de 7 jours
   * 
   * @returns Nombre de jobs supprimés
   * 
   * @example
   * ```ts
   * const deleted = await admin.cleanupOldJobs();
   * console.log(`Deleted ${deleted} old jobs`);
   * ```
   */
  async cleanupOldJobs(): Promise<number> {
    const response = await fetchWithTimeout(
      `${API_BASE}/api/admin/jobs/cleanup`,
      {
        method: 'POST',
      }
    );

    const data = await response.json();
    return data.deleted || 0;
  },

  /**
   * Régénère les images d'une catégorie
   * 
   * Lance la régénération de toutes les images d'une catégorie
   * avec les prompts optimisés.
   * 
   * @param categoryId - Slug de la catégorie
   * @returns Job ID de la régénération
   * 
   * @example
   * ```ts
   * const jobId = await admin.regenerateCategory('ai-headshots');
   * console.log('Regeneration started:', jobId);
   * ```
   */
  async regenerateCategory(categoryId: string): Promise<string> {
    const response = await fetchWithTimeout(
      `${API_BASE}/api/admin/categories/${categoryId}/regenerate`,
      {
        method: 'POST',
      }
    );

    const data = await response.json();
    return data.jobId;
  },

  /**
   * Récupère les statistiques de la galerie
   * 
   * @returns Statistiques (total photos, par catégorie, etc.)
   * 
   * @example
   * ```ts
   * const stats = await admin.getGalleryStats();
   * console.log(`${stats.totalPhotos} photos, ${stats.totalCategories} categories`);
   * ```
   */
  async getGalleryStats(): Promise<{
    totalPhotos: number;
    totalCategories: number;
    totalViews: number;
    totalLikes: number;
    byCategory: Record<string, number>;
  }> {
    const response = await fetchWithTimeout(`${API_BASE}/api/admin/gallery/stats`);
    const data = await response.json();

    return {
      totalPhotos: data.totalPhotos || 0,
      totalCategories: data.totalCategories || 0,
      totalViews: data.totalViews || 0,
      totalLikes: data.totalLikes || 0,
      byCategory: data.byCategory || {},
    };
  },

  /**
   * Supprime une photo de la galerie
   * 
   * @param photoId - ID de la photo
   * @throws {AdminError} Si pas d'accès admin
   * 
   * @example
   * ```ts
   * await admin.deletePhoto('uuid-here');
   * ```
   */
  async deletePhoto(photoId: string): Promise<void> {
    await fetchWithTimeout(`${API_BASE}/api/admin/photos/${photoId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Publie/dépublie une photo
   * 
   * @param photoId - ID de la photo
   * @param isPublic - True pour publier, false pour dépublier
   * 
   * @example
   * ```ts
   * await admin.setPhotoVisibility('uuid-here', true);
   * ```
   */
  async setPhotoVisibility(photoId: string, isPublic: boolean): Promise<void> {
    await fetchWithTimeout(`${API_BASE}/api/admin/photos/${photoId}/visibility`, {
      method: 'PATCH',
      body: JSON.stringify({ isPublic }),
    });
  },
};

// ============================================
// TYPE EXPORTS
// ============================================

export type {
  TriggerDeployInput,
  DeployResult,
  RevalidatePathInput,
} from './validators';

export { AdminError };
