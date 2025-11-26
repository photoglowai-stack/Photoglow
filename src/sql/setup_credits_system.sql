-- ============================================
-- PHOTOGLOW CREDITS SYSTEM - SETUP SQL
-- ============================================
-- Execute this in Supabase SQL Editor
-- ============================================

-- ============================================
-- TABLE: user_credits
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  credits INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON public.user_credits(user_id);

COMMENT ON TABLE public.user_credits IS 'Stores user credit balances for image generation';
COMMENT ON COLUMN public.user_credits.credits IS 'Current available credits';

-- ============================================
-- RLS POLICIES - user_credits
-- ============================================

ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- Users can view their own credits
DROP POLICY IF EXISTS "Users can view own credits" ON public.user_credits;
CREATE POLICY "Users can view own credits"
  ON public.user_credits FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can do everything (for backend)
DROP POLICY IF EXISTS "Service role full access" ON public.user_credits;
CREATE POLICY "Service role full access"
  ON public.user_credits
  FOR ALL
  USING (true);

-- ============================================
-- TRIGGER: Auto-create credits on user signup
-- ============================================

CREATE OR REPLACE FUNCTION public.create_user_credits()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, credits)
  VALUES (NEW.id, 100)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_user_credits();

COMMENT ON FUNCTION public.create_user_credits IS 'Automatically creates 100 free credits for new users';

-- ============================================
-- TABLE: credit_transactions
-- ============================================

CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit', 'refund')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON public.credit_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_type ON public.credit_transactions(type);

COMMENT ON TABLE public.credit_transactions IS 'Transaction history for all credit operations';
COMMENT ON COLUMN public.credit_transactions.amount IS 'Positive for credits, negative for debits';
COMMENT ON COLUMN public.credit_transactions.type IS 'Type of transaction: credit, debit, or refund';

-- ============================================
-- RLS POLICIES - credit_transactions
-- ============================================

ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own transactions" ON public.credit_transactions;
CREATE POLICY "Users can view own transactions"
  ON public.credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role full access on transactions" ON public.credit_transactions;
CREATE POLICY "Service role full access on transactions"
  ON public.credit_transactions
  FOR ALL
  USING (true);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to add credits (for admin use or purchases)
CREATE OR REPLACE FUNCTION public.add_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_description TEXT DEFAULT 'Credit purchase'
)
RETURNS JSON AS $$
DECLARE
  v_new_balance INTEGER;
BEGIN
  -- Update user credits
  UPDATE public.user_credits
  SET credits = credits + p_amount,
      updated_at = NOW()
  WHERE user_id = p_user_id
  RETURNING credits INTO v_new_balance;

  -- If user doesn't exist, create them
  IF NOT FOUND THEN
    INSERT INTO public.user_credits (user_id, credits)
    VALUES (p_user_id, p_amount)
    RETURNING credits INTO v_new_balance;
  END IF;

  -- Log transaction
  INSERT INTO public.credit_transactions (user_id, amount, type, description)
  VALUES (p_user_id, p_amount, 'credit', p_description);

  RETURN json_build_object(
    'success', true,
    'new_balance', v_new_balance,
    'added', p_amount
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.add_credits IS 'Adds credits to a user account and logs the transaction';

-- Function to check if user has sufficient credits
CREATE OR REPLACE FUNCTION public.has_sufficient_credits(
  p_user_id UUID,
  p_required INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
  v_current_credits INTEGER;
BEGIN
  SELECT credits INTO v_current_credits
  FROM public.user_credits
  WHERE user_id = p_user_id;

  RETURN COALESCE(v_current_credits, 0) >= p_required;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.has_sufficient_credits IS 'Checks if user has enough credits for an operation';

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================

-- Uncomment to add test credits to existing users
-- UPDATE public.user_credits SET credits = 100;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check tables exist
SELECT 
  tablename, 
  schemaname 
FROM pg_tables 
WHERE tablename IN ('user_credits', 'credit_transactions') 
  AND schemaname = 'public';

-- Check RLS is enabled
SELECT 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename IN ('user_credits', 'credit_transactions') 
  AND schemaname = 'public';

-- Check triggers
SELECT 
  trigger_name, 
  event_object_table, 
  action_statement 
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Credits system setup complete!';
  RAISE NOTICE '📊 Tables created: user_credits, credit_transactions';
  RAISE NOTICE '🔒 RLS policies enabled';
  RAISE NOTICE '⚡ Triggers configured: auto-create 100 credits on signup';
  RAISE NOTICE '🔧 Helper functions: add_credits(), has_sufficient_credits()';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Next steps:';
  RAISE NOTICE '1. Deploy backend endpoints to Vercel';
  RAISE NOTICE '2. Test credit fetching in frontend';
  RAISE NOTICE '3. Test credit debit after generation';
END $$;

SELECT '✅ Credits system setup complete!' AS status;
