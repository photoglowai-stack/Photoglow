import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image_url, prompt } = req.body;

    if (!image_url || !prompt) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields: image_url and prompt' 
      });
    }

    // Get authorization token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ 
        success: false,
        error: 'Authorization required' 
      });
    }

    // Forward to Supabase Functions which will handle the video generation
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    if (!supabaseUrl) {
      return res.status(500).json({ 
        success: false,
        error: 'Supabase URL not configured' 
      });
    }

    const projectId = supabaseUrl.replace('https://', '').split('.')[0];
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/generate-video`,
      {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_url,
          prompt
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data.error || 'Failed to generate video'
      });
    }

    return res.status(200).json({
      success: true,
      video_url: data.video_url,
      video_id: data.video_id,
      message: 'Video generated successfully'
    });

  } catch (error: any) {
    console.error('Video generation error:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
}
