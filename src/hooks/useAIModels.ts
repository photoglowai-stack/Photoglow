/**
 * @file useAIModels - Hook de gestion des modèles IA personnalisés
 * @description Hook complet pour gérer le cycle de vie des modèles IA
 * 
 * Fonctionnalités :
 * - CRUD complet sur les modèles
 * - Upload de photos d'entraînement (single/multiple)
 * - Entraînement avec polling automatique
 * - Génération d'images avec modèle personnalisé
 * - Gestion d'état centralisée (loading, error)
 * - Rafraîchissement automatique après actions
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { AIModelsClient, AIModel, CreateModelParams, GenerateImageParams } from '../utils/ai-models-client';
import { useAuth } from './useAuth';

/**
 * Valeur de retour du hook useAIModels
 */
export interface UseAIModelsReturn {
  // État
  models: AIModel[];
  loading: boolean;
  error: string | null;
  
  // Actions
  refreshModels: () => Promise<void>;
  createModel: (params: CreateModelParams) => Promise<AIModel>;
  deleteModel: (modelId: string) => Promise<void>;
  uploadPhoto: (modelId: string, file: File) => Promise<void>;
  uploadMultiplePhotos: (
    modelId: string, 
    files: File[], 
    onProgress?: (current: number, total: number) => void
  ) => Promise<{ uploaded: number; errors: string[] }>;
  deletePhoto: (modelId: string, photoId: string) => Promise<void>;
  trainModel: (
    modelId: string,
    onProgress?: (status: string, progress: number) => void
  ) => Promise<AIModel>;
  generateImage: (modelId: string, params: GenerateImageParams) => Promise<string>;
  
  // Client direct (pour usage avancé)
  client: AIModelsClient | null;
}

/**
 * Hook de gestion des modèles IA personnalisés
 * 
 * Fournit une interface complète pour créer, entraîner et utiliser
 * des modèles IA personnalisés basés sur les photos de l'utilisateur.
 * 
 * Workflow typique :
 * 1. createModel() - Créer un nouveau modèle
 * 2. uploadMultiplePhotos() - Upload 10-20 photos
 * 3. trainModel() - Lancer l'entraînement (avec polling)
 * 4. generateImage() - Générer des images
 * 
 * Fonctionnalités :
 * - Gestion automatique de l'état (loading, error, models)
 * - Rafraîchissement automatique après chaque action
 * - Polling automatique pendant l'entraînement
 * - Progress tracking pour uploads multiples
 * - Client direct exposé pour usage avancé
 * 
 * @returns État et actions pour les modèles IA
 * 
 * @example
 * ```tsx
 * function CreateModelFlow() {
 *   const { models, loading, createModel, uploadMultiplePhotos, trainModel } = useAIModels();
 *   const [modelId, setModelId] = useState('');
 *   
 *   // 1. Créer le modèle
 *   const handleCreate = async () => {
 *     const model = await createModel({
 *       name: 'Mon Modèle',
 *       gender: 'male'
 *     });
 *     setModelId(model.id);
 *   };
 *   
 *   // 2. Upload photos
 *   const handleUpload = async (files: File[]) => {
 *     const { uploaded, errors } = await uploadMultiplePhotos(
 *       modelId,
 *       files,
 *       (current, total) => console.log(`${current}/${total}`)
 *     );
 *   };
 *   
 *   // 3. Entraîner
 *   const handleTrain = async () => {
 *     await trainModel(
 *       modelId,
 *       (status, progress) => console.log(status, progress)
 *     );
 *   };
 * }
 * 
 * // Usage pour génération
 * function GenerateWithModel() {
 *   const { models, generateImage } = useAIModels();
 *   
 *   const handleGenerate = async (modelId: string) => {
 *     const imageUrl = await generateImage(modelId, {
 *       prompt: 'professional headshot',
 *       num_outputs: 1
 *     });
 *   };
 * }
 * ```
 */
export function useAIModels(): UseAIModelsReturn {
  const { session } = useAuth();
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Créer le client si on a un token - utiliser useMemo pour stabilité
  const client = useMemo(() => {
    if (session?.access_token) {
      return new AIModelsClient(session.access_token);
    }
    return null;
  }, [session?.access_token]);

  /**
   * Rafraîchir la liste des modèles
   */
  const refreshModels = useCallback(async () => {
    if (!client) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await client.getModels();
      setModels(data);
    } catch (err: any) {
      console.error('[useAIModels] Error fetching models:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [client]); // client est maintenant stable via useMemo

  /**
   * Créer un nouveau modèle
   */
  const createModel = useCallback(async (params: CreateModelParams): Promise<AIModel> => {
    if (!client) throw new Error('Not authenticated');
    
    const model = await client.createModel(params);
    await refreshModels(); // Rafraîchir la liste
    return model;
  }, [client, refreshModels]);

  /**
   * Supprimer un modèle
   */
  const deleteModel = useCallback(async (modelId: string): Promise<void> => {
    if (!client) throw new Error('Not authenticated');
    
    await client.deleteModel(modelId);
    await refreshModels(); // Rafraîchir la liste
  }, [client, refreshModels]);

  /**
   * Upload une photo
   */
  const uploadPhoto = useCallback(async (modelId: string, file: File): Promise<void> => {
    if (!client) throw new Error('Not authenticated');
    
    await client.uploadPhoto(modelId, file);
    await refreshModels(); // Rafraîchir pour avoir les photos à jour
  }, [client, refreshModels]);

  /**
   * Upload plusieurs photos avec progress tracking
   */
  const uploadMultiplePhotos = useCallback(async (
    modelId: string,
    files: File[],
    onProgress?: (current: number, total: number) => void
  ): Promise<{ uploaded: number; errors: string[] }> => {
    if (!client) throw new Error('Not authenticated');
    
    const result = await client.uploadMultiplePhotos(modelId, files, onProgress);
    await refreshModels(); // Rafraîchir pour avoir les photos à jour
    
    return {
      uploaded: result.uploaded.length,
      errors: result.errors,
    };
  }, [client, refreshModels]);

  /**
   * Supprimer une photo
   */
  const deletePhoto = useCallback(async (modelId: string, photoId: string): Promise<void> => {
    if (!client) throw new Error('Not authenticated');
    
    await client.deletePhoto(modelId, photoId);
    await refreshModels(); // Rafraîchir
  }, [client, refreshModels]);

  /**
   * Lancer l'entraînement avec polling automatique
   */
  const trainModel = useCallback(async (
    modelId: string,
    onProgress?: (status: string, progress: number) => void
  ): Promise<AIModel> => {
    if (!client) throw new Error('Not authenticated');
    
    // Démarrer le training
    await client.trainModel(modelId);
    
    // Polling automatique du statut
    const trainedModel = await client.pollTrainingStatus(
      modelId,
      (status, progress, model) => {
        if (onProgress) {
          onProgress(status, progress);
        }
        
        // Mettre à jour le modèle dans la liste locale
        setModels(prevModels => 
          prevModels.map(m => 
            m.id === modelId 
              ? { ...m, status, training_progress: progress, ...(model || {}) }
              : m
          )
        );
      }
    );
    
    await refreshModels(); // Rafraîchir final
    return trainedModel;
  }, [client, refreshModels]);

  /**
   * Générer une image
   */
  const generateImage = useCallback(async (
    modelId: string,
    params: GenerateImageParams
  ): Promise<string> => {
    if (!client) throw new Error('Not authenticated');
    
    return await client.generateImage(modelId, params);
  }, [client]);

  // Charger les modèles au montage et quand le client change
  useEffect(() => {
    refreshModels();
  }, [refreshModels]);

  return {
    models,
    loading,
    error,
    refreshModels,
    createModel,
    deleteModel,
    uploadPhoto,
    uploadMultiplePhotos,
    deletePhoto,
    trainModel,
    generateImage,
    client,
  };
}

/**
 * Hook pour gérer un seul modèle spécifique
 */
export function useAIModel(modelId: string | null) {
  const { session } = useAuth();
  const [model, setModel] = useState<AIModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const client = session?.access_token
    ? new AIModelsClient(session.access_token)
    : null;

  const refreshModel = useCallback(async () => {
    if (!client || !modelId) {
      setModel(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await client.getModel(modelId);
      setModel(data);
    } catch (err: any) {
      console.error('[useAIModel] Error fetching model:', err);
      setError(err.message);
      setModel(null);
    } finally {
      setLoading(false);
    }
  }, [client, modelId]);

  useEffect(() => {
    refreshModel();
  }, [refreshModel]);

  return {
    model,
    loading,
    error,
    refreshModel,
  };
}
