import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './useAuth';
import { projectId } from '../utils/supabase/info';

/**
 * Credits cache configuration
 */
const CACHE_DURATION_MS = 30000; // 30 seconds
const CACHE_KEY = 'photoglow_credits_cache';

interface CreditsCache {
  credits: number;
  timestamp: number;
  userId: string;
}

/**
 * Hook to manage user credits with intelligent caching
 * - Caches credits for 30s to reduce API calls
 * - Persists cache in localStorage
 * - Auto-refreshes on user change
 * - Manual refresh available via refetchCredits()
 */
export function useUserCredits() {
  const { session } = useAuth();
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for cache management
  const lastFetchTimeRef = useRef<number>(0);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  /**
   * Load credits from localStorage cache
   */
  const loadFromCache = useCallback((): number | null => {
    if (!session?.user?.id) return null;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const cacheData: CreditsCache = JSON.parse(cached);
      
      // Validate cache: same user & not expired
      const now = Date.now();
      const isValid = 
        cacheData.userId === session.user.id &&
        (now - cacheData.timestamp) < CACHE_DURATION_MS;

      if (isValid) {
        console.log('[Credits Cache] ✅ Hit:', cacheData.credits);
        return cacheData.credits;
      }

      console.log('[Credits Cache] ⚠️ Expired or invalid');
      return null;
    } catch (err) {
      console.error('[Credits Cache] ❌ Parse error:', err);
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  }, [session]);

  /**
   * Save credits to localStorage cache
   */
  const saveToCache = useCallback((creditsValue: number) => {
    if (!session?.user?.id) return;

    try {
      const cacheData: CreditsCache = {
        credits: creditsValue,
        timestamp: Date.now(),
        userId: session.user.id
      };
      
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      console.log('[Credits Cache] 💾 Saved:', creditsValue);
    } catch (err) {
      console.error('[Credits Cache] ❌ Save error:', err);
    }
  }, [session]);

  /**
   * Fetch credits from API
   */
  const fetchCredits = useCallback(async (force = false) => {
    if (!session?.access_token) {
      // User not logged in - set to 0 silently without errors
      setCredits(0);
      setError(null);
      setIsLoading(false);
      return;
    }

    // Check if we can use cache (unless forced)
    if (!force) {
      const now = Date.now();
      const timeSinceLastFetch = now - lastFetchTimeRef.current;
      
      if (timeSinceLastFetch < CACHE_DURATION_MS) {
        const cachedCredits = loadFromCache();
        if (cachedCredits !== null) {
          setCredits(cachedCredits);
          return;
        }
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/credits`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch credits');
      }

      const data = await response.json();
      
      if (data.success) {
        if (isMountedRef.current) {
          setCredits(data.credits);
          saveToCache(data.credits);
          lastFetchTimeRef.current = Date.now();
        }
      } else {
        throw new Error(data.error || 'Failed to fetch credits');
      }
    } catch (err: any) {
      // Only log errors if user is authenticated (not just "not logged in" errors)
      if (session?.access_token) {
        console.error('[Credits] ❌ Fetch error:', err);
      }
      
      if (isMountedRef.current) {
        setError(err.message || 'Failed to fetch credits');
        
        // Try to use stale cache on error
        const cachedCredits = loadFromCache();
        if (cachedCredits !== null) {
          console.log('[Credits] 🔄 Using stale cache on error');
          setCredits(cachedCredits);
        } else {
          setCredits(0);
        }
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [session, loadFromCache, saveToCache]);

  /**
   * Force refresh credits (bypasses cache)
   */
  const refetchCredits = useCallback(async () => {
    // Only refresh if user is logged in
    if (!session?.access_token) {
      console.log('[Credits] ⏭️ Skipping refresh - user not logged in');
      return;
    }
    console.log('[Credits] 🔄 Force refresh requested');
    await fetchCredits(true);
  }, [fetchCredits, session]);

  // Initial fetch and cache check
  useEffect(() => {
    isMountedRef.current = true;

    // If not logged in, set to 0 immediately
    if (!session?.access_token) {
      setCredits(0);
      setIsLoading(false);
      return;
    }

    // Try cache first for instant UI
    const cachedCredits = loadFromCache();
    if (cachedCredits !== null) {
      setCredits(cachedCredits);
    }

    // Then fetch fresh data
    fetchCredits();

    return () => {
      isMountedRef.current = false;
    };
  }, [session, fetchCredits, loadFromCache]);

  // Auto-refresh every 30s when component is visible
  useEffect(() => {
    if (!session?.access_token) return;

    // Set up auto-refresh interval
    refreshIntervalRef.current = setInterval(() => {
      console.log('[Credits] 🔄 Auto-refresh (30s interval)');
      fetchCredits();
    }, CACHE_DURATION_MS);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [session, fetchCredits]);

  // Clear cache on user change
  useEffect(() => {
    return () => {
      if (!session?.user?.id) {
        localStorage.removeItem(CACHE_KEY);
        console.log('[Credits Cache] 🗑️ Cleared on logout');
      }
    };
  }, [session]);

  return {
    credits,
    isLoading,
    error,
    refetchCredits
  };
}