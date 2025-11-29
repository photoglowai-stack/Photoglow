-- ============================================
-- TABLE videos_meta - Metadata for generated videos
-- ============================================
-- This table stores video generation metadata
-- It's OPTIONAL - videos are currently stored in KV store
-- But you can use this table if you prefer Postgres storage
-- ============================================

CREATE TABLE IF NOT EXISTS videos_meta (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source_image_url TEXT NOT NULL,
  prompt TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER DEFAULT 5,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast queries by user_id
CREATE INDEX IF NOT EXISTS idx_videos_meta_user_id ON videos_meta(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_meta_created_at ON videos_meta(created_at DESC);

-- Row Level Security
ALTER TABLE videos_meta ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own videos
CREATE POLICY "Users can view their own videos"
  ON videos_meta FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only delete their own videos
CREATE POLICY "Users can delete their own videos"
  ON videos_meta FOR DELETE
  USING (auth.uid() = user_id);

-- Policy: System can insert videos (service role)
CREATE POLICY "Service role can insert videos"
  ON videos_meta FOR INSERT
  WITH CHECK (true);

-- Policy: Users can update their own videos
CREATE POLICY "Users can update their own videos"
  ON videos_meta FOR UPDATE
  USING (auth.uid() = user_id);
