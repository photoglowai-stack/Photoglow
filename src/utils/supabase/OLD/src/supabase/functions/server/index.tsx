import { Hono } from "npm:hono@4";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from './kv_store.tsx';
import { getCategoryData, getAllCategoryIds } from './category-prompts-data.ts';

// Configuration centralisée des URLs API
const VERCEL_API_BASE = 'https://image-generator-api-chi.vercel.app';

// ============================================
// CREDIT COSTS CONFIGURATION
// ============================================
const CREDIT_COSTS = {
  // FLUX models (text2img and img2img)
  flux: 1,
  // Gen-4 models (img2img only - more expensive)
  gen4: 2
};

/**
 * Get credit cost based on model type
 * @param model - Model identifier ('flux' or 'gen4')
 * @returns Number of credits to debit
 */
function getCreditCost(model: string): number {
  return CREDIT_COSTS[model as keyof typeof CREDIT_COSTS] || 1;
}

// ============================================
// SUPABASE QUERY RETRY HELPER
// ============================================
async function queryWithRetry<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  maxRetries = 3,
  retryDelay = 1000
): Promise<{ data: T | null; error: any }> {
  let lastError: any = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await queryFn();
      
      // If successful, return immediately
      if (!result.error) {
        return result;
      }
      
      // If it's a connection error, retry
      if (result.error.message?.includes('connection reset') || 
          result.error.message?.includes('connection error') ||
          result.error.message?.includes('timeout')) {
        lastError = result.error;
        console.warn(`[Supabase] ⚠️ Connection error on attempt ${attempt}/${maxRetries}`);
        
        if (attempt < maxRetries) {
          const delay = retryDelay * attempt; // 1s, 2s, 3s
          console.log(`[Supabase] ⏳ Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      
      // For other errors, return immediately (don't retry)
      return result;
      
    } catch (error: any) {
      lastError = error;
      console.warn(`[Supabase] ⚠️ Query exception on attempt ${attempt}/${maxRetries}:`, error.message);
      
      if (attempt < maxRetries) {
        const delay = retryDelay * attempt;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  // All retries exhausted
  return { data: null, error: lastError };
}

// ============================================
// POLLINATIONS RETRY HELPER
// ============================================
async function fetchPollinationsWithRetry(url: string, maxRetries = 5, retryDelay = 4000): Promise<Response> {
  let lastError: string = '';
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Pollinations] 🔄 Attempt ${attempt}/${maxRetries}...`);
      
      const response = await fetch(url, {
        signal: AbortSignal.timeout(60000) // 60s timeout (increased from 30s)
      });
      
      if (response.ok) {
        console.log(`[Pollinations] ✅ Success on attempt ${attempt}`);
        return response;
      }
      
      lastError = `HTTP ${response.status}`;
      console.warn(`[Pollinations] ⚠️ Attempt ${attempt} failed: ${lastError}`);
      
      // Don't retry on 4xx errors (client errors like bad request)
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        throw new Error(`Client error: ${response.status}`);
      }
      
      // Wait before retry (except on last attempt)
      if (attempt < maxRetries) {
        const delay = retryDelay * attempt; // Exponential backoff: 4s, 8s, 12s, 16s, 20s
        console.log(`[Pollinations] ⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
    } catch (error: any) {
      lastError = error.message;
      console.warn(`[Pollinations] ⚠️ Attempt ${attempt} error:`, lastError);
      
      if (attempt === maxRetries) {
        throw new Error(`Pollinations API failed after ${maxRetries} attempts: ${lastError}`);
      }
      
      // Wait before retry with exponential backoff
      const delay = retryDelay * attempt;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error(`Pollinations API error after ${maxRetries} attempts: ${lastError}`);
}

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Verify Supabase connection and table access on startup
const verifyConnection = async () => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Check buckets exist, create if not
    const { data: buckets } = await supabase.storage.listBuckets();
    
    // Check 'photos' bucket
    const photosBucket = buckets?.find(b => b.name === 'photos');
    if (photosBucket) {
      console.log(`✅ Public bucket 'photos' found (Public: ${photosBucket.public})`);
    } else {
      console.log(`⚠️ Bucket 'photos' not found. Creating it now...`);
      const { error: createError } = await supabase.storage.createBucket('photos', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
      });
      if (createError) {
        console.error(`❌ Failed to create bucket 'photos':`, createError.message);
      } else {
        console.log(`✅ Bucket 'photos' created successfully!`);
      }
    }
    
    // Check 'ai_gallery' bucket
    const aiGalleryBucket = buckets?.find(b => b.name === 'ai_gallery');
    if (aiGalleryBucket) {
      console.log(`✅ Public bucket 'ai_gallery' found (Public: ${aiGalleryBucket.public})`);
    } else {
      console.log(`⚠️ Bucket 'ai_gallery' not found. Creating it now...`);
      const { error: createError } = await supabase.storage.createBucket('ai_gallery', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
      });
      if (createError) {
        console.error(`❌ Failed to create bucket 'ai_gallery':`, createError.message);
      } else {
        console.log(`✅ Bucket 'ai_gallery' created successfully!`);
      }
    }

    // Check photos_meta table exists and is accessible
    const { count, error } = await supabase
      .from('photos_meta')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error(`❌ Cannot access 'photos_meta' table:`, error.message);
    } else {
      console.log(`✅ Table 'photos_meta' accessible (${count || 0} records)`);
    }
  } catch (error) {
    console.error('⚠️ Connection verification failed:', error);
  }
};

// Verify connection on startup
verifyConnection();

// ========================================
// HEALTH CHECK & DIAGNOSTICS
// ========================================

app.get("/make-server-ab844084/health", (c) => {
  return c.json({ 
    status: "ok",
    database: "postgres",
    storage: "photos (public bucket)",
    timestamp: new Date().toISOString()
  });
});

app.post("/make-server-ab844084/create-bucket", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Check if bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const photosBucket = buckets?.find(b => b.name === 'photos');
    
    if (photosBucket) {
      return c.json({ 
        success: true, 
        message: 'Bucket "photos" already exists',
        bucket: photosBucket 
      });
    }

    // Create bucket
    const { data: newBucket, error: createError } = await supabase.storage.createBucket('photos', {
      public: true,
      fileSizeLimit: 52428800, // 50MB
    });
    
    if (createError) {
      console.error('Failed to create bucket:', createError);
      return c.json({ 
        success: false, 
        error: createError.message 
      }, 500);
    }

    console.log('✅ Bucket "photos" created successfully');
    return c.json({ 
      success: true, 
      message: 'Bucket "photos" created successfully',
      bucket: newBucket 
    });
  } catch (error: any) {
    console.error('Create bucket error:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

app.get("/make-server-ab844084/diagnostic", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const results: any = {
      supabase_url: Deno.env.get('SUPABASE_URL') ? '✅ Set' : '❌ Missing',
      service_role_key: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ? '✅ Set' : '❌ Missing',
      replicate_api_token: '✅ Managed by Vercel Backend',
      buckets: {},
      photos_meta_table: {},
      user_profiles_table: {},
      user_credits_table: {},
    };

    // Check buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    if (bucketsError) {
      results.buckets = { error: bucketsError.message };
    } else {
      const photosExists = buckets?.some(b => b.name === 'photos') || false;
      results.buckets = {
        total: buckets?.length || 0,
        photos_exists: photosExists,
        list: buckets?.map(b => ({ name: b.name, public: b.public })) || [],
      };
    }

    // Check photos_meta table
    const { count: photosCount, error: photosError } = await supabase
      .from('photos_meta')
      .select('*', { count: 'exact', head: true });

    if (photosError) {
      results.photos_meta_table = { error: photosError.message };
    } else {
      results.photos_meta_table = {
        accessible: true,
        record_count: photosCount || 0,
      };
    }

    // Check user_profiles table
    const { count: profilesCount, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true });

    if (profilesError) {
      results.user_profiles_table = { error: profilesError.message };
    } else {
      results.user_profiles_table = {
        accessible: true,
        record_count: profilesCount || 0,
      };
    }

    // Check user_credits table
    const { count: creditsCount, error: creditsError } = await supabase
      .from('user_credits')
      .select('*', { count: 'exact', head: true });

    if (creditsError) {
      results.user_credits_table = { error: creditsError.message };
    } else {
      results.user_credits_table = {
        accessible: true,
        record_count: creditsCount || 0,
      };
    }

    return c.json(results);
  } catch (error: any) {
    return c.json({ error: error.message || 'Diagnostic failed' }, 500);
  }
});

// ========================================
// PHOTO STORAGE MANAGEMENT
// ========================================

app.post("/make-server-ab844084/upload-photo", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string || 'uncategorized';
    const prompt = formData.get('prompt') as string || '';
    const seed = formData.get('seed') as string || String(Math.floor(Math.random() * 100000));

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    console.log(`📤 Uploading photo: ${file.name} (${file.size} bytes) to category: ${category}`);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `${category}/${timestamp}_${randomStr}.${extension}`;

    // Upload to Supabase Storage
    const buffer = await file.arrayBuffer();
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('photos')
      .upload(filename, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return c.json({ error: `Upload failed: ${uploadError.message}` }, 500);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('photos')
      .getPublicUrl(filename);

    if (!urlData?.publicUrl) {
      return c.json({ error: 'Failed to get public URL' }, 500);
    }

    // Create database entry
    const photoId = `photo_${timestamp}_${randomStr}`;
    const { data: photoData, error: insertError } = await supabase
      .from('photos_meta')
      .insert({
        id: photoId,
        category,
        prompt,
        seed: parseInt(seed),
        image_url: urlData.publicUrl,
        source: 'manual_upload'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return c.json({ error: `Database error: ${insertError.message}` }, 500);
    }

    console.log(`✅ Photo uploaded successfully: ${photoId}`);

    return c.json({ 
      success: true,
      photo: photoData,
      message: 'Photo uploaded successfully'
    });

  } catch (error: any) {
    console.error('Upload photo exception:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

app.get("/make-server-ab844084/list-photos", async (c) => {
  try {
    const category = c.req.query('category');
    const limit = parseInt(c.req.query('limit') || '50');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    let query = supabase
      .from('photos_meta')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('List photos error:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ 
      success: true,
      photos: data || [],
      total: data?.length || 0
    });

  } catch (error: any) {
    console.error('List photos exception:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

app.delete("/make-server-ab844084/delete-photo/:id", async (c) => {
  try {
    const photoId = c.req.param('id');

    if (!photoId) {
      return c.json({ error: 'Photo ID is required' }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Get photo metadata to find storage path
    const { data: photo, error: fetchError } = await supabase
      .from('photos_meta')
      .select('*')
      .eq('id', photoId)
      .single();

    if (fetchError || !photo) {
      return c.json({ error: 'Photo not found' }, 404);
    }

    // Extract filename from URL
    const url = photo.image_url;
    const match = url.match(/\/photos\/(.+)$/);
    const filename = match ? match[1] : null;

    // Delete from storage if we have a valid filename
    if (filename) {
      const { error: storageError } = await supabase.storage
        .from('photos')
        .remove([filename]);

      if (storageError) {
        console.warn('Storage deletion warning:', storageError.message);
      }
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from('photos_meta')
      .delete()
      .eq('id', photoId);

    if (deleteError) {
      console.error('Database deletion error:', deleteError);
      return c.json({ error: `Failed to delete photo: ${deleteError.message}` }, 500);
    }

    return c.json({ 
      success: true, 
      message: 'Photo deleted successfully' 
    });
  } catch (error: any) {
    console.error('Delete photo exception:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// ========================================
// IMAGE GENERATION PROXY ROUTES
// ========================================

app.post("/make-server-ab844084/generate-from-scratch", async (c) => {
  try {
    const body = await c.req.json();
    
    console.log('🔄 Proxying to Vercel API: generate-from-scratch', body);
    
    const response = await fetch(`${VERCEL_API_BASE}/api/generate-from-scratch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': c.req.header('Authorization') || '',
      },
      body: JSON.stringify(body),
    });

    // Log response details
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));

    const contentType = response.headers.get('content-type');
    
    // If response is not JSON, log the text
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text.substring(0, 200));
      return c.json({ 
        error: 'API returned non-JSON response', 
        status: response.status,
        preview: text.substring(0, 100)
      }, response.status);
    }

    const data = await response.json();
    return c.json(data, response.status);
  } catch (error: any) {
    console.error('Proxy error (generate-from-scratch):', error);
    return c.json({ error: error.message || 'Proxy failed' }, 500);
  }
});

app.post("/make-server-ab844084/generate-gen4", async (c) => {
  try {
    const body = await c.req.json();
    
    console.log('🔄 Proxying to Vercel API: generate-gen4-image');
    console.log('📦 Original Payload:', JSON.stringify(body, null, 2));
    
    // ============================================
    // AUTOPILOT: Flux img2img → Kontext [pro]
    // ============================================
    
    let effectiveModel = body.model;
    let modifiedPayload = { ...body };
    
    // Detect Flux img2img and transform to Kontext
    if (body.model === 'flux' && body.mode === 'img2img' && body.image_url) {
      console.log('🔄 AUTOPILOT DETECTED: Flux img2img → Kontext [pro]');
      console.log('  Original model:', body.model);
      console.log('  Image URL:', body.image_url.substring(0, 100) + '...');
      
      // Transform to Kontext payload
      effectiveModel = 'kontext-pro';
      modifiedPayload = {
        ...body,
        model: 'kontext-pro', // Change model
        // Kontext uses different parameters
        guidance: body.guidance || 4.0, // Kontext uses guidance instead of prompt_strength
        // Remove Flux-specific params
        prompt_strength: undefined,
      };
      
      console.log('✅ AUTOPILOT APPLIED:');
      console.log('  Effective model:', effectiveModel);
      console.log('  Guidance:', modifiedPayload.guidance);
    } else if (body.model === 'flux' && body.mode === 'img2img' && !body.image_url) {
      console.error('❌ FLUX IMG2IMG: image_url is MISSING!');
    } else if (body.model === 'flux') {
      console.log('✅ FLUX TEXT2IMG: Using Flux 1.1 Pro normally');
    }
    
    // Debug Gen-4 references
    if ((body.model === 'gen4' || body.model === 'gen4-turbo') && body.reference_images) {
      console.log('✅ GEN-4: reference_images count:', body.reference_images.length);
      body.reference_images.forEach((url: string, i: number) => {
        console.log(`  [${i}] ${url.substring(0, 100)}...`);
      });
    }
    
    console.log('📦 Modified Payload:', JSON.stringify(modifiedPayload, null, 2));
    
    // ============================================
    // Proxy to Vercel API
    // ============================================
    
    const response = await fetch(`${VERCEL_API_BASE}/api/generate-gen4-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': c.req.header('Authorization') || '',
      },
      body: JSON.stringify(modifiedPayload),
    });

    console.log('Response status:', response.status);
    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text.substring(0, 200));
      return c.json({ 
        error: 'API returned non-JSON response', 
        status: response.status,
        preview: text.substring(0, 100)
      }, response.status);
    }

    const data = await response.json();
    
    // Log response
    console.log('✅ Response from Vercel API:');
    console.log('  Status:', response.status);
    console.log('  Model used:', data.model || effectiveModel);
    console.log('  Image URL:', data.image_url ? data.image_url.substring(0, 100) + '...' : 'MISSING');
    
    // Inject effective model into response
    if (effectiveModel !== body.model) {
      data.effective_model = effectiveModel;
      data.autopilot = true;
    }
    
    return c.json(data, response.status);
  } catch (error: any) {
    console.error('Proxy error (generate-gen4):', error);
    return c.json({ error: error.message || 'Proxy failed' }, 500);
  }
});

app.post("/make-server-ab844084/image-to-image", async (c) => {
  try {
    const body = await c.req.json();
    
    console.log('🔄 Proxying to Vercel API: image-to-image', body);
    
    const response = await fetch(`${VERCEL_API_BASE}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': c.req.header('Authorization') || '',
      },
      body: JSON.stringify(body),
    });

    console.log('Response status:', response.status);
    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text.substring(0, 200));
      return c.json({ 
        error: 'API returned non-JSON response', 
        status: response.status,
        preview: text.substring(0, 100)
      }, response.status);
    }

    const data = await response.json();
    return c.json(data, response.status);
  } catch (error: any) {
    console.error('Proxy error (image-to-image):', error);
    return c.json({ error: error.message || 'Proxy failed' }, 500);
  }
});

// ========================================
// AUTHENTICATION & USER MANAGEMENT
// ========================================

app.post("/make-server-ab844084/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || '' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // 🔧 AUTO-FIX: Create user_profile automatically after signup
    if (data.user) {
      console.log('✅ User created, now creating profile for:', data.user.id);
      
      try {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: data.user.id,
            email: email,
            full_name: name || email,
            credits_remaining: 420,
          });

        if (profileError) {
          console.error('⚠️  Failed to create user profile:', profileError);
          console.log('💡 TIP: Run setup SQL to create user_profiles table');
          // Don't fail signup, just log the error
        } else {
          console.log('✅ User profile created successfully!');
        }
      } catch (profileErr) {
        console.error('Profile creation exception:', profileErr);
      }
    }

    return c.json({ 
      success: true, 
      message: 'Account created successfully!',
      user: data.user 
    });
  } catch (error: any) {
    console.error('Signup exception:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

app.post("/make-server-ab844084/ensure-profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminSupabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Check if profile exists
    const { data: existingProfile } = await adminSupabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (existingProfile) {
      return c.json({ 
        success: true, 
        message: 'Profile already exists',
        profile: existingProfile 
      });
    }

    // Create profile
    const { data: newProfile, error: profileError } = await adminSupabase
      .from('user_profiles')
      .insert({
        user_id: user.id,
        email: user.email,
        full_name: user.user_metadata?.name || user.email,
        credits_remaining: 420,
      })
      .select()
      .single();

    if (profileError) {
      console.error('Failed to create profile:', profileError);
      return c.json({ error: profileError.message }, 500);
    }

    return c.json({ 
      success: true, 
      message: 'Profile created successfully!',
      profile: newProfile 
    });
  } catch (error: any) {
    console.error('Ensure profile exception:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// ========================================
// CREDITS SYSTEM
// ========================================

app.get("/make-server-ab844084/credits", async (c) => {
  try {
    // Support both Bearer token (preferred) and query param (legacy)
    const authHeader = c.req.header('Authorization');
    let userId = c.req.query('user_id');

    // If Bearer token is provided, extract user from it
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const accessToken = authHeader.substring(7);
      
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

      if (authError || !user) {
        return c.json({
          success: false,
          error: 'Invalid or expired token'
        }, 401);
      }

      userId = user.id;
    }

    if (!userId) {
      return c.json({ 
        success: false,
        error: 'user_id is required or provide Authorization header' 
      }, 400);
    }

    console.log('[Credits] Fetching credits for user:', userId);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Fetch user credits from database with retry for connection errors
    const { data, error } = await queryWithRetry(() =>
      supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', userId)
        .single()
    );

    if (error) {
      // If user doesn't exist, create default credits
      if (error.code === 'PGRST116') {
        console.log('[Credits] User not found, creating default credits');
        
        const { data: newUser, error: insertError } = await queryWithRetry(() =>
          supabase
            .from('user_credits')
            .insert({ user_id: userId, credits: 420 })
            .select()
            .single()
        );

        if (insertError) {
          console.error('[Credits] Error creating credits:', insertError);
          return c.json({ 
            success: false,
            error: 'Failed to create credits' 
          }, 500);
        }

        return c.json({ 
          success: true,
          credits: newUser.credits 
        });
      }

      console.error('[Credits] Error fetching credits:', error);
      return c.json({ 
        success: false,
        error: 'Failed to fetch credits' 
      }, 500);
    }

    console.log('[Credits] Credits fetched successfully:', data.credits);

    return c.json({
      success: true,
      credits: data?.credits ?? 0
    });
  } catch (error: any) {
    console.error('[Credits] Unexpected error:', error);
    return c.json({ 
      success: false,
      error: 'Internal server error',
      details: error.message 
    }, 500);
  }
});

app.post("/make-server-ab844084/credits/debit", async (c) => {
  try {
    const body = await c.req.json();
    const { user_id, amount, description } = body;

    if (!user_id || !amount) {
      return c.json({ error: 'user_id and amount are required' }, 400);
    }

    if (amount <= 0) {
      return c.json({ error: 'amount must be positive' }, 400);
    }

    console.log(`[Credits] Debiting ${amount} credits for user:`, user_id);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Get current credits with retry
    const { data: userData, error: fetchError } = await queryWithRetry(() =>
      supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', user_id)
        .single()
    );

    if (fetchError) {
      console.error('[Credits] Error fetching credits:', fetchError);
      return c.json({ error: 'Failed to fetch credits' }, 500);
    }

    const currentCredits = userData?.credits ?? 0;

    if (currentCredits < amount) {
      console.warn(`[Credits] Insufficient credits: ${currentCredits} < ${amount}`);
      return c.json({ 
        error: 'Insufficient credits',
        current_credits: currentCredits,
        required: amount
      }, 400);
    }

    // Debit credits with retry
    const newCredits = currentCredits - amount;

    const { error: updateError } = await queryWithRetry(() =>
      supabase
        .from('user_credits')
        .update({ 
          credits: newCredits,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user_id)
    );

    if (updateError) {
      console.error('[Credits] Error updating credits:', updateError);
      return c.json({ error: 'Failed to update credits' }, 500);
    }

    // Log transaction (if credit_transactions table exists)
    try {
      await supabase
        .from('credit_transactions')
        .insert({
          user_id,
          amount: -amount,
          type: 'debit',
          description: description || 'Image generation',
          balance_after: newCredits
        });
    } catch (logErr) {
      console.warn('[Credits] Failed to log transaction (table may not exist):', logErr);
      // Don't fail the request if logging fails
    }

    console.log(`[Credits] Successfully debited ${amount} credits. New balance: ${newCredits}`);

    return c.json({ 
      success: true,
      credits_remaining: newCredits,
      amount_debited: amount
    });
  } catch (error: any) {
    console.error('[Credits] Unexpected error:', error);
    return c.json({ 
      error: 'Internal server error',
      details: error.message 
    }, 500);
  }
});

app.post("/make-server-ab844084/credits/add", async (c) => {
  try {
    const body = await c.req.json();
    const { user_id, amount, reason } = body;

    if (!user_id || !amount) {
      return c.json({ error: 'user_id and amount are required' }, 400);
    }

    if (amount <= 0) {
      return c.json({ error: 'amount must be positive' }, 400);
    }

    console.log(`[Credits] Adding ${amount} credits for user:`, user_id);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Get current credits with retry
    const { data: userData, error: fetchError } = await queryWithRetry(() =>
      supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', user_id)
        .single()
    );

    if (fetchError) {
      // If user doesn't exist, create with initial credits
      if (fetchError.code === 'PGRST116') {
        console.log('[Credits] User not found, creating with credits:', amount);
        
        const { data: newUser, error: insertError } = await queryWithRetry(() =>
          supabase
            .from('user_credits')
            .insert({ user_id, credits: amount })
            .select()
            .single()
        );

        if (insertError) {
          console.error('[Credits] Error creating user credits:', insertError);
          return c.json({ error: 'Failed to create user credits' }, 500);
        }

        return c.json({ 
          success: true,
          new_balance: amount,
          amount_added: amount
        });
      }

      console.error('[Credits] Error fetching credits:', fetchError);
      return c.json({ error: 'Failed to fetch credits' }, 500);
    }

    const currentCredits = userData?.credits ?? 0;
    const newCredits = currentCredits + amount;

    // Add credits with retry
    const { error: updateError } = await queryWithRetry(() =>
      supabase
        .from('user_credits')
        .update({ 
          credits: newCredits,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user_id)
    );

    if (updateError) {
      console.error('[Credits] Error updating credits:', updateError);
      return c.json({ error: 'Failed to update credits' }, 500);
    }

    // Log transaction (if credit_transactions table exists)
    try {
      await supabase
        .from('credit_transactions')
        .insert({
          user_id,
          amount: amount,
          type: 'credit',
          description: reason || 'Manual add',
          balance_after: newCredits
        });
    } catch (logErr) {
      console.warn('[Credits] Failed to log transaction (table may not exist):', logErr);
      // Don't fail the request if logging fails
    }

    console.log(`[Credits] Successfully added ${amount} credits. New balance: ${newCredits}`);

    return c.json({ 
      success: true,
      new_balance: newCredits,
      amount_added: amount
    });
  } catch (error: any) {
    console.error('[Credits] Unexpected error:', error);
    return c.json({ 
      error: 'Internal server error',
      details: error.message 
    }, 500);
  }
});

// ========================================
// AI MODELS MANAGEMENT
// ========================================

// Vérifier et créer le bucket AI models au démarrage
const ensureAIModelsBucket = async () => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: buckets } = await supabase.storage.listBuckets();
    const aiModelsBucket = buckets?.find(b => b.name === 'ai-models');
    
    if (!aiModelsBucket) {
      console.log('⚠️ Bucket "ai-models" not found. Creating it now...');
      
      const { error: createError } = await supabase.storage.createBucket('ai-models', {
        public: true, // Public pour accéder aux photos d'entraînement
        fileSizeLimit: 52428800, // 50MB par fichier
      });
      
      if (createError) {
        console.error('❌ Failed to create bucket "ai-models":', createError.message);
      } else {
        console.log('✅ Bucket "ai-models" created successfully!');
      }
    } else {
      console.log('✅ Bucket "ai-models" already exists');
    }
  } catch (error) {
    console.error('⚠️ AI Models bucket verification failed:', error);
  }
};

// Initialiser le bucket au démarrage
ensureAIModelsBucket();

// Vérifier et créer le bucket generated_images au démarrage
const ensureGeneratedImagesBucket = async () => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: buckets } = await supabase.storage.listBuckets();
    const generatedImagesBucket = buckets?.find(b => b.name === 'generated_images');
    
    if (!generatedImagesBucket) {
      console.log('⚠️ Bucket "generated_images" not found. Creating it now...');
      
      const { error: createError } = await supabase.storage.createBucket('generated_images', {
        public: true, // Public pour les URLs de preview
        fileSizeLimit: 52428800, // 50MB par fichier
      });
      
      if (createError) {
        console.error('❌ Failed to create bucket "generated_images":', createError.message);
      } else {
        console.log('✅ Bucket "generated_images" created successfully!');
      }
    } else {
      console.log('✅ Bucket "generated_images" already exists');
    }
  } catch (error) {
    console.error('⚠️ Generated images bucket verification failed:', error);
  }
};

// Initialiser les buckets au démarrage
ensureGeneratedImagesBucket();

// ========================================
// GET /models - Récupérer tous les modèles d'un utilisateur
// ========================================
app.get("/make-server-ab844084/models", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    console.log('[AI Models] Fetching models for user:', user.id);

    // Get models from KV store with prefix
    const prefix = `model:${user.id}:`;
    const models = await kv.getByPrefix(prefix);

    console.log('[AI Models] Found', models.length, 'models');

    return c.json({
      success: true,
      models: models.map(m => m.value).sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      })
    });
  } catch (error: any) {
    console.error('[AI Models] Error fetching models:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to fetch models' 
    }, 500);
  }
});

// ========================================
// GET /models/:id - Récupérer un modèle spécifique
// ========================================
app.get("/make-server-ab844084/models/:modelId", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const modelId = c.req.param('modelId');
    const key = `model:${user.id}:${modelId}`;

    const model = await kv.get(key);
    
    if (!model) {
      return c.json({ success: false, error: 'Model not found' }, 404);
    }

    return c.json({
      success: true,
      model
    });
  } catch (error: any) {
    console.error('[AI Models] Error fetching model:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to fetch model' 
    }, 500);
  }
});

// ========================================
// POST /models - Créer un nouveau modèle IA
// ========================================
app.post("/make-server-ab844084/models", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const body = await c.req.json();
    const { name, description, training_data } = body;

    if (!name) {
      return c.json({ success: false, error: 'Model name is required' }, 400);
    }

    const modelId = `model_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();
    
    const model = {
      id: modelId,
      name,
      description: description || '',
      status: 'pending', // pending, training, trained, failed
      user_id: user.id,
      created_at: now,
      updated_at: now,
      photos: [],
      pollinations_model_id: null,
      training_data: training_data || {},
      training_progress: 0,
      error_message: null
    };

    console.log('[AI Models] Creating model:', modelId, 'for user:', user.id);

    // Store in KV
    const key = `model:${user.id}:${modelId}`;
    await kv.set(key, model);

    console.log('[AI Models] ✅ Model created successfully');

    return c.json({
      success: true,
      model,
      message: 'Model created successfully. Upload photos to start training.'
    });
  } catch (error: any) {
    console.error('[AI Models] Error creating model:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to create model' 
    }, 500);
  }
});

// ========================================
// POST /models/:id/photos - Upload photo(s) pour entraînement
// ========================================
app.post("/make-server-ab844084/models/:modelId/photos", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const modelId = c.req.param('modelId');
    const key = `model:${user.id}:${modelId}`;

    // Get existing model
    const model = await kv.get(key);
    if (!model) {
      return c.json({ success: false, error: 'Model not found' }, 404);
    }

    // Vérifier que le modèle n'est pas déjà en training
    if (model.status === 'training') {
      return c.json({ 
        success: false, 
        error: 'Cannot upload photos while model is training' 
      }, 400);
    }

    // Get uploaded file
    const formData = await c.req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return c.json({ success: false, error: 'No file provided' }, 400);
    }

    console.log('[AI Models] Uploading photo to model:', modelId, '- File:', file.name);

    // Upload to ai-models bucket
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `${user.id}/${modelId}/${timestamp}_${randomStr}.${extension}`;

    const buffer = await file.arrayBuffer();
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('ai-models')
      .upload(filename, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false,
      });

    if (uploadError) {
      console.error('[AI Models] Upload error:', uploadError);
      return c.json({ success: false, error: `Upload failed: ${uploadError.message}` }, 500);
    }

    // Get public URL with cache-buster
    const { data: urlData } = supabase.storage
      .from('ai-models')
      .getPublicUrl(filename);

    if (!urlData?.publicUrl) {
      return c.json({ success: false, error: 'Failed to get public URL' }, 500);
    }

    // Add cache-buster to ensure immediate display
    const urlWithCacheBuster = `${urlData.publicUrl}?t=${timestamp}`;

    // Create photo metadata
    const photoMetadata = {
      id: `photo_${timestamp}_${randomStr}`,
      url: urlWithCacheBuster,
      filename: file.name,
      uploaded_at: new Date().toISOString()
    };

    // Update model with new photo
    const isFirstPhoto = !model.photos || model.photos.length === 0;
    
    const updatedModel = {
      ...model,
      photos: [...(model.photos || []), photoMetadata],
      // Auto-set first photo as thumbnail (with cache-buster)
      thumbnailPhoto: isFirstPhoto ? urlWithCacheBuster : model.thumbnailPhoto,
      updated_at: new Date().toISOString()
    };

    await kv.set(key, updatedModel);

    console.log('[AI Models] ✅ Photo uploaded successfully. Total photos:', updatedModel.photos.length);
    if (isFirstPhoto) {
      console.log('[AI Models] 🖼️ Set as thumbnail photo');
    }

    return c.json({
      success: true,
      photo: photoMetadata,
      total_photos: updatedModel.photos.length,
      thumbnailPhoto: updatedModel.thumbnailPhoto,
      message: `Photo uploaded successfully. ${updatedModel.photos.length} photos ready for training.`
    });
  } catch (error: any) {
    console.error('[AI Models] Error uploading photo:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to upload photo' 
    }, 500);
  }
});

// ========================================
// DELETE /models/:id/photos/:photoId - Supprimer une photo
// ========================================
app.delete("/make-server-ab844084/models/:modelId/photos/:photoId", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const modelId = c.req.param('modelId');
    const photoId = c.req.param('photoId');
    const key = `model:${user.id}:${modelId}`;

    // Get model
    const model = await kv.get(key);
    if (!model) {
      return c.json({ success: false, error: 'Model not found' }, 404);
    }

    // Find photo
    const photoIndex = model.photos?.findIndex((p: any) => p.id === photoId);
    if (photoIndex === -1 || photoIndex === undefined) {
      return c.json({ success: false, error: 'Photo not found' }, 404);
    }

    const photo = model.photos[photoIndex];

    // Extract filename from URL
    const urlMatch = photo.url.match(/\/ai-models\/(.+)$/);
    const filename = urlMatch ? urlMatch[1] : null;

    // Delete from storage
    if (filename) {
      const { error: deleteError } = await supabase.storage
        .from('ai-models')
        .remove([filename]);

      if (deleteError) {
        console.warn('[AI Models] Storage deletion warning:', deleteError.message);
      }
    }

    // Remove from model
    const updatedPhotos = model.photos.filter((p: any) => p.id !== photoId);
    const updatedModel = {
      ...model,
      photos: updatedPhotos,
      updated_at: new Date().toISOString()
    };

    await kv.set(key, updatedModel);

    console.log('[AI Models] ✅ Photo deleted. Remaining:', updatedPhotos.length);

    return c.json({
      success: true,
      message: 'Photo deleted successfully',
      remaining_photos: updatedPhotos.length
    });
  } catch (error: any) {
    console.error('[AI Models] Error deleting photo:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to delete photo' 
    }, 500);
  }
});

// ========================================
// POST /models/:id/train - Déclencher l'entraînement avec Pollinations
// ========================================
app.post("/make-server-ab844084/models/:modelId/train", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const modelId = c.req.param('modelId');
    const key = `model:${user.id}:${modelId}`;

    // Get model
    const model = await kv.get(key);
    if (!model) {
      return c.json({ success: false, error: 'Model not found' }, 404);
    }

    // Validation: minimum 5 photos requises
    if (!model.photos || model.photos.length < 5) {
      return c.json({ 
        success: false, 
        error: `Minimum 5 photos required for training. Currently: ${model.photos?.length || 0}` 
      }, 400);
    }

    // Vérifier que le modèle n'est pas déjà en training
    if (model.status === 'training') {
      return c.json({ 
        success: false, 
        error: 'Model is already training' 
      }, 400);
    }

    console.log('[AI Models] Starting training for model:', modelId);
    console.log('[AI Models] Training photos count:', model.photos.length);

    // ============================================
    // INTEGRATION POLLINATIONS
    // ============================================
    // Note: Pollinations n'a pas d'API publique pour l'entraînement de modèles personnalisés
    // Cette section devra être adaptée selon le service réel utilisé
    // Options: Astria.ai, Replicate, HuggingFace, etc.
    
    try {
      // Simuler l'appel API (à remplacer par l'API réelle)
      const pollinationsResponse = {
        training_id: `train_${Date.now()}`,
        status: 'started',
        estimated_time: '10-15 minutes'
      };

      // Update model status
      const updatedModel = {
        ...model,
        status: 'training',
        pollinations_model_id: pollinationsResponse.training_id,
        training_progress: 0,
        training_started_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await kv.set(key, updatedModel);

      console.log('[AI Models] ✅ Training started successfully');
      console.log('[AI Models] Training ID:', pollinationsResponse.training_id);

      return c.json({
        success: true,
        model: updatedModel,
        message: 'Training started successfully',
        training_id: pollinationsResponse.training_id,
        estimated_time: pollinationsResponse.estimated_time
      });

    } catch (apiError: any) {
      console.error('[AI Models] Training API error:', apiError);
      
      // Update model with error
      const errorModel = {
        ...model,
        status: 'failed',
        error_message: apiError.message || 'Training failed to start',
        updated_at: new Date().toISOString()
      };
      
      await kv.set(key, errorModel);

      return c.json({ 
        success: false, 
        error: `Training failed: ${apiError.message}` 
      }, 500);
    }

  } catch (error: any) {
    console.error('[AI Models] Error starting training:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to start training' 
    }, 500);
  }
});

// ========================================
// GET /models/:id/status - Vérifier le statut de l'entraînement
// ========================================
app.get("/make-server-ab844084/models/:modelId/status", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const modelId = c.req.param('modelId');
    const key = `model:${user.id}:${modelId}`;

    const model = await kv.get(key);
    if (!model) {
      return c.json({ success: false, error: 'Model not found' }, 404);
    }

    // Si le modèle est en training, vérifier le statut auprès de Pollinations
    if (model.status === 'training' && model.pollinations_model_id) {
      console.log('[AI Models] Checking training status:', model.pollinations_model_id);
      
      try {
        // TODO: Appeler l'API Pollinations pour obtenir le statut réel
        // const statusResponse = await fetch(`https://pollinations.ai/api/training/${model.pollinations_model_id}`);
        
        // Simuler une réponse (à remplacer)
        const mockProgress = Math.min(model.training_progress + 10, 100);
        const isComplete = mockProgress >= 100;
        
        if (isComplete) {
          const completedModel = {
            ...model,
            status: 'trained',
            training_progress: 100,
            training_completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          await kv.set(key, completedModel);
          
          return c.json({
            success: true,
            status: 'trained',
            progress: 100,
            model: completedModel,
            message: 'Training completed successfully!'
          });
        } else {
          const progressModel = {
            ...model,
            training_progress: mockProgress,
            updated_at: new Date().toISOString()
          };
          
          await kv.set(key, progressModel);
          
          return c.json({
            success: true,
            status: 'training',
            progress: mockProgress,
            message: `Training in progress: ${mockProgress}%`
          });
        }
        
      } catch (statusError: any) {
        console.error('[AI Models] Status check error:', statusError);
      }
    }

    return c.json({
      success: true,
      status: model.status,
      progress: model.training_progress || 0,
      model
    });

  } catch (error: any) {
    console.error('[AI Models] Error checking status:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to check status' 
    }, 500);
  }
});

// ========================================
// POST /models/:id/generate - Générer avec le modèle entraîné
// ========================================
app.post("/make-server-ab844084/models/:modelId/generate", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const modelId = c.req.param('modelId');
    const key = `model:${user.id}:${modelId}`;

    // Get model
    const model = await kv.get(key);
    if (!model) {
      return c.json({ success: false, error: 'Model not found' }, 404);
    }

    // Vérifier que le modèle est entraîné
    if (model.status !== 'trained') {
      return c.json({ 
        success: false, 
        error: `Model must be trained before generating. Current status: ${model.status}` 
      }, 400);
    }

    const body = await c.req.json();
    const { prompt, negative_prompt, num_outputs = 1 } = body;

    if (!prompt) {
      return c.json({ success: false, error: 'Prompt is required' }, 400);
    }

    console.log('[AI Models] Generating with model:', modelId);
    console.log('[AI Models] Prompt:', prompt);

    // ============================================
    // GENERATION AVEC POLLINATIONS
    // ============================================
    try {
      // TODO: Utiliser l'API Pollinations avec le modèle personnalisé
      // const pollinationsUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?model=${model.pollinations_model_id}`;
      
      // Pour l'instant, utiliser Pollinations standard
      const pollinationsUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&enhance=true`;
      
      console.log('[AI Models] Generated URL:', pollinationsUrl);

      return c.json({
        success: true,
        image_url: pollinationsUrl,
        model_id: modelId,
        prompt,
        message: 'Image generated successfully'
      });

    } catch (genError: any) {
      console.error('[AI Models] Generation error:', genError);
      return c.json({ 
        success: false, 
        error: `Generation failed: ${genError.message}` 
      }, 500);
    }

  } catch (error: any) {
    console.error('[AI Models] Error generating:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to generate' 
    }, 500);
  }
});

// ========================================
// DELETE /models/:id - Supprimer un modèle
// ========================================
app.delete("/make-server-ab844084/models/:modelId", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const modelId = c.req.param('modelId');
    const key = `model:${user.id}:${modelId}`;

    // Get model
    const model = await kv.get(key);
    if (!model) {
      return c.json({ success: false, error: 'Model not found' }, 404);
    }

    console.log('[AI Models] Deleting model:', modelId);

    // Delete all photos from storage
    if (model.photos && model.photos.length > 0) {
      const filesToDelete = model.photos
        .map((photo: any) => {
          const match = photo.url.match(/\/ai-models\/(.+)$/);
          return match ? match[1] : null;
        })
        .filter(Boolean);

      if (filesToDelete.length > 0) {
        const { error: deleteError } = await supabase.storage
          .from('ai-models')
          .remove(filesToDelete);

        if (deleteError) {
          console.warn('[AI Models] Storage deletion warning:', deleteError.message);
        } else {
          console.log('[AI Models] Deleted', filesToDelete.length, 'photos from storage');
        }
      }
    }

    // Delete model from KV
    await kv.del(key);

    console.log('[AI Models] ✅ Model deleted successfully');

    return c.json({
      success: true,
      message: 'Model deleted successfully'
    });

  } catch (error: any) {
    console.error('[AI Models] Error deleting model:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to delete model' 
    }, 500);
  }
});

// ========================================
// V1-PREVIEW API - Generate preview for CREATE AI MODEL
// ========================================

app.post("/make-server-ab844084/v1-preview", async (c) => {
  try {
    console.log('[V1-Preview] 📥 Request received');

    // Extract payload (support both camelCase and snake_case)
    const body = await c.req.json();
    const {
      gender,
      eyeColor,
      eye_color,
      hairColor,
      hair_color,
      hairLength,
      hair_length,
      skinTone,
      skin_tone,
      bodyType,
      body_type,
      bustSize,
      bust_size,
      buttSize,
      butt_size,
      background,
      outfit,
      mood,
      prompt,
      seed,
      aspectRatio = '1:1',
      aspect_ratio
    } = body;

    // Normalize fields (prefer camelCase, fallback to snake_case)
    const normalizedFields = {
      gender,
      eyeColor: eyeColor || eye_color,
      hairColor: hairColor || hair_color,
      hairLength: hairLength || hair_length,
      skinTone: skinTone || skin_tone,
      bodyType: bodyType || body_type,
      bustSize: bustSize || bust_size,
      buttSize: buttSize || butt_size,
      background,
      outfit,
      mood,
      aspectRatio: aspectRatio || aspect_ratio || '1:1',
      seed
    };

    // Validation
    if (!gender) {
      console.error('[V1-Preview] ❌ Missing gender');
      return c.json({ 
        ok: false, 
        error: 'Missing required field: gender' 
      }, 400);
    }

    if (!seed) {
      console.error('[V1-Preview] ❌ Missing seed');
      return c.json({ 
        ok: false, 
        error: 'Missing required field: seed' 
      }, 400);
    }

    // IMPORTANT: Build prompt if missing (client-side generation is primary, this is fallback)
    let finalPrompt = prompt;
    
    if (!finalPrompt) {
      console.log('[V1-Preview] ⚠️ Prompt missing, generating from attributes...');
      
      // Helper: clamp value to allowed list
      const clamp = (value: string | undefined | null, allowed: string[], defaultIndex = 0): string => {
        if (typeof value === 'string' && value.trim().length > 0 && allowed.includes(value)) {
          return value;
        }
        return allowed[defaultIndex];
      };

      const G = clamp(gender, ['woman', 'man'], 0);
      const subject = G === 'man' ? 'man' : 'woman';

      // SIMPLIFIED: Just essentials
      const skin = clamp(normalizedFields.skinTone, ['light', 'fair', 'medium', 'tan', 'deep'], 2);
      const hC = clamp(normalizedFields.hairColor, ['black', 'brown', 'blonde', 'red', 'gray'], 1);
      const hL = clamp(normalizedFields.hairLength, ['short', 'medium', 'long', 'bald'], 2);
      const eyes = clamp(normalizedFields.eyeColor, ['brown', 'blue', 'green', 'hazel', 'gray'], 0);

      // Hair phrase
      const hair = hL === 'bald' ? 'bald' : `${hL} ${hC} hair`;

      // SIMPLIFIED: Short prompt for speed (60-80 chars)
      finalPrompt = `portrait ${subject}, ${hair}, ${eyes} eyes, ${skin} skin, professional photo`;
      console.log('[V1-Preview] 📝 Generated prompt (fallback):', finalPrompt.length, 'chars');
    }

    console.log('[V1-Preview] ✅ Validation passed');
    console.log('[V1-Preview] 🎯 Gender:', gender);
    console.log('[V1-Preview] 🧬 Seed:', seed);
    console.log('[V1-Preview] 📝 Prompt length:', finalPrompt.length);

    // FULL SIZE: 1024x1024 pour qualité photos de rencontres
    const width = 1024;
    const height = 1024;
    
    // OPTIMIZED: Simple prompt without extra text
    const simplePrompt = `${finalPrompt}, photorealistic, high quality`;
    
    const pollinationsUrl = new URL('https://pollinations.ai/p/' + encodeURIComponent(simplePrompt));
    pollinationsUrl.searchParams.set('width', width.toString());
    pollinationsUrl.searchParams.set('height', height.toString());
    pollinationsUrl.searchParams.set('nologo', 'true');
    pollinationsUrl.searchParams.set('seed', seed.toString());
    pollinationsUrl.searchParams.set('model', 'flux');
    // REMOVED: enhance parameter (slows down)
    // REMOVED: negative prompt (causes cartoon + slower)

    console.log('[V1-Preview] 🎨 Generating image (1024x1024, FLUX model)...');
    console.log('[V1-Preview] 📝 Prompt:', simplePrompt);

    // OPTIMIZED: Return Pollinations URL directly WITHOUT upload
    // This saves 2-3 seconds by skipping Supabase Storage upload
    const image_url = pollinationsUrl.toString();
    
    console.log('[V1-Preview] ⚡ Fast mode: returning direct URL (no upload)');
    console.log('[V1-Preview] 🎉 Preview ready:', image_url);

    // Return success immediately
    return c.json({
      ok: true,
      image_url,
      prompt: finalPrompt
    });

  } catch (error: any) {
    console.error('[V1-Preview] ❌ Error:', error);
    
    // Provide more context in error messages
    let errorMessage = error.message || 'Generation failed';
    let userMessage = errorMessage;
    
    // Add helpful context for Pollinations errors
    if (errorMessage.includes('Pollinations') || errorMessage.includes('HTTP 502') || errorMessage.includes('HTTP 503')) {
      userMessage = 'Le service de génération d\'images est temporairement indisponible. Réessayez dans quelques secondes.';
      errorMessage = `Pollinations API overloaded/down. ${errorMessage}`;
    } else if (errorMessage.includes('timeout')) {
      userMessage = 'La génération a pris trop de temps. Réessayez avec un prompt plus simple.';
    } else if (errorMessage.includes('Upload failed')) {
      userMessage = 'Erreur lors de l\'upload de l\'image. Réessayez.';
    }
    
    return c.json({
      ok: false,
      error: userMessage,
      technicalError: errorMessage,
      details: {
        timestamp: new Date().toISOString(),
        service: 'V1-Preview',
        retries: 5,
        suggestion: 'Si le problème persiste, essayez un autre seed ou attendez quelques minutes.'
      }
    }, 500);
  }
});

// Health check for V1-Preview
app.get("/make-server-ab844084/v1-preview", (c) => {
  return c.json({
    ok: true,
    service: 'V1-Preview',
    status: 'ready',
    message: 'Use POST method to generate preview images'
  });
});

// ========================================
// V1 PREVIEW ENDPOINT - FIGMA PLUGIN
// ========================================

// Cache LRU simple pour les previews (max 100 entrées)
const previewCache = new Map<string, {
  image_url: string;
  seed: number;
  timestamp: number;
}>();

const MAX_CACHE_SIZE = 100;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 heures

function getCacheKey(payload: any): string {
  // Créer une clé unique basée sur les attributs
  const keys = ['gender', 'background', 'outfit', 'hairColor', 'hairLength', 'skinTone', 'eyeColor', 'mood', 'aspect_ratio'];
  const relevantData = keys
    .filter(k => payload[k])
    .map(k => `${k}:${payload[k]}`)
    .join('|');
  return relevantData;
}

function getCachedPreview(key: string) {
  const cached = previewCache.get(key);
  if (!cached) return null;
  
  // Vérifier TTL
  const age = Date.now() - cached.timestamp;
  if (age > CACHE_TTL_MS) {
    previewCache.delete(key);
    return null;
  }
  
  return cached;
}

function setCachedPreview(key: string, image_url: string, seed: number) {
  // Éviction LRU : supprimer le plus ancien si cache plein
  if (previewCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = previewCache.keys().next().value;
    previewCache.delete(oldestKey);
  }
  
  previewCache.set(key, {
    image_url,
    seed,
    timestamp: Date.now()
  });
}

function buildPromptFromAttributes(attrs: any): string {
  // Générer un prompt descriptif (120-160 caractères) depuis les attributs
  const parts: string[] = [];
  
  // Sujet principal
  if (attrs.gender === 'woman') {
    parts.push('attractive woman');
  } else if (attrs.gender === 'man') {
    parts.push('handsome man');
  }
  
  // Caractéristiques physiques
  if (attrs.hairColor) parts.push(`${attrs.hairColor} hair`);
  if (attrs.hairLength) parts.push(`${attrs.hairLength} hair`);
  if (attrs.eyeColor) parts.push(`${attrs.eyeColor} eyes`);
  if (attrs.skinTone) parts.push(`${attrs.skinTone} skin`);
  
  // Expression
  if (attrs.mood) parts.push(attrs.mood);
  
  // Vêtements
  if (attrs.outfit) parts.push(`wearing ${attrs.outfit}`);
  
  // Contexte
  if (attrs.background) parts.push(`in ${attrs.background}`);
  
  // Qualité
  parts.push('professional photography, high quality, sharp focus, natural lighting');
  
  const prompt = parts.join(', ');
  console.log(`[Preview V6] Generated prompt (${prompt.length} chars):`, prompt);
  
  return prompt;
}

app.post("/make-server-ab844084/v1/preview", async (c) => {
  const startTime = Date.now();
  
  try {
    const body = await c.req.json();
    
    console.log('[Preview V6] 📥 Incoming request:', JSON.stringify(body, null, 2));
    
    // Validation : gender est obligatoire
    if (!body.gender) {
      console.error('[Preview V6] ❌ Missing required field: gender');
      return c.json({
        success: false,
        error: 'missing_gender',
        message: 'Le champ "gender" est obligatoire'
      }, 400);
    }
    
    // Vérifier le cache
    const cacheKey = getCacheKey(body);
    console.log('[Preview V6] 🔑 Cache key:', cacheKey);
    
    const cached = getCachedPreview(cacheKey);
    if (cached) {
      const elapsed = Date.now() - startTime;
      console.log(`[Preview V6] ⚡ CACHE HIT (${elapsed}ms)`);
      return c.json({
        success: true,
        image_url: cached.image_url,
        provider: 'cache',
        seed: cached.seed,
        key: cacheKey,
        generation_time_ms: elapsed,
        cached: true
      });
    }
    
    console.log('[Preview V6] ❌ CACHE MISS - Generating new preview...');
    
    // Générer le prompt depuis les attributs
    const prompt = buildPromptFromAttributes(body);
    
    // Générer un seed aléatoire si non fourni
    const seed = body.seed || Math.floor(Math.random() * 1000000);
    
    // Aspect ratio
    const aspectRatio = body.aspect_ratio || '1:1';
    const [width, height] = aspectRatio === '3:4' ? [768, 1024] : [1024, 1024];
    
    // Appeler Pollinations AI
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true&enhance=true`;
    
    console.log('[Preview V6] 🎨 Calling Pollinations...');
    console.log('[Preview V6] URL:', pollinationsUrl.substring(0, 150) + '...');
    
    let pollinationsResponse;
    try {
      pollinationsResponse = await fetchPollinationsWithRetry(pollinationsUrl, 3, 3000);
    } catch (error: any) {
      console.error('[Preview V6] ❌ Pollinations failed:', error.message);
      return c.json({
        success: false,
        error: 'pollinations_failed',
        message: 'Service de génération indisponible. Réessayez dans quelques instants.',
        details: error.message
      }, 503);
    }
    
    if (!pollinationsResponse.ok) {
      console.error('[Preview V6] ❌ Pollinations returned', pollinationsResponse.status);
      return c.json({
        success: false,
        error: 'pollinations_error',
        message: 'Erreur lors de la génération de l\'image.',
        status: pollinationsResponse.status
      }, pollinationsResponse.status);
    }
    
    console.log('[Preview V6] ✅ Pollinations success');
    
    // Télécharger l'image
    const imageBuffer = await pollinationsResponse.arrayBuffer();
    console.log('[Preview V6] 📦 Downloaded image:', imageBuffer.byteLength, 'bytes');
    
    // Stocker dans Supabase Storage
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const filename = `preview_v6/${body.gender}/${timestamp}_${randomStr}.jpg`;
    
    console.log('[Preview V6] 💾 Uploading to Supabase Storage:', filename);
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('generated_images')
      .upload(filename, imageBuffer, {
        contentType: 'image/jpeg',
        upsert: false,
      });
    
    if (uploadError) {
      console.error('[Preview V6] ❌ Upload failed:', uploadError);
      return c.json({
        success: false,
        error: 'upload_failed',
        message: 'Échec de l\'upload de l\'image.',
        details: uploadError.message
      }, 500);
    }
    
    // Récupérer l'URL publique
    const { data: urlData } = supabase.storage
      .from('generated_images')
      .getPublicUrl(filename);
    
    if (!urlData?.publicUrl) {
      console.error('[Preview V6] ❌ No public URL');
      return c.json({
        success: false,
        error: 'no_public_url',
        message: 'Impossible d\'obtenir l\'URL publique.'
      }, 500);
    }
    
    const finalImageUrl = urlData.publicUrl;
    console.log('[Preview V6] ✅ Public URL:', finalImageUrl.substring(0, 100) + '...');
    
    // Mettre en cache
    setCachedPreview(cacheKey, finalImageUrl, seed);
    console.log('[Preview V6] 💾 Cached for future requests');
    
    const elapsed = Date.now() - startTime;
    console.log(`[Preview V6] ✅ COMPLETE (${elapsed}ms)`);
    
    return c.json({
      success: true,
      image_url: finalImageUrl,
      provider: 'pollinations',
      seed,
      key: cacheKey,
      generation_time_ms: elapsed,
      cached: false,
      prompt_length: prompt.length
    });
    
  } catch (error: any) {
    const elapsed = Date.now() - startTime;
    console.error('[Preview V6] ❌ Unexpected error:', error);
    return c.json({
      success: false,
      error: 'internal_error',
      message: 'Erreur interne du serveur.',
      details: error.message,
      generation_time_ms: elapsed
    }, 500);
  }
});

// Debug endpoint pour tester sans générer
app.get("/make-server-ab844084/v1/preview", (c) => {
  const debug = c.req.query('debug');
  
  if (debug) {
    return c.json({
      ok: true,
      service: 'Preview V6',
      status: 'ready',
      cache_size: previewCache.size,
      max_cache_size: MAX_CACHE_SIZE,
      cache_ttl_hours: CACHE_TTL_MS / (60 * 60 * 1000),
      message: 'Use POST method with attributes to generate preview images',
      required_fields: ['gender'],
      optional_fields: ['background', 'outfit', 'hairColor', 'hairLength', 'skinTone', 'eyeColor', 'mood', 'aspect_ratio', 'seed'],
      example_payload: {
        gender: 'woman',
        background: 'beach',
        outfit: 'summer dress',
        aspect_ratio: '1:1'
      }
    });
  }
  
  return c.json({
    ok: true,
    service: 'Preview V6',
    status: 'ready',
    message: 'Use POST /v1/preview to generate images. Add ?debug=1 for details.'
  });
});

// ========================================
// VIDEO FEATURES ENDPOINTS
// ========================================

// 1. Upload Signed URL - For object/decor/clothing uploads
app.post("/make-server-ab844084/upload-signed-url", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const body = await c.req.json();
    const { filename, contentType } = body;

    if (!filename) {
      return c.json({ success: false, error: 'Filename required' }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const ext = filename.split('.').pop() || 'jpg';
    const uniqueFilename = `uploads/${timestamp}_${randomStr}.${ext}`;

    // Create signed upload URL
    const { data: signedData, error: signedError } = await supabase.storage
      .from('generated_images')
      .createSignedUploadUrl(uniqueFilename);

    if (signedError) {
      console.error('Error creating signed URL:', signedError);
      return c.json({ success: false, error: signedError.message }, 500);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('generated_images')
      .getPublicUrl(uniqueFilename);

    return c.json({
      success: true,
      signedUrl: signedData.signedUrl,
      publicUrl: urlData.publicUrl
    });

  } catch (error: any) {
    console.error('Upload signed URL error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 2. Generate Video
app.post("/make-server-ab844084/generate-video", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const accessToken = authHeader.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user || authError) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { image_url, prompt } = body;

    if (!image_url || !prompt) {
      return c.json({ success: false, error: 'Missing image_url or prompt' }, 400);
    }

    // TODO: Integrate with video generation API (e.g., Runway, Stability AI Video, etc.)
    // For now, return a placeholder response
    
    console.log('[Video] Generating video for user:', user.id);
    console.log('[Video] Image URL:', image_url);
    console.log('[Video] Prompt:', prompt);

    // Simulate video generation (replace with real API call)
    const videoId = `video_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Store video metadata in KV store
    const videoMetadata = {
      id: videoId,
      user_id: user.id,
      source_image_url: image_url,
      prompt: prompt,
      video_url: `https://placeholder-video.com/${videoId}.mp4`, // Replace with real URL
      duration: 5,
      status: 'completed',
      created_at: new Date().toISOString()
    };

    await kv.set(`video:${user.id}:${videoId}`, videoMetadata);

    console.log('[Video] ✅ Video metadata saved');

    return c.json({
      success: true,
      video_id: videoId,
      video_url: videoMetadata.video_url,
      message: 'Video generated successfully'
    });

  } catch (error: any) {
    console.error('[Video] Generation error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 3. List Videos
app.get("/make-server-ab844084/videos", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const accessToken = authHeader.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user || authError) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    // Get all videos for this user from KV store
    const prefix = `video:${user.id}:`;
    const videos = await kv.getByPrefix(prefix);

    console.log('[Videos] Found', videos.length, 'videos for user', user.id);

    return c.json({
      success: true,
      videos: videos || []
    });

  } catch (error: any) {
    console.error('[Videos] List exception:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 4. Delete Video
app.delete("/make-server-ab844084/videos/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const videoId = c.req.param('id');
    const accessToken = authHeader.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user || authError) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    // Delete video metadata from KV store
    const key = `video:${user.id}:${videoId}`;
    await kv.del(key);

    console.log('[Videos] ✅ Video deleted:', videoId);

    return c.json({
      success: true,
      message: 'Video deleted successfully'
    });

  } catch (error: any) {
    console.error('[Videos] Delete exception:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ========================================
// GENERATED CONTENT ENDPOINTS
// ========================================

// GET /generated-images - Get all generated images for a user
app.get("/make-server-ab844084/generated-images", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    console.log('[Generated Images] Fetching for user:', user.id);

    // Get all generated images from KV store
    const prefix = `generated_image:${user.id}:`;
    const images = await kv.getByPrefix(prefix);

    console.log('[Generated Images] Found:', images.length);

    return c.json({
      success: true,
      images: images || []
    });

  } catch (error: any) {
    console.error('[Generated Images] Fetch exception:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// GET /generated-videos - Get all generated videos for a user
app.get("/make-server-ab844084/generated-videos", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    console.log('[Generated Videos] Fetching for user:', user.id);

    // Get all generated videos from KV store
    const prefix = `generated_video:${user.id}:`;
    const videos = await kv.getByPrefix(prefix);

    console.log('[Generated Videos] Found:', videos.length);

    return c.json({
      success: true,
      videos: videos || []
    });

  } catch (error: any) {
    console.error('[Generated Videos] Fetch exception:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST /save-generated-image - Save a generated image
app.post("/make-server-ab844084/save-generated-image", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const body = await c.req.json();
    const { imageData } = body;

    if (!imageData) {
      return c.json({ success: false, error: 'Image data required' }, 400);
    }

    const imageId = `img-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const key = `generated_image:${user.id}:${imageId}`;

    await kv.set(key, {
      ...imageData,
      id: imageId,
      userId: user.id,
      createdAt: new Date().toISOString()
    });

    console.log('[Generated Images] Saved:', imageId);

    return c.json({
      success: true,
      imageId,
      message: 'Image saved successfully'
    });

  } catch (error: any) {
    console.error('[Generated Images] Save exception:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST /save-generated-video - Save a generated video
app.post("/make-server-ab844084/save-generated-video", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Authorization required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const body = await c.req.json();
    const { videoData } = body;

    if (!videoData) {
      return c.json({ success: false, error: 'Video data required' }, 400);
    }

    const videoId = `video-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const key = `generated_video:${user.id}:${videoId}`;

    await kv.set(key, {
      ...videoData,
      id: videoId,
      userId: user.id,
      createdAt: new Date().toISOString()
    });

    console.log('[Generated Videos] Saved:', videoId);

    return c.json({
      success: true,
      videoId,
      message: 'Video saved successfully'
    });

  } catch (error: any) {
    console.error('[Generated Videos] Save exception:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ========================================
// V1 JOBS API - FIGMA ADMIN PLUGIN
// ========================================

/**
 * POST /v1/jobs - Create image generation job
 * Modes: text2img, img2img
 * Models: flux, gen4, gen4-turbo
 */
app.post("/make-server-ab844084/v1/jobs", async (c) => {
  try {
    console.log('[V1 Jobs] 📥 Create job request received');

    const body = await c.req.json();
    const {
      mode,
      model,
      prompt_final,
      aspect_ratio = '1:1',
      image_url, // Pour img2img
      prompt_strength = 0.65,
      seed
    } = body;

    // Validation
    if (!mode || !model || !prompt_final) {
      return c.json({
        ok: false,
        error: 'Missing required fields: mode, model, prompt_final'
      }, 422);
    }

    const validModes = ['text2img', 'img2img'];
    const validModels = ['flux', 'gen4', 'gen4-turbo'];

    if (!validModes.includes(mode)) {
      return c.json({
        ok: false,
        error: `Invalid mode. Must be one of: ${validModes.join(', ')}`
      }, 422);
    }

    if (!validModels.includes(model)) {
      return c.json({
        ok: false,
        error: `Invalid model. Must be one of: ${validModels.join(', ')}`
      }, 422);
    }

    if (mode === 'img2img' && !image_url) {
      return c.json({
        ok: false,
        error: 'image_url is required for img2img mode'
      }, 422);
    }

    // Generate unique job ID
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    console.log('[V1 Jobs] 🆔 Job ID:', jobId);
    console.log('[V1 Jobs] 📋 Parameters:', { mode, model, prompt_final, aspect_ratio });

    // Store job in KV with initial status
    const jobKey = `job:${jobId}`;
    await kv.set(jobKey, {
      id: jobId,
      status: 'queued',
      mode,
      model,
      prompt: prompt_final,
      aspect_ratio,
      image_url: mode === 'img2img' ? image_url : undefined,
      prompt_strength: mode === 'img2img' ? prompt_strength : undefined,
      seed,
      created_at: new Date().toISOString()
    });

    // Start generation process (non-blocking)
    processJob(jobId, {
      mode,
      model,
      prompt_final,
      aspect_ratio,
      image_url,
      prompt_strength,
      seed
    }).catch(err => {
      console.error(`[V1 Jobs] ❌ Job ${jobId} processing error:`, err);
    });

    return c.json({
      ok: true,
      job_id: jobId,
      status: 'queued'
    });

  } catch (error: any) {
    console.error('[V1 Jobs] ❌ Create job error:', error);
    return c.json({
      ok: false,
      error: error.message || 'Job creation failed'
    }, 500);
  }
});

/**
 * GET /v1/jobs/:id - Get job status
 */
app.get("/make-server-ab844084/v1/jobs/:jobId", async (c) => {
  try {
    const jobId = c.req.param('jobId');

    if (!jobId) {
      return c.json({
        ok: false,
        error: 'Job ID is required'
      }, 422);
    }

    const jobKey = `job:${jobId}`;
    const job = await kv.get(jobKey);

    if (!job) {
      return c.json({
        ok: false,
        error: 'Job not found'
      }, 404);
    }

    console.log(`[V1 Jobs] 📊 Status check for ${jobId}: ${job.status}`);

    return c.json({
      ok: true,
      status: job.status,
      image_url: job.image_url,
      error: job.error,
      progress: job.progress,
      created_at: job.created_at,
      completed_at: job.completed_at
    });

  } catch (error: any) {
    console.error('[V1 Jobs] ❌ Status check error:', error);
    return c.json({
      ok: false,
      error: error.message || 'Status check failed'
    }, 500);
  }
});

/**
 * Process job (async function)
 */
async function processJob(jobId: string, params: any) {
  const jobKey = `job:${jobId}`;
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    console.log(`[V1 Jobs] 🚀 Processing job ${jobId}...`);

    // Update status to running
    const job = await kv.get(jobKey);
    await kv.set(jobKey, { ...job, status: 'running', progress: 10 });

    let imageUrl: string;

    // ========================================
    // FLUX Generation (via Pollinations)
    // ========================================
    if (params.model === 'flux') {
      console.log(`[V1 Jobs] 🎨 Generating with FLUX...`);

      const pollinationsUrl = new URL('https://image.pollinations.ai/prompt/' + encodeURIComponent(params.prompt_final));
      pollinationsUrl.searchParams.set('width', '1024');
      pollinationsUrl.searchParams.set('height', '1024');
      pollinationsUrl.searchParams.set('model', 'flux');
      pollinationsUrl.searchParams.set('nologo', 'true');
      if (params.seed) pollinationsUrl.searchParams.set('seed', String(params.seed));

      await kv.set(jobKey, { ...job, status: 'running', progress: 30 });

      // Download from Pollinations with retry
      const response = await fetchWithRetry(pollinationsUrl.toString(), {}, 5, 4000);

      if (!response.ok) {
        throw new Error(`Pollinations API error: ${response.status}`);
      }

      const imageBuffer = await response.arrayBuffer();
      await kv.set(jobKey, { ...job, status: 'running', progress: 60 });

      // Upload to Supabase Storage
      const today = new Date().toISOString().split('T')[0];
      const filename = `${jobId}.jpg`;
      const storagePath = `outputs/${today}/${filename}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('photos')
        .upload(storagePath, imageBuffer, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from('photos')
        .getPublicUrl(storagePath);

      imageUrl = publicUrlData.publicUrl;

      console.log(`[V1 Jobs] ✅ FLUX image stored: ${imageUrl}`);
    }

    // ========================================
    // Gen-4 / Gen-4 Turbo (via Replicate)
    // ========================================
    else if (params.model === 'gen4' || params.model === 'gen4-turbo') {
      console.log(`[V1 Jobs] 🎬 Generating with ${params.model.toUpperCase()}...`);

      const replicateModel = params.model === 'gen4' 
        ? 'runwayml/gen4-image' 
        : 'runwayml/gen4-image-turbo';

      const replicateInput: any = {
        prompt: params.prompt_final,
        aspect_ratio: params.aspect_ratio,
        output_format: 'jpg'
      };

      if (params.mode === 'img2img' && params.image_url) {
        replicateInput.image = params.image_url;
        replicateInput.prompt_strength = params.prompt_strength ?? 0.65;
      }

      if (params.seed) {
        replicateInput.seed = params.seed;
      }

      await kv.set(jobKey, { ...job, status: 'running', progress: 20 });

      // Call Replicate
      const REPLICATE_API_TOKEN = Deno.env.get('REPLICATE_API_TOKEN');
      if (!REPLICATE_API_TOKEN) {
        throw new Error('REPLICATE_API_TOKEN not configured');
      }

      const predictionRes = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          version: replicateModel,
          input: replicateInput
        })
      });

      if (!predictionRes.ok) {
        const errorText = await predictionRes.text();
        throw new Error(`Replicate API error: ${predictionRes.status} - ${errorText}`);
      }

      const prediction = await predictionRes.json();
      const predictionId = prediction.id;

      console.log(`[V1 Jobs] 🔄 Replicate prediction started: ${predictionId}`);

      // Poll Replicate for completion
      let finalPrediction: any = null;
      let attempts = 0;
      const maxAttempts = 60; // 3 minutes max

      while (attempts < maxAttempts) {
        await new Promise(r => setTimeout(r, 3000)); // Wait 3s between polls
        attempts++;

        const statusRes = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
          headers: {
            'Authorization': `Bearer ${REPLICATE_API_TOKEN}`
          }
        });

        if (!statusRes.ok) {
          console.warn(`[V1 Jobs] ⚠️ Replicate poll failed: ${statusRes.status}`);
          continue;
        }

        const statusData = await statusRes.json();
        const progress = Math.min(30 + (attempts * 60 / maxAttempts), 90);
        await kv.set(jobKey, { ...job, status: 'running', progress: Math.floor(progress) });

        if (statusData.status === 'succeeded') {
          finalPrediction = statusData;
          break;
        }

        if (statusData.status === 'failed' || statusData.status === 'canceled') {
          throw new Error(`Replicate prediction ${statusData.status}: ${statusData.error || 'Unknown error'}`);
        }
      }

      if (!finalPrediction || !finalPrediction.output) {
        throw new Error('Replicate prediction timeout or no output');
      }

      const replicateImageUrl = Array.isArray(finalPrediction.output) 
        ? finalPrediction.output[0] 
        : finalPrediction.output;

      console.log(`[V1 Jobs] 📥 Downloading from Replicate...`);

      // Download and re-upload to Supabase
      const imageRes = await fetch(replicateImageUrl);
      if (!imageRes.ok) {
        throw new Error(`Failed to download Replicate image: ${imageRes.status}`);
      }

      const imageBuffer = await imageRes.arrayBuffer();

      const today = new Date().toISOString().split('T')[0];
      const filename = `${jobId}.jpg`;
      const storagePath = `outputs/${today}/${filename}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('photos')
        .upload(storagePath, imageBuffer, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from('photos')
        .getPublicUrl(storagePath);

      imageUrl = publicUrlData.publicUrl;

      console.log(`[V1 Jobs] ✅ ${params.model.toUpperCase()} image stored: ${imageUrl}`);
    } else {
      throw new Error(`Unknown model: ${params.model}`);
    }

    // Update job status to succeeded
    await kv.set(jobKey, {
      ...job,
      status: 'succeeded',
      progress: 100,
      image_url: imageUrl,
      completed_at: new Date().toISOString()
    });

    console.log(`[V1 Jobs] ✅ Job ${jobId} completed successfully`);

  } catch (error: any) {
    console.error(`[V1 Jobs] ❌ Job ${jobId} failed:`, error);

    const job = await kv.get(jobKey);
    await kv.set(jobKey, {
      ...job,
      status: 'failed',
      error: error.message || 'Unknown error',
      completed_at: new Date().toISOString()
    });
  }
}

// ========================================
// STORAGE SIGNED UPLOAD ENDPOINT
// ========================================

/**
 * POST /storage-signed-upload
 * Generate signed URL for direct upload to Supabase Storage
 */
app.post("/make-server-ab844084/storage-signed-upload", async (c) => {
  try {
    const body = await c.req.json();
    const { filename, contentType, bucket = 'uploads' } = body;

    if (!filename || !contentType) {
      return c.json({
        ok: false,
        error: 'filename and contentType are required'
      }, 422);
    }

    const allowedBuckets = ['uploads', 'photos', 'ai-models'];
    if (!allowedBuckets.includes(bucket)) {
      return c.json({
        ok: false,
        error: `Invalid bucket. Must be one of: ${allowedBuckets.join(', ')}`
      }, 422);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Generate unique filename
    const timestamp = Date.now();
    const safeName = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFilename = `${timestamp}-${safeName}`;

    // Create signed upload URL (5 min expiration)
    const { data: signedData, error: signedError } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(uniqueFilename);

    if (signedError) {
      console.error('[Signed Upload] Error:', signedError);
      return c.json({
        ok: false,
        error: signedError.message
      }, 500);
    }

    if (!signedData?.signedUrl) {
      return c.json({
        ok: false,
        error: 'Failed to generate signed URL'
      }, 500);
    }

    // Build public URL
    const projectId = Deno.env.get('SUPABASE_URL')?.split('//')[1]?.split('.')[0];
    const publicUrl = `https://${projectId}.supabase.co/storage/v1/object/public/${bucket}/${uniqueFilename}`;

    console.log('[Signed Upload] ✅ Created:', { bucket, filename: uniqueFilename });

    return c.json({
      ok: true,
      signedUrl: signedData.signedUrl,
      publicUrl,
      path: uniqueFilename,
      bucket
    });

  } catch (error: any) {
    console.error('[Signed Upload] ❌ Error:', error);
    return c.json({
      ok: false,
      error: error.message || 'Signed upload failed'
    }, 500);
  }
});

// ========================================
// CATEGORY IMAGES GENERATION (Admin Tool)
// ========================================

// Idempotency cache (in-memory, resets on server restart)
const idempotencyCache = new Map<string, { success: boolean; image_url?: string; error?: string; timestamp: number }>();

// Clean old cache entries (older than 1 hour)
setInterval(() => {
  const oneHourAgo = Date.now() - 3600000;
  for (const [key, value] of idempotencyCache.entries()) {
    if (value.timestamp < oneHourAgo) {
      idempotencyCache.delete(key);
    }
  }
}, 600000); // Every 10 minutes

// Global state for generation progress (in-memory, resets on restart)
let generationState = {
  isGenerating: false,
  currentCategory: '',
  currentCategoryName: '',
  totalCategories: 0,
  completedCategories: 0,
  currentBatch: 0,
  totalBatches: 0,
  succeeded: 0,
  failed: 0,
  totalImages: 0,
  startTime: 0,
  shouldStop: false,
  newLogs: [] as string[]
};

// Helper: Convert aspect ratio to dimensions
function convertAspectRatio(aspectRatio: string = "1:1"): { width: number; height: number } {
  const ratios: Record<string, { width: number; height: number }> = {
    "1:1": { width: 1024, height: 1024 },
    "4:5": { width: 1024, height: 1280 },
    "9:16": { width: 768, height: 1344 },
    "16:9": { width: 1344, height: 768 }
  };
  return ratios[aspectRatio] || ratios["1:1"];
}

// Helper: Generate single image via Pollinations
async function generateCategoryImage(params: {
  categoryId: string;
  title: string;
  prompt: string;
  width: number;
  height: number;
  index: number;
}): Promise<{ success: boolean; url?: string; error?: string }> {
  const { categoryId, prompt, width, height, index } = params;
  
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Generate via Pollinations with retry
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?` +
      `model=flux&width=${width}&height=${height}&private=true&enhance=true&nologo=true`;

    const response = await fetchPollinationsWithRetry(pollinationsUrl, 3, 4000);
    
    if (!response.ok) {
      throw new Error(`Pollinations failed: ${response.status}`);
    }

    // Get image bytes
    const bytes = new Uint8Array(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // Determine extension
    const ext = contentType.includes('png') ? 'png' 
              : contentType.includes('webp') ? 'webp' 
              : 'jpg';

    // Upload to Supabase Storage (ai_gallery bucket, categories/ folder)
    const keyPath = `categories/${categoryId}/${String(index).padStart(2, '0')}.${ext}`;
    
    const { error: uploadError } = await supabase.storage
      .from('ai_gallery')
      .upload(keyPath, bytes, {
        contentType,
        upsert: true,
        cacheControl: '31536000'
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('ai_gallery')
      .getPublicUrl(keyPath);

    const imageUrl = urlData.publicUrl;

    // Save to ideas_examples table
    const slug = `${categoryId}-${String(index).padStart(2, '0')}`;
    
    await supabase.from('ideas_examples').insert({
      slug,
      image_url: imageUrl,
      provider: 'pollinations',
      bucket: 'ai_gallery',
      key_path: keyPath,
      prompt_title: params.title,
      prompt_text: prompt,
      category_id: categoryId,
      prompt_index: index,
      aspect_ratio: `${width}:${height}`,
      created_at: new Date().toISOString()
    });

    return { success: true, url: imageUrl };
    
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ========================================
// IDEMPOTENT SINGLE IMAGE GENERATION
// ========================================

// POST /ideas/generate - Generate single image with idempotency
app.post("/make-server-ab844084/ideas/generate", async (c) => {
  try {
    const body = await c.req.json();
    const {
      slug,
      category_id,
      style = 'default',
      prompt_title,
      prompt_text,
      prompt,
      aspect_ratio = '4:5',
      width,
      height,
      persist = true,
      collection = 'front-catalog',
      prompt_index = 0
    } = body;

    // Validate required fields
    if (!slug || !category_id || !prompt_text) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields: slug, category_id, prompt_text' 
      }, 400);
    }

    // Get idempotency key from header
    const idempotencyKey = c.req.header('idempotency-key');
    if (!idempotencyKey) {
      return c.json({ 
        success: false, 
        error: 'Missing idempotency-key header' 
      }, 400);
    }

    // Check cache
    const cached = idempotencyCache.get(idempotencyKey);
    if (cached) {
      console.log(`[Ideas] ✅ Cache hit for key: ${idempotencyKey}`);
      return c.json({ 
        success: cached.success, 
        image_url: cached.image_url,
        error: cached.error,
        cached: true
      });
    }

    console.log(`[Ideas] 🎨 Generating new image for: ${slug} (${idempotencyKey})`);

    // Determine dimensions
    const finalWidth = width || 1536;
    const finalHeight = height || 1536;

    // Use prompt_text as the actual prompt
    const finalPrompt = prompt_text || prompt;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Generate via Pollinations with retry
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?` +
      `model=flux&width=${finalWidth}&height=${finalHeight}&private=true&enhance=true&nologo=true`;

    console.log(`[Ideas] 🔄 Pollinations URL: ${pollinationsUrl.substring(0, 150)}...`);

    let response;
    let lastError = '';
    
    // Retry up to 3 times (total attempts)
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await fetchPollinationsWithRetry(pollinationsUrl, 2, 5000);
        if (response.ok) break;
        lastError = `HTTP ${response.status}`;
      } catch (error: any) {
        lastError = error.message;
        console.warn(`[Ideas] ⚠️  Attempt ${attempt}/3 failed: ${lastError}`);
        if (attempt < 3) {
          await new Promise(resolve => setTimeout(resolve, attempt === 1 ? 600 : 1200));
        }
      }
    }

    if (!response || !response.ok) {
      const errorMsg = `Pollinations failed after 3 attempts: ${lastError}`;
      idempotencyCache.set(idempotencyKey, { 
        success: false, 
        error: errorMsg, 
        timestamp: Date.now() 
      });
      return c.json({ success: false, error: errorMsg }, 500);
    }

    // Get image bytes
    const bytes = new Uint8Array(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    console.log(`[Ideas] ✅ Image received: ${bytes.length} bytes, type: ${contentType}`);

    // Validate image size (minimum 50KB to avoid broken images)
    if (bytes.length < 50000) {
      const errorMsg = `Image too small (${bytes.length} bytes), likely broken`;
      console.warn(`[Ideas] ⚠️  ${errorMsg}`);
      idempotencyCache.set(idempotencyKey, { 
        success: false, 
        error: errorMsg, 
        timestamp: Date.now() 
      });
      return c.json({ success: false, error: errorMsg }, 500);
    }

    // Determine extension
    const ext = contentType.includes('png') ? 'png' 
              : contentType.includes('webp') ? 'webp' 
              : 'jpg';

    // Upload to Supabase Storage (ai_gallery bucket)
    const keyPath = `categories/${category_id}/${String(prompt_index).padStart(2, '0')}-${style}.${ext}`;
    
    console.log(`[Ideas] 📤 Uploading to: ${keyPath}`);

    const { error: uploadError } = await supabase.storage
      .from('ai_gallery')
      .upload(keyPath, bytes, {
        contentType,
        upsert: true,
        cacheControl: '31536000'
      });

    if (uploadError) {
      const errorMsg = `Upload failed: ${uploadError.message}`;
      idempotencyCache.set(idempotencyKey, { 
        success: false, 
        error: errorMsg, 
        timestamp: Date.now() 
      });
      return c.json({ success: false, error: errorMsg }, 500);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('ai_gallery')
      .getPublicUrl(keyPath);

    const imageUrl = urlData.publicUrl;
    console.log(`[Ideas] ✅ Public URL: ${imageUrl}`);

    // Save to ideas_examples table if persist is true
    if (persist) {
      await supabase.from('ideas_examples').insert({
        slug: `${slug}-${style}-${String(prompt_index).padStart(2, '0')}`,
        image_url: imageUrl,
        provider: 'pollinations',
        bucket: 'ai_gallery',
        key_path: keyPath,
        prompt_title: prompt_title || slug,
        prompt_text: finalPrompt,
        category_id: category_id,
        prompt_index: prompt_index,
        aspect_ratio: aspect_ratio,
        style: style,
        collection: collection,
        created_at: new Date().toISOString()
      });
      console.log(`[Ideas] 💾 Saved to ideas_examples`);
    }

    // Cache success
    const result = { success: true, image_url: imageUrl };
    idempotencyCache.set(idempotencyKey, { 
      ...result, 
      timestamp: Date.now() 
    });

    console.log(`[Ideas] 🎉 Generation complete for: ${idempotencyKey}`);

    return c.json(result);

  } catch (error: any) {
    console.error('[Ideas] Generate error:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// POST /categories/generate - Start generation
app.post("/make-server-ab844084/categories/generate", async (c) => {
  try {
    if (generationState.isGenerating) {
      return c.json({ 
        success: false, 
        error: 'Generation already in progress' 
      }, 400);
    }

    const body = await c.req.json();
    const { categories = [], testMode = false } = body;

    if (categories.length === 0) {
      return c.json({ 
        success: false, 
        error: 'No categories specified' 
      }, 400);
    }

    // Reset state
    generationState = {
      isGenerating: true,
      currentCategory: '',
      currentCategoryName: '',
      totalCategories: categories.length,
      completedCategories: 0,
      currentBatch: 0,
      totalBatches: 0,
      succeeded: 0,
      failed: 0,
      totalImages: 0,
      startTime: Date.now(),
      shouldStop: false,
      newLogs: ['🚀 Starting generation...']
    };

    // Start async generation (don't await)
    (async () => {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      );

      for (let catIdx = 0; catIdx < categories.length; catIdx++) {
        if (generationState.shouldStop) break;

        const categoryId = categories[catIdx];
        
        // Load category data
        const categoryData = getCategoryData(categoryId);
        if (!categoryData) {
          generationState.newLogs.push(`⚠️ Category ${categoryId} not found, skipping...`);
          continue;
        }
        
        generationState.currentCategory = categoryId;
        generationState.currentCategoryName = categoryData.name;
        generationState.newLogs.push(`\n📂 [${catIdx + 1}/${categories.length}] Starting ${categoryData.name} (${categoryId})`);

        // Get prompts (limit to 5 in test mode)
        const prompts = testMode 
          ? categoryData.promptTemplates.slice(0, 5)
          : categoryData.promptTemplates;

        generationState.totalImages += prompts.length;
        const batchSize = 3;
        generationState.totalBatches = Math.ceil(prompts.length / batchSize);

        // Generate in batches
        for (let i = 0; i < prompts.length; i += batchSize) {
          if (generationState.shouldStop) break;

          const batch = prompts.slice(i, i + batchSize);
          generationState.currentBatch = Math.floor(i / batchSize) + 1;
          
          generationState.newLogs.push(`📦 Batch ${generationState.currentBatch}/${generationState.totalBatches}`);

          const batchPromises = batch.map(async (p, batchIdx) => {
            const globalIdx = i + batchIdx;
            const { width, height } = convertAspectRatio(p.aspectRatio);
            
            const result = await generateCategoryImage({
              categoryId,
              title: p.title,
              prompt: p.prompt,
              width,
              height,
              index: globalIdx
            });

            if (result.success) {
              generationState.succeeded++;
              generationState.newLogs.push(`   ✅ [${globalIdx}] ${p.title}`);
            } else {
              generationState.failed++;
              generationState.newLogs.push(`   ❌ [${globalIdx}] ${p.title}: ${result.error}`);
            }

            return result;
          });

          await Promise.all(batchPromises);

          // Delay between batches
          if (i + batchSize < prompts.length) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }

        generationState.completedCategories++;
        generationState.newLogs.push(`✅ ${categoryId} completed`);

        // Delay between categories
        if (catIdx < categories.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }

      // Finished
      generationState.isGenerating = false;
      generationState.newLogs.push(
        `\n🎉 GENERATION COMPLETE`,
        `   Total: ${generationState.succeeded + generationState.failed}`,
        `   Succeeded: ${generationState.succeeded}`,
        `   Failed: ${generationState.failed}`
      );
    })();

    return c.json({ 
      success: true, 
      message: 'Generation started',
      categories: categories.length
    });

  } catch (error: any) {
    console.error('[Categories] Generate error:', error);
    generationState.isGenerating = false;
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// GET /categories/status - Get current status
app.get("/make-server-ab844084/categories/status", (c) => {
  const newLogs = [...generationState.newLogs];
  generationState.newLogs = []; // Clear logs after sending

  return c.json({
    ...generationState,
    newLogs
  });
});

// POST /categories/stop - Stop generation
app.post("/make-server-ab844084/categories/stop", (c) => {
  generationState.shouldStop = true;
  generationState.newLogs.push('⚠️ Stop requested...');
  
  return c.json({ 
    success: true, 
    message: 'Stop signal sent' 
  });
});

// ========================================
// USER GENERATION ENDPOINTS (Vercel API Integration)
// ========================================

/**
 * POST /storage-signed-upload - Get signed URL for uploading images
 * Used for uploading reference images (selfies, models, scenes, etc.)
 */
app.post("/make-server-ab844084/storage-signed-upload", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        ok: false,
        error: 'Missing or invalid Authorization header'
      }, 401);
    }

    const accessToken = authHeader.substring(7);
    
    // Verify user with access token
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      console.error('[Storage Upload] Auth error:', authError);
      return c.json({
        ok: false,
        error: 'Invalid or expired token'
      }, 401);
    }

    const body = await c.req.json();
    const { filename, contentType = 'image/jpeg' } = body;

    if (!filename) {
      return c.json({
        ok: false,
        error: 'filename is required'
      }, 422);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const fileExt = filename.split('.').pop() || 'jpg';
    const uniqueFilename = `${user.id}/${timestamp}_${randomStr}.${fileExt}`;
    const storagePath = `user-uploads/${uniqueFilename}`;

    // Create signed upload URL (valid for 60 minutes)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('photos')
      .createSignedUploadUrl(storagePath);

    if (signedUrlError) {
      console.error('[Storage Upload] Signed URL error:', signedUrlError);
      return c.json({
        ok: false,
        error: 'Failed to create upload URL'
      }, 500);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('photos')
      .getPublicUrl(storagePath);

    console.log('[Storage Upload] ✅ Signed URL created for user:', user.id);

    return c.json({
      ok: true,
      upload_url: signedUrlData.signedUrl,
      public_url: publicUrl,
      path: storagePath
    });

  } catch (error: any) {
    console.error('[Storage Upload] ❌ Error:', error);
    return c.json({
      ok: false,
      error: error.message || 'Upload URL creation failed'
    }, 500);
  }
});

/**
 * POST /user/v1/jobs - User image generation (proxy to Vercel API)
 * Manages credits, auth, and forwards to external Vercel endpoint
 */
app.post("/make-server-ab844084/user/v1/jobs", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        ok: false,
        error: 'Missing or invalid Authorization header'
      }, 401);
    }

    const accessToken = authHeader.substring(7);
    
    // Verify user
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({
        ok: false,
        error: 'Invalid or expired token'
      }, 401);
    }

    const body = await c.req.json();
    const {
      mode,
      model,
      prompt_final,
      image_url,
      aspect_ratio = '4:5',
      prompt_strength = 0.65,
      guidance = 3.5,
      seed,
      negative_prompt,
      test_mode = false
    } = body;

    // Validation
    if (!mode || !model || !prompt_final) {
      return c.json({
        ok: false,
        error: 'Missing required fields: mode, model, prompt_final'
      }, 422);
    }

    if (mode === 'img2img' && !image_url) {
      return c.json({
        ok: false,
        error: 'image_url is required for img2img mode'
      }, 422);
    }

    // Determine credit cost based on model
    const creditCost = getCreditCost(model);
    console.log(`[User Jobs] 💰 Credit cost for model '${model}': ${creditCost} credits`);

    // Check credits
    const { data: creditsData, error: creditsError } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single();

    if (creditsError || !creditsData || creditsData.credits < creditCost) {
      return c.json({
        ok: false,
        error: `Insufficient credits. This generation requires ${creditCost} credits. Please purchase more credits.`,
        required_credits: creditCost,
        available_credits: creditsData?.credits || 0
      }, 402);
    }

    // Debit credits based on model
    const { error: debitError } = await supabase
      .from('user_credits')
      .update({ credits: creditsData.credits - creditCost })
      .eq('user_id', user.id);

    if (debitError) {
      console.error('[User Jobs] ❌ Credit debit error:', debitError);
      return c.json({
        ok: false,
        error: 'Failed to debit credits'
      }, 500);
    }

    console.log(`[User Jobs] 💳 Debited ${creditCost} credit(s) from user ${user.id}. Remaining: ${creditsData.credits - creditCost}`);

    // Get Idempotency-Key from headers
    const idempotencyKey = c.req.header('Idempotency-Key') || `${user.id}_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Forward request to Vercel API
    const vercelApiUrl = 'https://image-generator-api-chi.vercel.app/v1/jobs';
    
    console.log(`[User Jobs] 🚀 Forwarding to Vercel API: ${mode} / ${model}`);

    const vercelResponse = await fetch(vercelApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Idempotency-Key': idempotencyKey
      },
      body: JSON.stringify({
        mode,
        model,
        prompt_final,
        image_url,
        aspect_ratio,
        prompt_strength,
        guidance,
        seed,
        negative_prompt,
        test_mode
      }),
      signal: AbortSignal.timeout(120000) // 120s timeout
    });

    const vercelData = await vercelResponse.json();

    if (!vercelResponse.ok) {
      console.error('[User Jobs] ❌ Vercel API error:', vercelData);
      
      // Refund credits on failure
      await supabase
        .from('user_credits')
        .update({ credits: creditsData.credits })
        .eq('user_id', user.id);

      console.log(`[User Jobs] 💰 ${creditCost} credit(s) refunded due to API error`);

      return c.json({
        ok: false,
        error: vercelData.error || 'Generation failed'
      }, vercelResponse.status);
    }

    console.log('[User Jobs] ✅ Generation successful');

    // Return the response from Vercel API
    return c.json(vercelData);

  } catch (error: any) {
    console.error('[User Jobs] ❌ Error:', error);
    return c.json({
      ok: false,
      error: error.message || 'Job creation failed'
    }, 500);
  }
});

/**
 * GET /user/v1/jobs/:jobId - Check job status (proxy to Vercel API)
 * Used for polling queued jobs
 */
app.get("/make-server-ab844084/user/v1/jobs/:jobId", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        ok: false,
        error: 'Missing or invalid Authorization header'
      }, 401);
    }

    const accessToken = authHeader.substring(7);
    const jobId = c.req.param('jobId');

    if (!jobId) {
      return c.json({
        ok: false,
        error: 'Missing job ID'
      }, 400);
    }
    
    // Verify user (optional but recommended for security)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({
        ok: false,
        error: 'Invalid or expired token'
      }, 401);
    }

    console.log(`[Job Status] 🔍 Checking job ${jobId} for user ${user.id}`);

    // Forward request to Vercel API
    const vercelApiUrl = `https://image-generator-api-chi.vercel.app/v1/jobs/${jobId}`;
    
    const vercelResponse = await fetch(vercelApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      signal: AbortSignal.timeout(30000) // 30s timeout
    });

    const vercelData = await vercelResponse.json();

    if (!vercelResponse.ok) {
      console.error('[Job Status] ❌ Vercel API error:', vercelData);
      return c.json({
        ok: false,
        error: vercelData.error || 'Failed to fetch job status'
      }, vercelResponse.status);
    }

    console.log(`[Job Status] ✅ Job ${jobId} status: ${vercelData.status}`);

    // Return the response from Vercel API
    return c.json(vercelData);

  } catch (error: any) {
    console.error('[Job Status] ❌ Error:', error);
    return c.json({
      ok: false,
      error: error.message || 'Failed to fetch job status'
    }, 500);
  }
});

/**
 * POST /user/generate-sora2 - User video generation (proxy to Vercel API)
 * Manages credits, auth, and forwards to external Vercel endpoint
 */
app.post("/make-server-ab844084/user/generate-sora2", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        ok: false,
        error: 'Missing or invalid Authorization header'
      }, 401);
    }

    const accessToken = authHeader.substring(7);
    
    // Verify user
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({
        ok: false,
        error: 'Invalid or expired token'
      }, 401);
    }

    const body = await c.req.json();
    const {
      mode,
      prompt,
      aspect_ratio = 'portrait',
      n_frames = 10,
      size = 'standard',
      remove_watermark = false,
      image_urls = []
    } = body;

    // Validation
    if (!mode || !prompt) {
      return c.json({
        ok: false,
        error: 'Missing required fields: mode, prompt'
      }, 422);
    }

    if (mode === 'image2video' && (!image_urls || image_urls.length === 0)) {
      return c.json({
        ok: false,
        error: 'image_urls is required for image2video mode'
      }, 422);
    }

    // Check credits (deduct 5 credits per video generation)
    const videoCreditCost = 5;
    const { data: creditsData, error: creditsError } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single();

    if (creditsError || !creditsData || creditsData.credits < videoCreditCost) {
      return c.json({
        ok: false,
        error: `Insufficient credits. Video generation requires ${videoCreditCost} credits.`
      }, 402);
    }

    // Debit credits
    const { error: debitError } = await supabase
      .from('user_credits')
      .update({ credits: creditsData.credits - videoCreditCost })
      .eq('user_id', user.id);

    if (debitError) {
      console.error('[User Video] ❌ Credit debit error:', debitError);
      return c.json({
        ok: false,
        error: 'Failed to debit credits'
      }, 500);
    }

    console.log(`[User Video] 💳 Debited ${videoCreditCost} credits from user ${user.id}. Remaining: ${creditsData.credits - videoCreditCost}`);

    // Get Idempotency-Key from headers
    const idempotencyKey = c.req.header('Idempotency-Key') || `${user.id}_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Forward request to Vercel API
    const vercelApiUrl = 'https://image-generator-api-chi.vercel.app/api/generate-sora2';
    
    console.log(`[User Video] 🚀 Forwarding to Vercel API: ${mode}`);

    const vercelResponse = await fetch(vercelApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Idempotency-Key': idempotencyKey
      },
      body: JSON.stringify({
        mode,
        prompt,
        aspect_ratio,
        n_frames,
        size,
        remove_watermark,
        image_urls
      }),
      signal: AbortSignal.timeout(180000) // 180s timeout for video
    });

    const vercelData = await vercelResponse.json();

    if (!vercelResponse.ok) {
      console.error('[User Video] ❌ Vercel API error:', vercelData);
      
      // Refund credits on failure
      await supabase
        .from('user_credits')
        .update({ credits: creditsData.credits })
        .eq('user_id', user.id);

      console.log('[User Video] 💰 Credits refunded due to API error');

      return c.json({
        ok: false,
        error: vercelData.error || 'Video generation failed'
      }, vercelResponse.status);
    }

    console.log('[User Video] ✅ Video generation initiated');

    // Return the response from Vercel API
    return c.json(vercelData);

  } catch (error: any) {
    console.error('[User Video] ❌ Error:', error);
    return c.json({
      ok: false,
      error: error.message || 'Video generation failed'
    }, 500);
  }
});

// ========================================
// START SERVER
// ========================================

Deno.serve(app.fetch);
