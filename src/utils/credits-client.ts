/**
 * Credits Client - Unified API for credits management
 * Uses Supabase Edge Functions server instead of Vercel API
 */

import { apiGet, apiPost } from './api-client';
import { API_ENDPOINTS } from './config';
import { supabase } from './supabase/client';

export interface CreditsResponse {
  credits: number;
  success?: boolean;
  error?: string;
  isAdmin?: boolean;
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
    const data = await apiGet<{ credits: number; isAdmin?: boolean }>(API_ENDPOINTS.credits);
    return {
      credits: data.credits ?? 0,
      success: true,
      isAdmin: data.isAdmin,
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
  amount: number = 1,
  target?: { userId?: string; email?: string },
): Promise<DebitCreditsResponse> {
  try {
    const data = await apiPost<DebitCreditsResponse>(API_ENDPOINTS.credits, {
      op: 'debit',
      amount,
      target_user_id: target?.userId,
      target_email: target?.email,
    });

    return {
      success: data.success ?? true,
      new_balance: (data as any).credits ?? data.new_balance,
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
  amount: number,
  target?: { userId?: string; email?: string },
): Promise<DebitCreditsResponse> {
  try {
    const data = await apiPost<DebitCreditsResponse>(API_ENDPOINTS.credits, {
      op: 'credit',
      amount,
      target_user_id: target?.userId,
      target_email: target?.email,
    });

    return {
      success: data.success ?? true,
      new_balance: (data as any).credits ?? data.new_balance
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