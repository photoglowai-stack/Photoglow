import { useEffect, useState, useCallback } from "react";
import { apiGet } from "../lib/apiClient";
import { demoPhotos, DemoPhoto } from "../data/demoPhotos";

interface LandingPhotoResponse {
  success: boolean;
  photos: DemoPhoto[];
}

export function useLandingPhotos() {
  const [photos, setPhotos] = useState<DemoPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPhotos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiGet<LandingPhotoResponse>("/api/public-photos");
      if (data?.success && data.photos?.length) {
        setPhotos(data.photos);
      } else {
        setPhotos(demoPhotos);
      }
    } catch (err: any) {
      console.error("[useLandingPhotos] Failed to fetch public photos", err);
      setError(err?.message || "Impossible de charger les photos publiques");
      setPhotos(demoPhotos);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  return { photos, isLoading, error, reload: loadPhotos };
}
