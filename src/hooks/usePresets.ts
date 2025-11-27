import { useEffect, useState, useCallback } from 'react';
import { apiGet, ApiError } from '../utils/api-client';
import { API_ENDPOINTS } from '../utils/config';

interface PresetResponse {
  success: boolean;
  categories: Array<{ id: string; name?: string; title?: string; description?: string; image_url?: string }>;
  presets: Array<{ id: string; name: string; category_id?: string; prompt?: string; description?: string }>;
}

export function usePresets() {
  const [categories, setCategories] = useState<PresetResponse['categories']>([]);
  const [presets, setPresets] = useState<PresetResponse['presets']>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPresets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGet<PresetResponse>(API_ENDPOINTS.presets, { auth: false });
      if (data?.success) {
        setCategories(data.categories || []);
        setPresets(data.presets || []);
      } else {
        setError('Impossible de charger les presets.');
      }
    } catch (err) {
      const apiErr = err as ApiError;
      const message = apiErr?.message || 'Impossible de charger les presets.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPresets();
  }, [loadPresets]);

  return { categories, presets, loading, error, refetch: loadPresets };
}
