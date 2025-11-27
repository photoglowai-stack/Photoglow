import { useCallback, useEffect, useState } from "react";
import { apiGet } from "../lib/apiClient";
import { supabase } from "../utils/supabase/client";
import type { GeneratedPhoto } from "../components/pages/ProfilePage/ProfilePage.types";

interface UserPhotoResponse {
  success: boolean;
  photos: GeneratedPhoto[];
}

export function useUserPhotos() {
  const [photos, setPhotos] = useState<GeneratedPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPhotos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const hasSession = !!sessionData.session?.access_token;

      if (!hasSession) {
        setError("Veuillez vous connecter pour voir vos photos");
        setPhotos([]);
        return;
      }

      const data = await apiGet<UserPhotoResponse>("/api/user-photos", { auth: true });
      if (data?.success) {
        setPhotos(data.photos || []);
      } else {
        setPhotos([]);
      }
    } catch (err: any) {
      console.error("[useUserPhotos] Failed to load user photos", err);
      setError(err?.message || "Impossible de charger vos photos");
      setPhotos([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  return { photos, isLoading, error, reload: loadPhotos };
}
