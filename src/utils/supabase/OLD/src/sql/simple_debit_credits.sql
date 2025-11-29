-- ============================================
-- SIMPLE FIX: debit_credits (version minimale)
-- ============================================
-- Si tu veux juste une version simple qui marche
-- ============================================

-- Drop old versions
DROP FUNCTION IF EXISTS debit_credits(uuid, integer);
DROP FUNCTION IF EXISTS debit_credits(uuid, integer, text, jsonb);
DROP FUNCTION IF EXISTS debit_credits(uuid);

-- Version simple avec seulement user_id et amount
CREATE OR REPLACE FUNCTION debit_credits(
  p_user_id uuid,
  p_amount integer DEFAULT 1
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Vérifier crédits
  SELECT credits INTO current_credits
  FROM user_credits
  WHERE user_id = p_user_id;
  
  -- Si pas de ligne, créer avec 0
  IF current_credits IS NULL THEN
    INSERT INTO user_credits (user_id, credits, total_used)
    VALUES (p_user_id, 0, 0)
    ON CONFLICT (user_id) DO NOTHING;
    current_credits := 0;
  END IF;
  
  -- Vérifier suffisamment
  IF current_credits < p_amount THEN
    RAISE EXCEPTION 'Insufficient credits';
  END IF;
  
  -- Débiter
  UPDATE user_credits
  SET 
    credits = credits - p_amount,
    total_used = total_used + p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  -- Logger
  INSERT INTO credit_transactions (user_id, amount, type, description)
  VALUES (p_user_id, -p_amount, 'generation', 'Debit');
END;
$$;

GRANT EXECUTE ON FUNCTION debit_credits(uuid, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION debit_credits(uuid, integer) TO service_role;
