import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/storage-signed-upload
 * 
 * Génère une signed URL pour upload direct vers Supabase Storage
 * Utilisé par le plugin Figma pour uploader les images d'entrée
 * 
 * Body: { filename: string, contentType: string, bucket: string }
 * Returns: { signedUrl: string, publicUrl: string }
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS pour Figma (Origin: null)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'null');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization');
    return res.status(204).end();
  }

  // Headers CORS pour toutes les réponses
  res.setHeader('Access-Control-Allow-Origin', 'null');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  try {
    const { filename, contentType, bucket } = req.body || {};

    // Validation
    if (!filename || !contentType || !bucket) {
      return res.status(422).json({ 
        ok: false, 
        error: 'invalid_payload',
        message: 'filename, contentType, and bucket are required' 
      });
    }

    // Valider le bucket (sécurité)
    const allowedBuckets = ['uploads', 'photos', 'ai-models'];
    if (!allowedBuckets.includes(bucket)) {
      return res.status(422).json({ 
        ok: false, 
        error: 'invalid_bucket',
        message: `Bucket must be one of: ${allowedBuckets.join(', ')}` 
      });
    }

    // Créer client Supabase avec service role key
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials');
      return res.status(500).json({ 
        ok: false, 
        error: 'server_config_error',
        message: 'Supabase credentials not configured' 
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Générer un nom de fichier unique avec timestamp
    const timestamp = Date.now();
    const safeName = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFilename = `${timestamp}-${safeName}`;
    const path = `${uniqueFilename}`;

    // Créer une signed URL pour upload (expiration 5 minutes)
    const { data: signedData, error: signedError } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(path);

    if (signedError) {
      console.error('Signed URL creation error:', signedError);
      return res.status(500).json({ 
        ok: false, 
        error: 'signed_url_creation_failed',
        message: signedError.message 
      });
    }

    if (!signedData?.signedUrl) {
      return res.status(500).json({ 
        ok: false, 
        error: 'no_signed_url',
        message: 'Failed to generate signed URL' 
      });
    }

    // Construire l'URL publique
    // Format: https://{project}.supabase.co/storage/v1/object/public/{bucket}/{path}
    const projectId = supabaseUrl.split('//')[1].split('.')[0];
    const publicUrl = `https://${projectId}.supabase.co/storage/v1/object/public/${bucket}/${path}`;

    console.log('[Signed Upload] ✅ Created for:', {
      bucket,
      filename: uniqueFilename,
      contentType
    });

    return res.status(200).json({
      ok: true,
      signedUrl: signedData.signedUrl,
      publicUrl,
      path,
      bucket
    });

  } catch (error: any) {
    console.error('[Signed Upload] ❌ Error:', error);
    return res.status(500).json({ 
      ok: false, 
      error: 'internal_error',
      message: error.message || 'Unknown error' 
    });
  }
}
