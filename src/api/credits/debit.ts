// POST /api/credits/debit
// Debits credits from user account using auth token

import { createClient } from '@supabase/supabase-js@2.47.10';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // Enable CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed. Use POST.' }),
      { status: 405, headers }
    );
  }

  try {
    // Extract token from Authorization header
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Authorization token required' }),
        { status: 401, headers }
      );
    }

    const body = await req.json();
    const { amount } = body;

    // Validation

    if (!amount || typeof amount !== 'number') {
      return new Response(
        JSON.stringify({ error: 'amount must be a number' }),
        { status: 400, headers }
      );
    }

    if (amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'amount must be positive' }),
        { status: 400, headers }
      );
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Verify token and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error('[Credits Debit API] Invalid token:', authError);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers }
      );
    }

    const user_id = user.id;
    console.log(`[Credits Debit API] Debiting ${amount} credits for user:`, user_id);

    // Get current credits
    const { data: userData, error: fetchError } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user_id)
      .single();

    if (fetchError) {
      console.error('[Credits Debit API] Error fetching user credits:', fetchError);
      
      // User not found
      if (fetchError.code === 'PGRST116') {
        return new Response(
          JSON.stringify({ 
            error: 'User not found. Please fetch credits first to initialize account.' 
          }),
          { status: 404, headers }
        );
      }

      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch user credits',
          details: fetchError.message 
        }),
        { status: 500, headers }
      );
    }

    // Check sufficient credits
    if (!userData || userData.credits < amount) {
      console.warn('[Credits Debit API] Insufficient credits:', {
        current: userData?.credits ?? 0,
        requested: amount
      });

      return new Response(
        JSON.stringify({ 
          error: 'Insufficient credits',
          current: userData?.credits ?? 0,
          requested: amount
        }),
        { status: 400, headers }
      );
    }

    // Calculate new balance
    const newCredits = userData.credits - amount;

    // Update credits in database
    const { data: updatedUser, error: updateError } = await supabase
      .from('user_credits')
      .update({ 
        credits: newCredits,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user_id)
      .select()
      .single();

    if (updateError) {
      console.error('[Credits Debit API] Error updating credits:', updateError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to debit credits',
          details: updateError.message 
        }),
        { status: 500, headers }
      );
    }

    console.log('[Credits Debit API] Successfully debited credits:', {
      previous: userData.credits,
      debited: amount,
      remaining: newCredits
    });

    return new Response(
      JSON.stringify({
        success: true,
        remaining_credits: updatedUser?.credits ?? newCredits,
        debited: amount
      }),
      { status: 200, headers }
    );

  } catch (error: any) {
    console.error('[Credits Debit API] Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { status: 500, headers }
    );
  }
}
