/**
 * Credits Client - Unified API for credits management
 * Uses Supabase Edge Functions server instead of Vercel API
 */

import { supabase } from './supabase/client';
import { projectId, publicAnonKey } from './supabase/info';

const SUPABASE_FUNCTION_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ab844084`;

export interface CreditsResponse {
  credits: number;
  success?: boolean;
  error?: string;
}

export interface DebitCreditsResponse {
  success: boolean;
  new_balance?: number;
  error?: string;
}

/**
 * Get user credits balance
 */
export async function getCredits(userId: string): Promise<CreditsResponse> {
  try {
    const response = await fetch(
      `${SUPABASE_FUNCTION_URL}/credits?user_id=${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      
      // Only log non-auth errors
      if (response.status !== 401 && response.status !== 403) {
        console.error('[getCredits] Error:', errorData.error || `HTTP ${response.status}`);
      }
      
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      credits: data.credits ?? 0,
      success: true
    };
  } catch (error: any) {
    // Silently handle auth errors (expected when not logged in)
    if (!error.message?.includes('Invalid or expired token') && 
        !error.message?.includes('401') && 
        !error.message?.includes('403')) {
      console.error('[getCredits] Unexpected error:', error.message);
    }
    
    return {
      credits: 0,
      success: false,
      error: error.message
    };
  }
}

/**
 * Debit credits from user account
 */
export async function debitCredits(
  userId: string, 
  amount: number = 1,
  reason: string = 'generation'
): Promise<DebitCreditsResponse> {
  try {
    const response = await fetch(
      `${SUPABASE_FUNCTION_URL}/credits/debit`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          amount,
          reason
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return {
      success: data.success ?? true,
      new_balance: data.new_balance
    };
  } catch (error: any) {
    console.error('[debitCredits] Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Add credits to user account
 */
export async function addCredits(
  userId: string,
  amount: number,
  reason: string = 'purchase'
): Promise<DebitCreditsResponse> {
  try {
    const response = await fetch(
      `${SUPABASE_FUNCTION_URL}/credits/add`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          amount,
          reason
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return {
      success: data.success ?? true,
      new_balance: data.new_balance
    };
  } catch (error: any) {
    console.error('[addCredits] Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Hook to get user ID from current session
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id ?? null;
  } catch (error) {
    console.error('[getCurrentUserId] Error:', error);
    return null;
  }
}

/**
 * Get credits for current user
 */
export async function getCurrentUserCredits(): Promise<CreditsResponse> {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    return {
      credits: 0,
      success: false,
      error: 'Not authenticated'
    };
  }

  return getCredits(userId);
}