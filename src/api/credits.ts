// GET /api/credits
// Fetches user credit balance from Supabase using auth token

import { createClient } from '@supabase/supabase-js@2.47.10';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // Enable CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
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

    console.log('[Credits API] Verifying token...');

    // Initialize Supabase client with service role key
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Verify token and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error('[Credits API] Invalid token:', authError);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers }
      );
    }

    const userId = user.id;
    console.log('[Credits API] Fetching credits for user:', userId);

    // Fetch user credits from database
    const { data, error } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', userId)
      .single();

    if (error) {
      // User doesn't exist - create default credits
      if (error.code === 'PGRST116') {
        console.log('[Credits API] User not found, creating with 100 default credits');
        
        const { data: newUser, error: insertError } = await supabase
          .from('user_credits')
          .insert({ 
            user_id: userId, 
            credits: 100 
          })
          .select()
          .single();

        if (insertError) {
          console.error('[Credits API] Error creating user credits:', insertError);
          return new Response(
            JSON.stringify({ 
              error: 'Failed to create user credits',
              details: insertError.message 
            }),
            { status: 500, headers }
          );
        }

        console.log('[Credits API] Created user credits:', newUser);
        return new Response(
          JSON.stringify({ credits: newUser?.credits ?? 100 }),
          { status: 200, headers }
        );
      }

      // Other database error
      console.error('[Credits API] Database error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch credits',
          details: error.message 
        }),
        { status: 500, headers }
      );
    }

    console.log('[Credits API] Credits found:', data.credits);

    return new Response(
      JSON.stringify({ credits: data?.credits ?? 0 }),
      { status: 200, headers }
    );

  } catch (error: any) {
    console.error('[Credits API] Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { status: 500, headers }
    );
  }
}
