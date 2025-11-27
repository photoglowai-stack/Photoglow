/**
 * API Client for Vercel Backend
 * All server calls go through this file with proper authentication
 * NO Deno, NO process.env, NO server imports
 */

import { supabase } from './supabase/client';
import { API_ENDPOINTS, VERCEL_API_BASE } from './config';

const API_BASE = VERCEL_API_BASE || '';

type ApiRequestInit = RequestInit & { auth?: boolean };

async function getAuthHeader(authEnabled: boolean) {
  if (!authEnabled) return {};

  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) {
    throw new Error('Authentication required. Please sign in to continue.');
  }

  return { Authorization: `Bearer ${token}` };
}

export async function apiRequest<T>(path: string, init: ApiRequestInit = {}): Promise<T> {
  const { auth = true, headers, body, ...rest } = init;
  const authHeader = await getAuthHeader(auth);
  const mergedHeaders = new Headers(headers || {});

  // Only set content-type automatically when sending JSON bodies
  if (body && !(body instanceof FormData)) {
    mergedHeaders.set('Content-Type', 'application/json');
  }

  Object.entries(authHeader).forEach(([key, value]) => {
    mergedHeaders.set(key, value);
  });

  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    body,
    headers: mergedHeaders
  });

  const text = await response.text();
  let data: any = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (error) {
      console.error('[apiRequest] Failed to parse JSON response', error);
    }
  }

  if (!response.ok) {
    const errorMessage =
      data?.error || data?.message || `Request failed with status ${response.status}`;

    const error: any = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  return data as T;
}

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
  try {
    const data = await apiRequest<{ credits: number }>(API_ENDPOINTS.credits);
    return data.credits ?? 0;
  } catch (error: any) {
    console.error('[fetchCredits] Unexpected error:', error.message || error);
    throw error;
  }
}

/**
 * Debit credits from user account
 */
export async function debitCredits(amount: number): Promise<number> {
  try {
    const data = await apiRequest<{ credits: number }>(API_ENDPOINTS.credits, {
      method: 'POST',
      body: JSON.stringify({ op: 'debit', amount })
    });

    const newBalance = data.credits ?? 0;
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