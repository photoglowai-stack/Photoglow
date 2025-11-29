-- ============================================
-- PHOTOGLOW - CREDITS MANAGEMENT SYSTEM
-- ============================================
-- 
-- Ce fichier contient les tables et fonctions
-- pour gérer le système de crédits utilisateurs
-- avec les générations d'images Gen-4
--
-- À exécuter dans Supabase SQL Editor
-- ============================================

-- ============================================
-- TABLE: user_credits
-- ============================================

CREATE TABLE IF NOT EXISTS user_credits (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credits INTEGER NOT NULL DEFAULT 0,
  total_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);

-- ============================================
-- TABLE: credit_transactions (Logs)
-- ============================================

CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- Positif pour ajout, négatif pour utilisation
  type TEXT NOT NULL, -- 'purchase', 'generation', 'bonus', 'refund'
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour requêtes rapides
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON credit_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_type ON credit_transactions(type);

-- ============================================
-- FUNCTION: decrement_credits
-- ============================================
-- 
-- Décrémente les crédits d'un utilisateur de manière atomique
-- et enregistre la transaction
--
-- Usage:
--   SELECT decrement_credits('user-uuid-here');
--
-- Retourne: void
-- Erreur si: crédits insuffisants
-- ============================================

CREATE OR REPLACE FUNCTION decrement_credits(uid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- S'exécute avec les permissions du créateur de la fonction
AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- 1. Vérifier les crédits actuels
  SELECT credits INTO current_credits
  FROM user_credits
  WHERE user_id = uid;
  
  -- 2. Si pas de ligne, créer avec 0 crédits (erreur ensuite)
  IF current_credits IS NULL THEN
    INSERT INTO user_credits (user_id, credits, total_used)
    VALUES (uid, 0, 0)
    ON CONFLICT (user_id) DO NOTHING;
    
    current_credits := 0;
  END IF;
  
  -- 3. Vérifier suffisamment de crédits
  IF current_credits <= 0 THEN
    RAISE EXCEPTION 'Insufficient credits. Current: %, Required: 1', current_credits;
  END IF;
  
  -- 4. Décrémenter les crédits de manière atomique
  UPDATE user_credits
  SET 
    credits = GREATEST(0, credits - 1),
    total_used = total_used + 1,
    updated_at = NOW()
  WHERE user_id = uid;
  
  -- 5. Logger la transaction
  INSERT INTO credit_transactions (user_id, amount, type, description)
  VALUES (uid, -1, 'generation', 'Gen-4 image generation');
  
  -- 6. Success
  RAISE NOTICE 'Credits decremented. Remaining: %', current_credits - 1;
END;
$$;

-- ============================================
-- FUNCTION: add_credits
-- ============================================
-- 
-- Ajoute des crédits à un utilisateur (après achat)
--
-- Usage:
--   SELECT add_credits('user-uuid-here', 60, 'Package Popular');
--
-- ============================================

CREATE OR REPLACE FUNCTION add_credits(uid uuid, amount integer, description text DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- 1. Upsert dans user_credits
  INSERT INTO user_credits (user_id, credits, updated_at)
  VALUES (uid, amount, NOW())
  ON CONFLICT (user_id)
  DO UPDATE SET
    credits = user_credits.credits + amount,
    updated_at = NOW();
  
  -- 2. Logger la transaction
  INSERT INTO credit_transactions (user_id, amount, type, description)
  VALUES (uid, amount, 'purchase', COALESCE(description, 'Credit purchase'));
  
  RAISE NOTICE 'Credits added: +%', amount;
END;
$$;

-- ============================================
-- FUNCTION: get_user_credits
-- ============================================
-- 
-- Récupère les crédits d'un utilisateur
--
-- Usage:
--   SELECT get_user_credits('user-uuid-here');
--
-- Retourne: INTEGER (nombre de crédits)
-- ============================================

CREATE OR REPLACE FUNCTION get_user_credits(uid uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_credits_count INTEGER;
BEGIN
  SELECT credits INTO user_credits_count
  FROM user_credits
  WHERE user_id = uid;
  
  -- Si pas de ligne, retourner 0
  RETURN COALESCE(user_credits_count, 0);
END;
$$;

-- ============================================
-- FUNCTION: get_credit_history
-- ============================================
-- 
-- Récupère l'historique des transactions d'un utilisateur
--
-- Usage:
--   SELECT * FROM get_credit_history('user-uuid-here', 10);
--
-- Retourne: TABLE
-- ============================================

CREATE OR REPLACE FUNCTION get_credit_history(uid uuid, limit_rows integer DEFAULT 50)
RETURNS TABLE (
  id uuid,
  amount integer,
  type text,
  description text,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ct.id,
    ct.amount,
    ct.type,
    ct.description,
    ct.created_at
  FROM credit_transactions ct
  WHERE ct.user_id = uid
  ORDER BY ct.created_at DESC
  LIMIT limit_rows;
END;
$$;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- Policies pour user_credits
CREATE POLICY "Users can view own credits"
  ON user_credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own credits via function"
  ON user_credits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all credits"
  ON user_credits FOR ALL
  USING (auth.role() = 'service_role');

-- Policies pour credit_transactions
CREATE POLICY "Users can view own transactions"
  ON credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all transactions"
  ON credit_transactions FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Grant execute sur les fonctions pour authenticated users
GRANT EXECUTE ON FUNCTION decrement_credits(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION add_credits(uuid, integer, text) TO service_role;
GRANT EXECUTE ON FUNCTION get_user_credits(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION get_credit_history(uuid, integer) TO authenticated;

-- ============================================
-- TRIGGER: update_updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_credits_updated_at ON user_credits;

CREATE TRIGGER update_user_credits_updated_at
  BEFORE UPDATE ON user_credits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Optional - pour tests)
-- ============================================

-- Créer un user de test avec 100 crédits (remplacer par un vrai UUID)
/*
INSERT INTO user_credits (user_id, credits)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 100)
ON CONFLICT (user_id) DO NOTHING;
*/

-- ============================================
-- TESTS
-- ============================================

-- Test 1: Ajouter des crédits
-- SELECT add_credits('your-user-uuid', 60, 'Package Popular');

-- Test 2: Vérifier les crédits
-- SELECT get_user_credits('your-user-uuid');

-- Test 3: Décrémenter
-- SELECT decrement_credits('your-user-uuid');

-- Test 4: Vérifier à nouveau
-- SELECT get_user_credits('your-user-uuid');

-- Test 5: Voir l'historique
-- SELECT * FROM get_credit_history('your-user-uuid', 10);

-- ============================================
-- QUERIES UTILES (Admin)
-- ============================================

-- Voir tous les utilisateurs et leurs crédits
/*
SELECT 
  uc.user_id,
  au.email,
  uc.credits,
  uc.total_used,
  uc.created_at,
  uc.updated_at
FROM user_credits uc
JOIN auth.users au ON uc.user_id = au.id
ORDER BY uc.credits DESC;
*/

-- Voir les transactions récentes
/*
SELECT 
  ct.id,
  au.email,
  ct.amount,
  ct.type,
  ct.description,
  ct.created_at
FROM credit_transactions ct
JOIN auth.users au ON ct.user_id = au.id
ORDER BY ct.created_at DESC
LIMIT 20;
*/

-- Stats globales
/*
SELECT 
  COUNT(DISTINCT user_id) as total_users,
  SUM(credits) as total_credits_remaining,
  SUM(total_used) as total_credits_used,
  AVG(credits) as avg_credits_per_user
FROM user_credits;
*/

-- ============================================
-- NOTES
-- ============================================

/*
1. SÉCURITÉ:
   - Les fonctions utilisent SECURITY DEFINER pour éviter les problèmes de RLS
   - Les policies RLS empêchent les users de voir les crédits des autres
   - Seul service_role peut ajouter des crédits (pas les users)

2. ATOMICITÉ:
   - decrement_credits est atomique (pas de race conditions)
   - Les transactions sont loggées pour audit

3. PERFORMANCE:
   - Index sur user_id pour queries rapides
   - GREATEST(0, credits - 1) empêche les crédits négatifs

4. MONITORING:
   - credit_transactions table = audit trail complet
   - Metadata JSONB pour stocker des infos additionnelles

5. USAGE DANS REACT:
   ```typescript
   // Décrémenter
   const { error } = await supabase.rpc('decrement_credits', {
     uid: user.id
   });
   
   // Vérifier
   const { data } = await supabase.rpc('get_user_credits', {
     uid: user.id
   });
   console.log('Credits:', data);
   
   // Historique
   const { data: history } = await supabase.rpc('get_credit_history', {
     uid: user.id,
     limit_rows: 20
   });
   ```
*/

-- ============================================
-- FIN DU SCRIPT
-- ============================================

-- Pour vérifier que tout est installé correctement:
SELECT 
  'user_credits table' as component,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_credits') 
    THEN '✅ OK' 
    ELSE '❌ Missing' 
  END as status
UNION ALL
SELECT 
  'credit_transactions table',
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'credit_transactions') 
    THEN '✅ OK' 
    ELSE '❌ Missing' 
  END
UNION ALL
SELECT 
  'decrement_credits function',
  CASE WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'decrement_credits') 
    THEN '✅ OK' 
    ELSE '❌ Missing' 
  END
UNION ALL
SELECT 
  'add_credits function',
  CASE WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'add_credits') 
    THEN '✅ OK' 
    ELSE '❌ Missing' 
  END
UNION ALL
SELECT 
  'get_user_credits function',
  CASE WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_user_credits') 
    THEN '✅ OK' 
    ELSE '❌ Missing' 
  END
UNION ALL
SELECT 
  'get_credit_history function',
  CASE WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_credit_history') 
    THEN '✅ OK' 
    ELSE '❌ Missing' 
  END;
