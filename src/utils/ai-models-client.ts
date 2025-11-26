import { projectId } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ab844084`;

export interface AIModelPhoto {
  id: string;
  url: string;
  filename: string;
  uploaded_at: string;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'training' | 'trained' | 'failed';
  user_id: string;
  created_at: string;
  updated_at: string;
  photos: AIModelPhoto[];
  pollinations_model_id: string | null;
  training_data: Record<string, any>;
  training_progress: number;
  training_started_at?: string;
  training_completed_at?: string;
  error_message?: string | null;
}

export interface CreateModelParams {
  name: string;
  description?: string;
  training_data?: Record<string, any>;
}

export interface GenerateImageParams {
  prompt: string;
  negative_prompt?: string;
  num_outputs?: number;
}

export interface TrainingStatusResponse {
  success: boolean;
  status: string;
  progress: number;
  model?: AIModel;
  message?: string;
}

export interface GenerateImageResponse {
  success: boolean;
  image_url: string;
  model_id: string;
  prompt: string;
  message: string;
}

/**
 * Client pour interagir avec l'API des modèles IA
 */
export class AIModelsClient {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  /**
   * Helper pour faire des requêtes à l'API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  }

  /**
   * Récupère tous les modèles de l'utilisateur
   */
  async getModels(): Promise<AIModel[]> {
    const { models } = await this.request<{ success: boolean; models: AIModel[] }>(
      '/models'
    );
    return models;
  }

  /**
   * Récupère un modèle spécifique par son ID
   */
  async getModel(modelId: string): Promise<AIModel> {
    const { model } = await this.request<{ success: boolean; model: AIModel }>(
      `/models/${modelId}`
    );
    return model;
  }

  /**
   * Crée un nouveau modèle IA
   */
  async createModel(params: CreateModelParams): Promise<AIModel> {
    const { model } = await this.request<{ 
      success: boolean; 
      model: AIModel;
      message: string;
    }>('/models', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return model;
  }

  /**
   * Upload une photo pour entraîner le modèle
   */
  async uploadPhoto(
    modelId: string, 
    file: File
  ): Promise<{
    photo: AIModelPhoto;
    total_photos: number;
    message: string;
  }> {
    const formData = new FormData();
    formData.append('file', file);

    const result = await this.request<{
      success: boolean;
      photo: AIModelPhoto;
      total_photos: number;
      message: string;
    }>(`/models/${modelId}/photos`, {
      method: 'POST',
      body: formData,
    });

    return {
      photo: result.photo,
      total_photos: result.total_photos,
      message: result.message,
    };
  }

  /**
   * Supprime une photo d'entraînement
   */
  async deletePhoto(modelId: string, photoId: string): Promise<{
    success: boolean;
    message: string;
    remaining_photos: number;
  }> {
    return await this.request(`/models/${modelId}/photos/${photoId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Lance l'entraînement du modèle
   */
  async trainModel(modelId: string): Promise<{
    model: AIModel;
    training_id: string;
    estimated_time: string;
    message: string;
  }> {
    const result = await this.request<{
      success: boolean;
      model: AIModel;
      training_id: string;
      estimated_time: string;
      message: string;
    }>(`/models/${modelId}/train`, {
      method: 'POST',
    });

    return {
      model: result.model,
      training_id: result.training_id,
      estimated_time: result.estimated_time,
      message: result.message,
    };
  }

  /**
   * Vérifie le statut de l'entraînement
   */
  async getTrainingStatus(modelId: string): Promise<TrainingStatusResponse> {
    return await this.request<TrainingStatusResponse>(
      `/models/${modelId}/status`
    );
  }

  /**
   * Génère une image avec le modèle entraîné
   */
  async generateImage(
    modelId: string,
    params: GenerateImageParams
  ): Promise<string> {
    const result = await this.request<GenerateImageResponse>(
      `/models/${modelId}/generate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      }
    );

    return result.image_url;
  }

  /**
   * Supprime un modèle et toutes ses photos
   */
  async deleteModel(modelId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    return await this.request(`/models/${modelId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Upload multiple photos en une fois
   */
  async uploadMultiplePhotos(
    modelId: string,
    files: File[],
    onProgress?: (current: number, total: number) => void
  ): Promise<{
    uploaded: AIModelPhoto[];
    total_photos: number;
    errors: string[];
  }> {
    const uploaded: AIModelPhoto[] = [];
    const errors: string[] = [];
    let totalPhotos = 0;

    for (let i = 0; i < files.length; i++) {
      try {
        const result = await this.uploadPhoto(modelId, files[i]);
        uploaded.push(result.photo);
        totalPhotos = result.total_photos;
        
        if (onProgress) {
          onProgress(i + 1, files.length);
        }
      } catch (error: any) {
        errors.push(`${files[i].name}: ${error.message}`);
      }
    }

    return {
      uploaded,
      total_photos: totalPhotos,
      errors,
    };
  }

  /**
   * Polling automatique du statut de training
   * @param modelId - ID du modèle
   * @param onProgress - Callback appelé à chaque update (status, progress)
   * @param interval - Intervalle de polling en ms (défaut: 5000)
   * @returns Promise qui se résout quand le training est terminé
   */
  async pollTrainingStatus(
    modelId: string,
    onProgress: (status: string, progress: number, model?: AIModel) => void,
    interval: number = 5000
  ): Promise<AIModel> {
    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const result = await this.getTrainingStatus(modelId);
          
          onProgress(result.status, result.progress, result.model);

          if (result.status === 'trained') {
            if (result.model) {
              resolve(result.model);
            } else {
              reject(new Error('Training completed but model data is missing'));
            }
          } else if (result.status === 'failed') {
            reject(new Error(result.model?.error_message || 'Training failed'));
          } else if (result.status === 'training') {
            setTimeout(poll, interval);
          } else {
            // Status inattendu
            setTimeout(poll, interval);
          }
        } catch (error) {
          reject(error);
        }
      };

      poll();
    });
  }
}

/**
 * Helper pour créer une instance du client avec le token de session
 */
export function createAIModelsClient(accessToken: string): AIModelsClient {
  return new AIModelsClient(accessToken);
}
