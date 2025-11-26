/**
 * API Client for Vercel Backend
 * All server calls go through this file with proper authentication
 * NO Deno, NO process.env, NO server imports
 */

import { supabase } from './supabase/client';
import { VERCEL_API_BASE } from './config';

const API_BASE = VERCEL_API_BASE;

// ============================================
// AUTHENTICATION
// ============================================

/**
 * Get access token from Supabase auth session
 * Returns 'guest' token for demo mode
 */
export async function getAccessToken(): Promise<string> {
  // Check for Guest mode
  const guestUser = localStorage.getItem('photoglow_demo_user');
  if (guestUser) {
    return 'guest-mode-token';
  }
  
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    throw new Error('Please sign in to continue');
  }
  
  return session.access_token;
}

/**
 * Get current user ID (including Guest mode)
 */
export async function getUserId(): Promise<string> {
  // Check for Guest mode
  const guestUser = localStorage.getItem('photoglow_demo_user');
  if (guestUser) {
    try {
      const guest = JSON.parse(guestUser);
      return guest.id;
    } catch {
      return 'guest-user-id';
    }
  }
  
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session?.user) {
    throw new Error('Please sign in to continue');
  }
  
  return session.user.id;
}

// ============================================
// CREDITS API
// ============================================

/**
 * Fetch user credits balance
 */
export async function fetchCredits(): Promise<number> {
  // Guest mode: return demo credits
  const guestUser = localStorage.getItem('photoglow_demo_user');
  if (guestUser) {
    const storedCredits = localStorage.getItem('photoglow_guest_credits');
    return storedCredits ? parseInt(storedCredits) : 100;
  }
  
  // Check if user is authenticated before fetching
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    // User not authenticated - return 0 silently (not an error)
    return 0;
  }
  
  const userId = session.user.id;
  
  try {
    // Use Supabase Function (has proper env variables)
    const { projectId, publicAnonKey } = await import('./supabase/info');
    const url = `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/credits?user_id=${userId}`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Check if response is JSON (not HTML error page)
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('[fetchCredits] API returned non-JSON response (likely 500 error)');
      throw new Error('Credits API is unavailable (server error)');
    }
    
    const data = await res.json();
    
    if (!res.ok) {
      // Only log error if it's not an expected auth error
      if (res.status !== 401 && res.status !== 403) {
        console.error('[fetchCredits] Error:', data.error || 'Failed to fetch credits');
      }
      throw new Error(data.error || 'Failed to fetch credits');
    }
    
    return data.credits ?? 0;
  } catch (error: any) {
    // Silent fallback if user is not authenticated (expected behavior)
    if (error.message?.includes('sign in') || 
        error.message?.includes('unauthorized') || 
        error.message?.includes('Invalid or expired token')) {
      return 0;
    }
    
    // Only log unexpected errors
    if (!error.message?.includes('Credits API is unavailable')) {
      console.error('[fetchCredits] Unexpected error:', error.message);
    }
    
    // Fallback: return 0 instead of throwing to avoid breaking the UI
    return 0;
  }
}

/**
 * Debit credits from user account
 */
export async function debitCredits(amount: number): Promise<number> {
  // Guest mode: simulate credit debit
  const guestUser = localStorage.getItem('photoglow_demo_user');
  if (guestUser) {
    const storedCredits = localStorage.getItem('photoglow_guest_credits');
    const currentCredits = storedCredits ? parseInt(storedCredits) : 100;
    
    if (currentCredits < amount) {
      throw new Error('Not enough credits');
    }
    
    const newCredits = currentCredits - amount;
    localStorage.setItem('photoglow_guest_credits', newCredits.toString());
    return newCredits;
  }
  
  const userId = await getUserId();
  
  try {
    // Use Supabase RPC function debit_credits
    const { error } = await supabase.rpc('debit_credits', {
      p_user_id: userId,
      p_amount: amount
    });
    
    if (error) {
      if (error.message?.includes('Insufficient')) {
        throw new Error('Not enough credits');
      }
      throw new Error(error.message || 'Failed to debit credits');
    }
    
    // Fetch new balance
    const newBalance = await fetchCredits();
    
    console.log('[debitCredits] ✅ Credits debited:', amount, '→ Remaining:', newBalance);
    return newBalance;
  } catch (error: any) {
    console.error('[debitCredits] Error:', error.message);
    throw error;
  }
}

// ============================================
// STORAGE - SUPABASE
// ============================================

/**
 * Upload image to Supabase Storage and get public URL
 */
export async function uploadToSupabase(file: File): Promise<string> {
  const fileName = `${Date.now()}_${crypto.randomUUID()}.${file.name.split('.').pop()}`;
  const path = `uploads/${fileName}`;
  
  const { data, error } = await supabase.storage
    .from('photos')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
  
  const { data: publicData } = supabase.storage
    .from('photos')
    .getPublicUrl(path);
  
  return publicData.publicUrl;
}

// ============================================
// IMAGE GENERATION - TEXT2IMG
// ============================================

export interface GenerateTextToImageParams {
  prompt: string;
  category?: string;
  aspect_ratio?: string;
  negative_prompt?: string;
  seed?: number;
  num_outputs?: number;
  test_mode?: boolean;
}

export interface GenerateImageResponse {
  success: boolean;
  image_url?: string;
  items?: Array<{ image_url: string }>;
  error?: string;
}

/**
 * Generate image from text prompt (Flux Text2Img)
 */
export async function generateTextToImage(params: GenerateTextToImageParams): Promise<GenerateImageResponse> {
  // Guest mode: simulate generation
  const guestUser = localStorage.getItem('photoglow_demo_user');
  if (guestUser) {
    const { num_outputs = 1 } = params;
    
    // Debit guest credits
    await debitCredits(num_outputs);
    
    // Return mock data
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    return {
      success: true,
      image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=512',
      items: Array(num_outputs).fill(null).map((_, i) => ({
        image_url: `https://images.unsplash.com/photo-${1534528741775 + i}?w=512`
      }))
    };
  }
  
  const token = await getAccessToken();
  
  const {
    prompt,
    category = 'ai-headshots',
    aspect_ratio = '1:1',
    negative_prompt,
    seed,
    num_outputs = 1,
    test_mode = false
  } = params;
  
  // Debit credits before generation (unless test mode)
  if (!test_mode) {
    await debitCredits(num_outputs);
  }
  
  const res = await fetch(`${API_BASE}/api/generate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt,
      category,
      aspect_ratio,
      negative_prompt,
      seed,
      num_outputs,
      source: 'figma-text2img',
      test_mode
    })
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.error || 'Generation failed');
  }
  
  return data;
}

// ============================================
// IMAGE GENERATION - IMG2IMG
// ============================================

export interface GenerateImageToImageParams {
  file: File;
  prompt: string;
  category?: string;
  negative_prompt?: string;
  seed?: number;
  test_mode?: boolean;
}

/**
 * Generate image from input image (Flux Img2Img)
 */
export async function generateImageToImage(params: GenerateImageToImageParams): Promise<GenerateImageResponse> {
  // Guest mode: simulate generation
  const guestUser = localStorage.getItem('photoglow_demo_user');
  if (guestUser) {
    // Debit guest credits
    await debitCredits(1);
    
    // Return mock data
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    
    return {
      success: true,
      image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=512'
    };
  }
  
  const token = await getAccessToken();
  
  const {
    file,
    prompt,
    category = 'ai-headshots',
    negative_prompt,
    seed,
    test_mode = false
  } = params;
  
  // 1. Upload input image to Supabase
  const input_image = await uploadToSupabase(file);
  
  // 2. Debit credits (unless test mode)
  if (!test_mode) {
    await debitCredits(1);
  }
  
  // 3. Call generation API
  const res = await fetch(`${API_BASE}/api/generate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input_image,
      prompt,
      category,
      aspect_ratio: 'match_input_image',
      negative_prompt,
      seed,
      num_outputs: 1,
      source: 'figma-img2img',
      test_mode
    })
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.error || 'Generation failed');
  }
  
  return data;
}

// ============================================
// IMAGE GENERATION - GEN4
// ============================================

export interface GenerateGen4Params {
  prompt: string;
  aspect_ratio?: string;
  negative_prompt?: string;
  test_mode?: boolean;
}

/**
 * Generate image with Gen4 model
 */
export async function generateGen4Image(params: GenerateGen4Params): Promise<GenerateImageResponse> {
  // Guest mode: simulate generation
  const guestUser = localStorage.getItem('photoglow_demo_user');
  if (guestUser) {
    // Debit guest credits
    await debitCredits(1);
    
    // Return mock data
    await new Promise(resolve => setTimeout(resolve, 1800)); // Simulate API delay
    
    return {
      success: true,
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=512'
    };
  }
  
  const token = await getAccessToken();
  
  const {
    prompt,
    aspect_ratio = '16:9',
    negative_prompt,
    test_mode = false
  } = params;
  
  // Debit credits (unless test mode)
  if (!test_mode) {
    await debitCredits(1);
  }
  
  const res = await fetch(`${API_BASE}/api/generate-gen4-image`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt,
      aspect_ratio,
      negative_prompt,
      num_outputs: 1,
      source: 'figma-gen4',
      test_mode
    })
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.error || 'Generation failed');
  }
  
  return data;
}

// ============================================
// HELPERS
// ============================================

/**
 * Check if user is authenticated (including Guest mode)
 */
export async function isAuthenticated(): Promise<boolean> {
  // Check for Guest mode
  const guestUser = localStorage.getItem('photoglow_demo_user');
  if (guestUser) {
    return true;
  }
  
  // Check for real Supabase session
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

/**
 * Sign out user
 */
export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}