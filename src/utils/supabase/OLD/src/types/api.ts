/**
 * Types API centralisés pour PhotoGlow
 * Re-export des types depuis lib/validators
 * @module types/api
 */

export type {
  // Params
  PreviewParams,
  CreateJobInput,
  PaginationParams,
  
  // Jobs
  JobStatus,
  JobResponse,
  
  // Photos
  Photo,
  PhotoList,
  
  // Custom Models
  CreateCustomModelInput,
  CustomModel,
  
  // User & Credits
  User,
  DebitCreditsInput,
  CreditsBalance,
  
  // Admin
  TriggerDeployInput,
  DeployResult,
  RevalidatePathInput,
  
  // Errors
  APIError,
} from '../lib/validators';

// Re-export des erreurs personnalisées
export { APIError, TimeoutError, ValidationError, NetworkError } from '../lib/api';
export { AdminError } from '../lib/admin';
