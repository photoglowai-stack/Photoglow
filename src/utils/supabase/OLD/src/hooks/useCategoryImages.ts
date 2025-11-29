/**
 * @file useCategoryImages - Hooks pour les images de catégories
 * @description Suite de hooks pour récupérer les images générées par catégorie depuis Supabase
 * 
 * Contient 4 hooks :
 * - useCategoryImages() - Toutes les images d'une catégorie
 * - useCategoryImagesStats() - Statistiques globales
 * - useCategoryImage() - Une image spécifique par index
 * - useCategoryImagesSample() - Sample limité pour previews
 * 
 * Les images sont stockées dans la table `ideas_examples` et récupérées
 * depuis le bucket Supabase `ai_gallery`.
 * 
 * @example
 * ```tsx
 * // Toutes les images
 * const { images, loading, error, refresh } = useCategoryImages('ai-headshots');
 * 
 * // Stats globales
 * const { stats, totalImages, totalCategories } = useCategoryImagesStats();
 * 
 * // Image spécifique
 * const { image } = useCategoryImage('ai-headshots', 0);
 * 
 * // Sample pour preview
 * const { images } = useCategoryImagesSample('ai-headshots', 6);
 * ```
 */

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export interface CategoryImage {
  id: string;
  slug: string;
  category_id: string;
  prompt_index: number;
  prompt_title: string;
  prompt_text: string;
  image_url: string;
  key_path?: string;
  aspect_ratio: string;
  provider: string;
  bucket: string;
  created_at: string;
}

export interface UseCategoryImagesReturn {
  images: CategoryImage[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  isEmpty: boolean;
  count: number;
}

export function useCategoryImages(categoryId: string): UseCategoryImagesReturn {
  const [images, setImages] = useState<CategoryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    if (!categoryId) {
      setError('Category ID is required');
      setLoading(false);
      return;
    }

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setError('Supabase configuration missing');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

      const { data, error: fetchError } = await supabase
        .from('ideas_examples')
        .select('*')
        .eq('category_id', categoryId)
        .not('category_id', 'is', null)
        .order('prompt_index', { ascending: true });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      setImages(data || []);
    } catch (err: any) {
      console.error(`Failed to fetch images for category ${categoryId}:`, err);
      setError(err?.message || 'Failed to fetch images');
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return {
    images,
    loading,
    error,
    refresh: fetchImages,
    isEmpty: images.length === 0,
    count: images.length
  };
}

/**
 * Hook pour récupérer les statistiques de toutes les catégories
 * 
 * Usage:
 *   const { stats, loading } = useCategoryImagesStats();
 */
export interface CategoryImageStats {
  category_id: string;
  image_count: number;
}

export interface UseCategoryImagesStatsReturn {
  stats: CategoryImageStats[];
  loading: boolean;
  error: string | null;
  totalImages: number;
  totalCategories: number;
}

export function useCategoryImagesStats(): UseCategoryImagesStatsReturn {
  const [stats, setStats] = useState<CategoryImageStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        setError('Supabase configuration missing');
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        // Utiliser la fonction SQL helper
        const { data, error: fetchError } = await supabase
          .rpc('count_category_images');

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        setStats(data || []);
      } catch (err: any) {
        console.error('Failed to fetch category images stats:', err);
        setError(err?.message || 'Failed to fetch stats');
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const totalImages = stats.reduce((sum, s) => sum + Number(s.image_count), 0);
  const totalCategories = stats.length;

  return {
    stats,
    loading,
    error,
    totalImages,
    totalCategories
  };
}

/**
 * Hook pour récupérer une image spécifique par index
 * 
 * Usage:
 *   const { image, loading } = useCategoryImage('ai-headshots', 0);
 */
export function useCategoryImage(categoryId: string, promptIndex: number) {
  const [image, setImage] = useState<CategoryImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!categoryId || promptIndex < 0) {
        setError('Invalid category ID or prompt index');
        setLoading(false);
        return;
      }

      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        setError('Supabase configuration missing');
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        const { data, error: fetchError } = await supabase
          .from('ideas_examples')
          .select('*')
          .eq('category_id', categoryId)
          .eq('prompt_index', promptIndex)
          .not('category_id', 'is', null)
          .single();

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        setImage(data);
      } catch (err: any) {
        console.error(`Failed to fetch image ${categoryId}[${promptIndex}]:`, err);
        setError(err?.message || 'Failed to fetch image');
        setImage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [categoryId, promptIndex]);

  return { image, loading, error };
}

/**
 * Hook pour récupérer un sample d'images (pour préviews)
 * 
 * Usage:
 *   const { images, loading } = useCategoryImagesSample('ai-headshots', 6);
 */
export function useCategoryImagesSample(categoryId: string, limit: number = 6) {
  const [images, setImages] = useState<CategoryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSample = async () => {
      if (!categoryId || limit <= 0) {
        setError('Invalid category ID or limit');
        setLoading(false);
        return;
      }

      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        setError('Supabase configuration missing');
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        const { data, error: fetchError } = await supabase
          .from('ideas_examples')
          .select('*')
          .eq('category_id', categoryId)
          .not('category_id', 'is', null)
          .order('prompt_index', { ascending: true })
          .limit(limit);

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        setImages(data || []);
      } catch (err: any) {
        console.error(`Failed to fetch sample for ${categoryId}:`, err);
        setError(err?.message || 'Failed to fetch sample');
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSample();
  }, [categoryId, limit]);

  return { images, loading, error };
}
