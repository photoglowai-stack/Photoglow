/**
 * API Route: Replicate Webhook
 * 
 * Receives webhook events from Replicate when training completes/fails
 * Updates model status in Supabase
 */

import { createClient } from '@supabase/supabase-js@2.47.10';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, status, output, error: replicateError } = req.body;

  console.log('🔔 Webhook received:', {
    id,
    status,
    has_output: !!output,
    has_error: !!replicateError,
  });

  if (!id) {
    return res.status(400).json({ error: 'id is required' });
  }

  try {
    // Initialize Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Find model by replicate_model_id
    const { data: model, error: findError } = await supabase
      .from('models')
      .select('*')
      .eq('replicate_model_id', id)
      .single();

    if (findError || !model) {
      console.error('❌ Model not found:', id);
      return res.status(404).json({ error: 'Model not found' });
    }

    console.log('📦 Found model:', model.id, model.name);

    // Determine new status
    let newStatus = 'training';
    
    if (status === 'succeeded' || status === 'completed') {
      newStatus = 'ready';
    } else if (status === 'failed' || status === 'canceled') {
      newStatus = 'failed';
    } else if (status === 'starting') {
      newStatus = 'training';
    }

    // Extract version from output if available
    let versionId = model.replicate_version_id;
    if (output && output.version) {
      versionId = output.version;
    }

    // Update model in Supabase
    const { error: updateError } = await supabase
      .from('models')
      .update({
        status: newStatus,
        replicate_version_id: versionId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', model.id);

    if (updateError) {
      console.error('❌ Failed to update model:', updateError);
      return res.status(500).json({ error: 'Failed to update model' });
    }

    console.log(`✅ Model ${model.id} updated to status: ${newStatus}`);

    // Log the event
    await supabase.from('model_training_logs').insert({
      model_id: model.id,
      status: newStatus,
      replicate_status: status,
      error_message: replicateError || null,
      metadata: {
        output,
        timestamp: new Date().toISOString(),
      }
    }).then(({ error }) => {
      if (error) console.warn('⚠️ Failed to log event:', error);
    });

    return res.status(200).json({
      success: true,
      model_id: model.id,
      old_status: model.status,
      new_status: newStatus,
    });

  } catch (error: any) {
    console.error('❌ Webhook error:', error);
    return res.status(500).json({
      error: error.message || 'Webhook processing failed',
    });
  }
}

// Disable body parsing to get raw body for webhook verification if needed
export const config = {
  api: {
    bodyParser: true,
  },
};
