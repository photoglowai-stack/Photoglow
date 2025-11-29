/**
 * API Route: POST /api/v1/ideas/generate
 * 
 * Génère une image AI via Pollinations et la stocke dans Supabase.
 * Utilisé par l'admin pour générer massivement des images de catégories.
 * 
 * Features:
 * - Idempotency (storage check + header)
 * - Retry automatique (2 tentatives)
 * - Stockage organisé (outputs/admin-generated/ideas/{slug}/{date}/)
 * - Trace DB (ideas_examples table)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Configure Vercel timeout for long-running FLUX generations (90-120s)
export const maxDuration = 120; // seconds
export const dynamic = 'force-dynamic';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BUCKET = 'ai_gallery';
const PROVIDER = 'pollinations';
const MODEL = 'flux';

/**
 * Helper: Fetch with timeout
 */
async function fetchWithTimeout(url: string, timeout = 110000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Helper: Generate Pollinations URL
 */
function generatePollinationsUrl(prompt: string, width: number, height: number, seed?: number): string {
  const enhancedPrompt = `${prompt}, photorealistic, high quality, detailed, professional photography`;
  const encodedPrompt = encodeURIComponent(enhancedPrompt);
  
  const params = new URLSearchParams({
    width: width.toString(),
    height: height.toString(),
    model: MODEL,
    seed: seed?.toString() || Math.floor(Math.random() * 1000000).toString(),
    nologo: 'true',
    enhance: 'true'
  });

  return `https://image.pollinations.ai/prompt/${encodedPrompt}?${params.toString()}`;
}

/**
 * POST /api/v1/ideas/generate
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const { slug, prompt, width = 1024, height = 1280, model = 'flux', persist = true, collection = 'admin-generated' } = body;
    
    if (!slug || !prompt) {
      return NextResponse.json({
        success: false,
        error: 'missing_slug_or_prompt'
      }, { status: 400 });
    }

    // Idempotency key
    const idempotencyKey = request.headers.get('idempotency-key');
    console.log(`[Generate] Slug: ${slug}, Idempotency: ${idempotencyKey}`);

    // Destination folder
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const folder = `outputs/${collection}/ideas/${slug}/${date}`;
    
    // Check if image already exists (idempotency via storage)
    if (persist) {
      try {
        const { data: files } = await supabase.storage
          .from(BUCKET)
          .list(folder);
        
        if (files && files.length > 0) {
          // Image already exists
          const existingFile = files[0];
          const { data: urlData } = supabase.storage
            .from(BUCKET)
            .getPublicUrl(`${folder}/${existingFile.name}`);
          
          console.log(`[Generate] ✅ Image already exists (idempotent): ${urlData.publicUrl}`);
          
          return NextResponse.json({
            success: true,
            image_url: urlData.publicUrl,
            url: urlData.publicUrl,
            idempotent: true
          });
        }
      } catch (error) {
        console.warn('[Generate] Storage check failed:', error);
        // Continue avec la génération
      }
    }

    // Generate image with retry
    let imageBytes: ArrayBuffer | null = null;
    let contentType = 'image/jpeg';
    
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`[Generate] 🎨 Attempt ${attempt}/2: Calling Pollinations FLUX (may take 90-120s)...`);
        
        const pollinationsUrl = generatePollinationsUrl(prompt, width, height);
        const response = await fetchWithTimeout(pollinationsUrl); // Use default 110s timeout
        
        if (response.ok) {
          imageBytes = await response.arrayBuffer();
          contentType = response.headers.get('content-type') || 'image/jpeg';
          console.log(`[Generate] ✅ Image generated (${imageBytes.byteLength} bytes)`);
          break;
        } else {
          console.error(`[Generate] ❌ Pollinations error: ${response.status}`);
        }
      } catch (error: any) {
        console.error(`[Generate] ❌ Attempt ${attempt} failed:`, error.message);
        if (attempt < 2) {
          await new Promise(resolve => setTimeout(resolve, 400 * attempt));
        }
      }
    }

    if (!imageBytes) {
      return NextResponse.json({
        success: false,
        error: 'generation_failed_after_retries'
      }, { status: 500 });
    }

    // Upload to Supabase Storage
    const ext = contentType === 'image/png' ? 'png' : 'jpg';
    const hash = Math.random().toString(36).substring(2, 15);
    const filename = `${slug}-${hash}.${ext}`;
    const keyPath = `${folder}/${filename}`;
    
    console.log(`[Generate] 📤 Uploading to: ${BUCKET}/${keyPath}`);
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(keyPath, imageBytes, {
        contentType,
        upsert: true,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('[Generate] ❌ Upload error:', uploadError);
      return NextResponse.json({
        success: false,
        error: 'upload_failed',
        details: uploadError.message
      }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(keyPath);
    
    const imageUrl = urlData.publicUrl;
    console.log(`[Generate] ✅ Image uploaded: ${imageUrl}`);

    // Save to ideas_examples table (optional metadata)
    try {
      await supabase.from('ideas_examples').insert({
        slug,
        image_url: imageUrl,
        provider: PROVIDER,
        bucket: BUCKET,
        key_path: keyPath,
        category_id: body.category_id || null,
        prompt_index: body.prompt_index || null,
        prompt_title: body.prompt_title || null,
        prompt_text: body.prompt_text || prompt,
        aspect_ratio: body.aspect_ratio || '4:5',
        style: body.style || 'default',
        width,
        height,
        model: MODEL
      });
      console.log('[Generate] ✅ Metadata saved to ideas_examples');
    } catch (dbError) {
      console.warn('[Generate] ⚠️  Failed to save to ideas_examples:', dbError);
      // Non-blocking error
    }

    // Success response
    return NextResponse.json({
      success: true,
      image_url: imageUrl,
      url: imageUrl,
      slug,
      bucket: BUCKET,
      key_path: keyPath
    });

  } catch (error: any) {
    console.error('[Generate] ❌ Unexpected error:', error);
    return NextResponse.json({
      success: false,
      error: 'internal_server_error',
      message: error.message
    }, { status: 500 });
  }
}