/**
 * SDK Front centralisé pour l'API PhotoGlow
 * Tous les appels API doivent passer par ce module
 * @module lib/api
 */

import { config } from './config';
import {
  type PreviewParams,
  PreviewParamsSchema,
  type CreateJobInput,
  CreateJobSchema,
  type JobResponse,
  JobResponseSchema,
  type PhotoList,
  PhotoListSchema,
  type Photo,
  PhotoSchema,
  validateData,
} from './validators';

/**
 * Timeout pour les requêtes API (20 secondes)
 */
export const REQUEST_TIMEOUT_MS = 20_000;

/**
 * Base URL de l'API
 * @throws {Error} Si NEXT_PUBLIC_API_BASE n'est pas défini
 */
export const API_BASE = config.supabase.url;

// ============================================
// CUSTOM ERRORS
// ============================================

/**
 * Erreur API personnalisée
 */
export class APIError extends Error {
  constructor(
    message: string,
    public readonly code: string = 'API_ERROR',
    public readonly status?: number,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Erreur de timeout
 */
export class TimeoutError extends APIError {
  constructor(message: string = 'Request timed out') {
    super(message, 'TIMEOUT_ERROR', 408);
    this.name = 'TimeoutError';
  }
}

/**
 * Erreur de validation
 */
export class ValidationError extends APIError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

/**
 * Erreur de réseau
 */
export class NetworkError extends APIError {
  constructor(message: string = 'Network error') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

// ============================================
// FETCH WRAPPER
// ============================================

/**
 * Options pour fetchWithTimeout
 */
interface FetchOptions extends RequestInit {
  /** Timeout en millisecondes (défaut: 20000) */
  timeout?: number;
  /** Ne pas valider la réponse avec Zod */
  skipValidation?: boolean;
}

/**
 * Fetch avec timeout et gestion d'erreurs typée
 * @param url - URL à fetch
 * @param options - Options de fetch
 * @returns Response
 * @throws {TimeoutError} Si timeout
 * @throws {NetworkError} Si erreur réseau
 * @throws {APIError} Si erreur API
 */
export async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = REQUEST_TIMEOUT_MS, ...fetchOptions } = options;

  // Créer AbortController pour timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    clearTimeout(timeoutId);

    // Vérifier le status HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        errorData.code || 'HTTP_ERROR',
        response.status,
        errorData
      );
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    // Timeout
    if (error instanceof Error && error.name === 'AbortError') {
      throw new TimeoutError(`Request to ${url} timed out after ${timeout}ms`);
    }

    // Network error
    if (error instanceof TypeError) {
      throw new NetworkError(`Failed to fetch ${url}: ${error.message}`);
    }

    // Re-throw si déjà une APIError
    if (error instanceof APIError) {
      throw error;
    }

    // Erreur inconnue
    throw new APIError(
      error instanceof Error ? error.message : 'Unknown error',
      'UNKNOWN_ERROR'
    );
  }
}

// ============================================
// API ENDPOINTS
// ============================================

/**
 * SDK API PhotoGlow
 */
export const api = {
  /**
   * Récupère un aperçu de l'image générée
   * 
   * @param params - Paramètres de génération
   * @returns URL de l'image preview
   * @throws {ValidationError} Si params invalides
   * @throws {TimeoutError} Si timeout (20s)
   * @throws {APIError} Si erreur API
   * 
   * @example
   * ```ts
   * const imageUrl = await api.getPreview({
   *   prompt: 'Professional headshot of a woman...',
   *   model: 'flux',
   *   aspectRatio: '1:1'
   * });
   * ```
   */
  async getPreview(params: PreviewParams): Promise<string> {
    // Validation des params
    const validatedParams = validateData(PreviewParamsSchema, params);

    const response = await fetchWithTimeout(`${API_BASE}/api/preview`, {
      method: 'POST',
      body: JSON.stringify(validatedParams),
    });

    const data = await response.json();
    
    // Retourner l'URL directement (Pollinations retourne juste l'URL)
    if (typeof data === 'string') {
      return data;
    }
    
    if (data.url && typeof data.url === 'string') {
      return data.url;
    }

    throw new APIError('Invalid preview response', 'INVALID_RESPONSE');
  },

  /**
   * Crée un job de génération d'images
   * 
   * @param body - Données du job
   * @returns Job créé avec ID et statut
   * @throws {ValidationError} Si body invalide
   * @throws {TimeoutError} Si timeout
   * @throws {APIError} Si erreur API
   * 
   * @example
   * ```ts
   * const job = await api.createJob({
   *   prompt: 'Professional headshot...',
   *   model: 'flux',
   *   aspectRatio: '1:1',
   *   numOutputs: 4
   * });
   * 
   * console.log(job.id, job.status); // 'uuid', 'pending'
   * ```
   */
  async createJob(body: CreateJobInput): Promise<JobResponse> {
    // Validation du body
    const validatedBody = validateData(CreateJobSchema, body);

    const response = await fetchWithTimeout(`${API_BASE}/api/jobs`, {
      method: 'POST',
      body: JSON.stringify(validatedBody),
    });

    const data = await response.json();
    
    // Validation de la réponse
    return validateData(JobResponseSchema, data);
  },

  /**
   * Récupère le statut d'un job
   * 
   * @param jobId - ID du job
   * @returns Job avec statut mis à jour
   * @throws {APIError} Si job non trouvé ou erreur
   * 
   * @example
   * ```ts
   * const job = await api.getJobStatus('uuid-here');
   * 
   * if (job.status === 'completed') {
   *   console.log('Images:', job.imageUrls);
   * }
   * ```
   */
  async getJobStatus(jobId: string): Promise<JobResponse> {
    const response = await fetchWithTimeout(`${API_BASE}/api/jobs/${jobId}`);
    const data = await response.json();
    return validateData(JobResponseSchema, data);
  },

  /**
   * Liste les photos récentes de la galerie
   * 
   * @param limit - Nombre de photos (défaut: 20, max: 100)
   * @param page - Numéro de page (défaut: 1)
   * @returns Liste paginée de photos
   * @throws {APIError} Si erreur
   * 
   * @example
   * ```ts
   * const { photos, total, hasNext } = await api.listRecent(20, 1);
   * 
   * photos.forEach(photo => {
   *   console.log(photo.url, photo.prompt);
   * });
   * 
   * if (hasNext) {
   *   const nextPage = await api.listRecent(20, 2);
   * }
   * ```
   */
  async listRecent(limit: number = 20, page: number = 1): Promise<PhotoList> {
    const response = await fetchWithTimeout(
      `${API_BASE}/api/photos/recent?limit=${limit}&page=${page}`
    );

    const data = await response.json();
    return validateData(PhotoListSchema, data);
  },

  /**
   * Récupère une photo par ID
   * 
   * @param photoId - ID de la photo
   * @returns Photo complète
   * @throws {APIError} Si photo non trouvée
   * 
   * @example
   * ```ts
   * const photo = await api.getPhoto('uuid-here');
   * console.log(photo.url, photo.views, photo.likes);
   * ```
   */
  async getPhoto(photoId: string): Promise<Photo> {
    const response = await fetchWithTimeout(`${API_BASE}/api/photos/${photoId}`);
    const data = await response.json();
    return validateData(PhotoSchema, data);
  },

  /**
   * Liste les photos d'une catégorie
   * 
   * @param category - Slug de la catégorie
   * @param limit - Nombre de photos
   * @param page - Numéro de page
   * @returns Liste paginée de photos
   * 
   * @example
   * ```ts
   * const { photos } = await api.listByCategory('ai-headshots', 30, 1);
   * ```
   */
  async listByCategory(
    category: string,
    limit: number = 20,
    page: number = 1
  ): Promise<PhotoList> {
    const response = await fetchWithTimeout(
      `${API_BASE}/api/photos/category/${category}?limit=${limit}&page=${page}`
    );

    const data = await response.json();
    return validateData(PhotoListSchema, data);
  },

  /**
   * Upload une photo vers Supabase Storage
   * 
   * @param file - Fichier à uploader
   * @param bucket - Nom du bucket ('ai_gallery' ou 'ai-models')
   * @returns URL publique de la photo
   * @throws {ValidationError} Si fichier invalide
   * @throws {APIError} Si erreur upload
   * 
   * @example
   * ```ts
   * const file = event.target.files[0];
   * const url = await api.uploadPhoto(file, 'ai_gallery');
   * console.log('Uploaded:', url);
   * ```
   */
  async uploadPhoto(file: File, bucket: string = 'ai_gallery'): Promise<string> {
    // Validation du fichier
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new ValidationError(`File too large (max 10MB)`);
    }

    const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!acceptedTypes.includes(file.type)) {
      throw new ValidationError(`Invalid file type (accepted: jpeg, png, webp)`);
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);

    const response = await fetchWithTimeout(`${API_BASE}/api/upload`, {
      method: 'POST',
      body: formData,
      headers: {}, // Ne pas set Content-Type pour FormData
    });

    const data = await response.json();
    
    if (!data.url || typeof data.url !== 'string') {
      throw new APIError('Invalid upload response', 'INVALID_RESPONSE');
    }

    return data.url;
  },
};

// ============================================
// TYPE EXPORTS
// ============================================

export type {
  PreviewParams,
  CreateJobInput,
  JobResponse,
  JobStatus,
  Photo,
  PhotoList,
} from './validators';
