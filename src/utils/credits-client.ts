/**
 * Credits Client - Unified API for credits management
 * Uses Supabase Edge Functions server instead of Vercel API
 */

import { apiRequest } from './api-client';
import { API_ENDPOINTS } from './config';
import { supabase } from './supabase/client';

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
export async function getCredits(): Promise<CreditsResponse> {
  try {
    const data = await apiRequest<{ credits: number }>(API_ENDPOINTS.credits);
    return {
      credits: data.credits ?? 0,
      success: true
    };
  } catch (error: any) {
    console.error('[getCredits] Unexpected error:', error.message);
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
    const data = await apiRequest<DebitCreditsResponse>(API_ENDPOINTS.credits, {
      method: 'POST',
      body: JSON.stringify({
        op: 'debit',
        user_id: userId,
        amount,
        reason
      })
    });

    return {
      success: data.success ?? true,
      new_balance: data.new_balance ?? data.credits
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
    const data = await apiRequest<DebitCreditsResponse>(API_ENDPOINTS.credits, {
      method: 'POST',
      body: JSON.stringify({
        op: 'credit',
        user_id: userId,
        amount,
        reason
      })
    });

    return {
      success: data.success ?? true,
      new_balance: data.new_balance ?? data.credits
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
  return getCredits();
}