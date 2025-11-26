/**
 * Schémas de validation Zod pour l'application PhotoGlow
 * Tous les inputs/outputs API doivent être validés avec ces schémas
 * @module lib/validators
 */

import { z } from 'zod';
import { AI_MODELS, ASPECT_RATIOS } from './constants/models';

// ============================================
// SCHEMAS DE BASE
// ============================================

/**
 * Schema pour UUID v4
 */
export const UUIDSchema = z.string().uuid();

/**
 * Schema pour URL
 */
export const URLSchema = z.string().url();

/**
 * Schema pour email
 */
export const EmailSchema = z.string().email();

/**
 * Schema pour date ISO 8601
 */
export const ISODateSchema = z.string().datetime();

// ============================================
// SCHEMAS MODELES AI
// ============================================

/**
 * Schema pour modèle AI
 */
export const AIModelSchema = z.enum(['flux', 'sdxl', 'playground', 'custom']);

/**
 * Schema pour ratio d'aspect
 */
export const AspectRatioSchema = z.enum(['1:1', '16:9', '9:16', '4:3', '3:4']);

/**
 * Schema pour catégorie AI
 */
export const CategorySchema = z.string().min(1);

// ============================================
// SCHEMAS GENERATION D'IMAGES
// ============================================

/**
 * Schema pour paramètres de preview
 * Utilisé pour /api/preview
 */
export const PreviewParamsSchema = z.object({
  /** Prompt de génération (10-1000 caractères) */
  prompt: z.string().min(10).max(1000),
  /** Modèle AI à utiliser */
  model: AIModelSchema.default('flux'),
  /** Ratio d'aspect */
  aspectRatio: AspectRatioSchema.default('1:1'),
  /** Seed pour reproduction (optionnel) */
  seed: z.number().int().min(0).max(999999).optional(),
});

export type PreviewParams = z.infer<typeof PreviewParamsSchema>;

/**
 * Schema pour création de job
 * Utilisé pour /api/jobs
 */
export const CreateJobSchema = z.object({
  /** Prompt de génération */
  prompt: z.string().min(10).max(1000),
  /** Modèle AI */
  model: AIModelSchema,
  /** Ratio d'aspect */
  aspectRatio: AspectRatioSchema,
  /** Nombre d'images à générer (1-4) */
  numOutputs: z.number().int().min(1).max(4).default(1),
  /** Catégorie (optionnel) */
  category: CategorySchema.optional(),
  /** ID modèle personnalisé (optionnel) */
  customModelId: UUIDSchema.optional(),
});

export type CreateJobInput = z.infer<typeof CreateJobSchema>;

/**
 * Schema pour statut de job
 */
export const JobStatusSchema = z.enum([
  'pending',
  'processing',
  'completed',
  'failed',
  'cancelled',
]);

export type JobStatus = z.infer<typeof JobStatusSchema>;

/**
 * Schema pour réponse job
 */
export const JobResponseSchema = z.object({
  /** ID unique du job */
  id: UUIDSchema,
  /** Statut actuel */
  status: JobStatusSchema,
  /** Prompt utilisé */
  prompt: z.string(),
  /** Modèle utilisé */
  model: AIModelSchema,
  /** Ratio d'aspect */
  aspectRatio: AspectRatioSchema,
  /** URLs des images générées */
  imageUrls: z.array(URLSchema).optional(),
  /** Message d'erreur si échec */
  error: z.string().optional(),
  /** Progression (0-100) */
  progress: z.number().int().min(0).max(100).optional(),
  /** Date de création */
  createdAt: ISODateSchema,
  /** Date de mise à jour */
  updatedAt: ISODateSchema,
});

export type JobResponse = z.infer<typeof JobResponseSchema>;

// ============================================
// SCHEMAS PHOTOS
// ============================================

/**
 * Schema pour photo générée
 */
export const PhotoSchema = z.object({
  /** ID unique */
  id: UUIDSchema,
  /** URL de l'image */
  url: URLSchema,
  /** URL thumbnail (optionnel) */
  thumbnailUrl: URLSchema.optional(),
  /** Prompt utilisé */
  prompt: z.string(),
  /** Modèle utilisé */
  model: z.string(),
  /** Ratio d'aspect */
  aspectRatio: z.string(),
  /** Catégorie */
  category: z.string().optional(),
  /** Seed utilisé */
  seed: z.number().optional(),
  /** Largeur en pixels */
  width: z.number().int().positive(),
  /** Hauteur en pixels */
  height: z.number().int().positive(),
  /** Taille en bytes */
  sizeBytes: z.number().int().positive().optional(),
  /** Format (jpeg, png, webp) */
  format: z.enum(['jpeg', 'png', 'webp']).optional(),
  /** ID utilisateur propriétaire */
  userId: UUIDSchema.optional(),
  /** Date de création */
  createdAt: ISODateSchema,
  /** Publique ou privée */
  isPublic: z.boolean().default(false),
  /** Nombre de vues */
  views: z.number().int().min(0).default(0),
  /** Nombre de likes */
  likes: z.number().int().min(0).default(0),
});

export type Photo = z.infer<typeof PhotoSchema>;

/**
 * Schema pour liste de photos (pagination)
 */
export const PhotoListSchema = z.object({
  /** Photos */
  photos: z.array(PhotoSchema),
  /** Total de photos */
  total: z.number().int().min(0),
  /** Page actuelle (1-indexed) */
  page: z.number().int().min(1),
  /** Nombre par page */
  limit: z.number().int().min(1).max(100),
  /** Nombre total de pages */
  totalPages: z.number().int().min(0),
  /** Y a-t-il une page suivante */
  hasNext: z.boolean(),
  /** Y a-t-il une page précédente */
  hasPrev: z.boolean(),
});

export type PhotoList = z.infer<typeof PhotoListSchema>;

// ============================================
// SCHEMAS MODELES PERSONNALISES
// ============================================

/**
 * Schema pour création de modèle personnalisé
 */
export const CreateCustomModelSchema = z.object({
  /** Nom du modèle */
  name: z.string().min(1).max(100),
  /** Description (optionnel) */
  description: z.string().max(500).optional(),
  /** Genre (homme/femme) */
  gender: z.enum(['male', 'female', 'other']),
  /** Type de modèle */
  type: z.enum(['person', 'style', 'object']).default('person'),
});

export type CreateCustomModelInput = z.infer<typeof CreateCustomModelSchema>;

/**
 * Schema pour modèle personnalisé
 */
export const CustomModelSchema = z.object({
  /** ID unique */
  id: UUIDSchema,
  /** Nom */
  name: z.string(),
  /** Description */
  description: z.string().optional(),
  /** Genre */
  gender: z.enum(['male', 'female', 'other']),
  /** Type */
  type: z.enum(['person', 'style', 'object']),
  /** Statut d'entraînement */
  status: z.enum(['pending', 'training', 'ready', 'failed']),
  /** Progression (0-100) */
  progress: z.number().int().min(0).max(100).default(0),
  /** URLs des photos d'entraînement */
  trainingPhotos: z.array(URLSchema),
  /** Nombre de photos d'entraînement */
  photoCount: z.number().int().min(0),
  /** ID utilisateur propriétaire */
  userId: UUIDSchema,
  /** Date de création */
  createdAt: ISODateSchema,
  /** Date de mise à jour */
  updatedAt: ISODateSchema,
  /** Date de fin d'entraînement */
  trainedAt: ISODateSchema.optional(),
});

export type CustomModel = z.infer<typeof CustomModelSchema>;

// ============================================
// SCHEMAS UTILISATEUR
// ============================================

/**
 * Schema pour utilisateur
 */
export const UserSchema = z.object({
  /** ID unique */
  id: UUIDSchema,
  /** Email */
  email: EmailSchema,
  /** Nom complet (optionnel) */
  fullName: z.string().optional(),
  /** URL avatar (optionnel) */
  avatarUrl: URLSchema.optional(),
  /** Crédits restants */
  credits: z.number().int().min(0),
  /** Date de création */
  createdAt: ISODateSchema,
  /** Dernière connexion */
  lastLoginAt: ISODateSchema.optional(),
  /** Rôle */
  role: z.enum(['user', 'admin']).default('user'),
});

export type User = z.infer<typeof UserSchema>;

// ============================================
// SCHEMAS CREDITS
// ============================================

/**
 * Schema pour débit de crédits
 */
export const DebitCreditsSchema = z.object({
  /** ID utilisateur */
  userId: UUIDSchema,
  /** Nombre de crédits à débiter */
  amount: z.number().int().min(1),
  /** Raison du débit */
  reason: z.enum(['image_generation', 'video_generation', 'model_training']),
  /** Métadonnées (optionnel) */
  metadata: z.record(z.unknown()).optional(),
});

export type DebitCreditsInput = z.infer<typeof DebitCreditsSchema>;

/**
 * Schema pour balance de crédits
 */
export const CreditsBalanceSchema = z.object({
  /** ID utilisateur */
  userId: UUIDSchema,
  /** Crédits restants */
  balance: z.number().int().min(0),
  /** Dernière mise à jour */
  updatedAt: ISODateSchema,
});

export type CreditsBalance = z.infer<typeof CreditsBalanceSchema>;

// ============================================
// SCHEMAS ADMIN
// ============================================

/**
 * Schema pour trigger deploy
 */
export const TriggerDeploySchema = z.object({
  /** Environnement cible */
  environment: z.enum(['production', 'preview']).default('production'),
  /** Message de commit (optionnel) */
  message: z.string().max(200).optional(),
});

export type TriggerDeployInput = z.infer<typeof TriggerDeploySchema>;

/**
 * Schema pour revalidate path
 */
export const RevalidatePathSchema = z.object({
  /** Chemin à revalider */
  path: z.string().min(1),
  /** Type (page ou layout) */
  type: z.enum(['page', 'layout']).default('page'),
});

export type RevalidatePathInput = z.infer<typeof RevalidatePathSchema>;

/**
 * Schema pour résultat deploy
 */
export const DeployResultSchema = z.object({
  /** Succès */
  success: z.boolean(),
  /** Message */
  message: z.string(),
  /** URL de déploiement */
  deployUrl: URLSchema.optional(),
  /** Timestamp */
  timestamp: ISODateSchema,
});

export type DeployResult = z.infer<typeof DeployResultSchema>;

// ============================================
// SCHEMAS PAGINATION
// ============================================

/**
 * Schema pour paramètres de pagination
 */
export const PaginationParamsSchema = z.object({
  /** Numéro de page (1-indexed) */
  page: z.number().int().min(1).default(1),
  /** Nombre d'items par page */
  limit: z.number().int().min(1).max(100).default(20),
  /** Champ de tri */
  sortBy: z.string().optional(),
  /** Direction de tri */
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;

// ============================================
// SCHEMAS ERREURS
// ============================================

/**
 * Schema pour erreur API
 */
export const APIErrorSchema = z.object({
  /** Code d'erreur */
  code: z.string(),
  /** Message d'erreur */
  message: z.string(),
  /** Details supplémentaires */
  details: z.unknown().optional(),
  /** Timestamp */
  timestamp: ISODateSchema,
  /** Request ID (pour tracking) */
  requestId: UUIDSchema.optional(),
});

export type APIError = z.infer<typeof APIErrorSchema>;

// ============================================
// HELPERS DE VALIDATION
// ============================================

/**
 * Valide et parse des données avec un schema Zod
 * @param schema - Schema Zod
 * @param data - Données à valider
 * @returns Données validées
 * @throws {z.ZodError} Si validation échoue
 */
export function validateData<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> {
  return schema.parse(data);
}

/**
 * Valide des données de manière safe (retourne résultat)
 * @param schema - Schema Zod
 * @param data - Données à valider
 * @returns Résultat de validation avec success/error
 */
export function safeValidateData<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Formate les erreurs Zod en message lisible
 * @param error - Erreur Zod
 * @returns Message d'erreur formaté
 */
export function formatZodError(error: z.ZodError): string {
  return error.errors
    .map((err) => `${err.path.join('.')}: ${err.message}`)
    .join(', ');
}
