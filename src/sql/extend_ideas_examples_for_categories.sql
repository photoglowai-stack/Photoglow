-- ============================================================
-- PhotoGlow - Extend ideas_examples Table for Categories
-- ============================================================
-- Description: Ajoute les colonnes manquantes à la table existante
--              ideas_examples pour supporter les catégories
-- Date: Novembre 2025
-- ============================================================

-- ============================================================
-- 1. AJOUTER LES COLONNES MANQUANTES
-- ============================================================

-- Ajouter les colonnes pour les métadonnées de catégories
-- (si elles n'existent pas déjà)

ALTER TABLE ideas_examples 
ADD COLUMN IF NOT EXISTS prompt_title TEXT;

ALTER TABLE ideas_examples 
ADD COLUMN IF NOT EXISTS prompt_text TEXT;

ALTER TABLE ideas_examples 
ADD COLUMN IF NOT EXISTS category_id TEXT;

ALTER TABLE ideas_examples 
ADD COLUMN IF NOT EXISTS prompt_index INTEGER;

ALTER TABLE ideas_examples 
ADD COLUMN IF NOT EXISTS aspect_ratio TEXT;

-- ============================================================
-- 2. INDEXES POUR PERFORMANCE
-- ============================================================

-- Index sur category_id pour requêtes rapides
CREATE INDEX IF NOT EXISTS idx_ideas_examples_category_id 
ON ideas_examples(category_id);

-- Index sur prompt_index
CREATE INDEX IF NOT EXISTS idx_ideas_examples_prompt_index 
ON ideas_examples(prompt_index);

-- Index composite pour requêtes optimisées
CREATE INDEX IF NOT EXISTS idx_ideas_examples_category_prompt 
ON ideas_examples(category_id, prompt_index);

-- ============================================================
-- 3. FONCTIONS HELPER
-- ============================================================

-- Fonction pour récupérer toutes les images d'une catégorie
CREATE OR REPLACE FUNCTION get_category_images(p_category_id TEXT)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  image_url TEXT,
  prompt_title TEXT,
  prompt_text TEXT,
  category_id TEXT,
  prompt_index INTEGER,
  aspect_ratio TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) 
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ie.id,
    ie.slug,
    ie.image_url,
    ie.prompt_title,
    ie.prompt_text,
    ie.category_id,
    ie.prompt_index,
    ie.aspect_ratio,
    ie.created_at
  FROM ideas_examples ie
  WHERE ie.category_id = p_category_id
  AND ie.category_id IS NOT NULL
  ORDER BY ie.prompt_index ASC;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour compter les images par catégorie
CREATE OR REPLACE FUNCTION count_category_images()
RETURNS TABLE (
  category_id TEXT,
  image_count BIGINT
)
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ie.category_id,
    COUNT(*) as image_count
  FROM ideas_examples ie
  WHERE ie.category_id IS NOT NULL
  GROUP BY ie.category_id
  ORDER BY ie.category_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 4. GRANTS (Permissions)
-- ============================================================

-- Autoriser l'usage des fonctions
GRANT EXECUTE ON FUNCTION get_category_images(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION count_category_images() TO anon, authenticated;

-- ============================================================
-- 5. VERIFICATION
-- ============================================================

-- Vérifier que les colonnes ont été ajoutées
DO $$
DECLARE
  missing_columns TEXT[];
BEGIN
  -- Vérifier les colonnes requises
  SELECT ARRAY_AGG(column_name) INTO missing_columns
  FROM (
    SELECT unnest(ARRAY['prompt_title', 'prompt_text', 'category_id', 'prompt_index', 'aspect_ratio']) AS column_name
  ) required
  WHERE NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'ideas_examples' 
    AND column_name = required.column_name
  );
  
  IF array_length(missing_columns, 1) > 0 THEN
    RAISE EXCEPTION 'Missing columns in ideas_examples: %', array_to_string(missing_columns, ', ');
  END IF;
  
  -- Vérifier les indexes
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'ideas_examples' AND indexname = 'idx_ideas_examples_category_id') THEN
    RAISE EXCEPTION 'Index idx_ideas_examples_category_id not created';
  END IF;
  
  RAISE NOTICE '✅ All checks passed! Table ideas_examples extended successfully.';
END $$;

-- ============================================================
-- 6. SAMPLE QUERIES (for testing)
-- ============================================================

-- Récupérer toutes les images d'une catégorie
-- SELECT * FROM get_category_images('ai-headshots');

-- Compter les images par catégorie
-- SELECT * FROM count_category_images();

-- Vérifier le nombre total d'images de catégories
-- SELECT COUNT(*) as total_category_images 
-- FROM ideas_examples 
-- WHERE category_id IS NOT NULL;

-- Lister les catégories avec le plus d'images
-- SELECT category_id, COUNT(*) as count 
-- FROM ideas_examples 
-- WHERE category_id IS NOT NULL
-- GROUP BY category_id 
-- ORDER BY count DESC;

-- ============================================================
-- 7. NOTES
-- ============================================================

-- Les images de catégories seront stockées dans le bucket ai_gallery
-- avec le path: categories/{categoryId}/{promptIndex}.jpg
-- 
-- Les images IDEAS classiques restent inchangées dans leur structure
-- actuelle et cohabitent dans la même table.
--
-- Pour différencier:
-- - Images IDEAS: category_id IS NULL
-- - Images Catégories: category_id IS NOT NULL

-- ============================================================
-- END OF SETUP
-- ============================================================

COMMIT;
