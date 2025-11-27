import { useEffect, useState, useCallback } from "react";
import { demoPhotos, DemoPhoto } from "../data/demoPhotos";

export function useLandingPhotos() {
  const [photos, setPhotos] = useState<DemoPhoto[]>(demoPhotos);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPhotos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setPhotos(demoPhotos);
    } catch (err: any) {
      console.error("[useLandingPhotos] Failed to load demo photos", err);
      setError(err?.message || "Impossible de charger les photos publiques");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  return { photos, isLoading, error, reload: loadPhotos };
}
