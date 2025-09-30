-- Migration: Add usage limits and subscription tiers
-- This adds support for Basic (5 requests) and Professional (15 requests) plans

-- ============================================
-- Subscription Plans Enum
-- ============================================
CREATE TYPE subscription_tier AS ENUM ('free', 'basic', 'professional');

-- ============================================
-- Update profiles table with subscription info
-- ============================================
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS subscription_tier subscription_tier DEFAULT 'free',
ADD COLUMN IF NOT EXISTS requests_used INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS requests_limit INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_reset_date TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ============================================
-- Usage History Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.usage_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL, -- 'ai_generation', 'sandbox_creation', etc.
  tokens_used INTEGER DEFAULT 0,
  cost DECIMAL(10, 4) DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.usage_history ENABLE ROW LEVEL SECURITY;

-- Policies for usage_history
CREATE POLICY "Users can view own usage history" 
  ON public.usage_history FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage history" 
  ON public.usage_history FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- Subscription History Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.subscription_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier subscription_tier NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  payment_id TEXT,
  amount DECIMAL(10, 2),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.subscription_history ENABLE ROW LEVEL SECURITY;

-- Policies for subscription_history
CREATE POLICY "Users can view own subscription history" 
  ON public.subscription_history FOR SELECT 
  USING (auth.uid() = user_id);

-- ============================================
-- Functions
-- ============================================

-- Function to get user's remaining requests
CREATE OR REPLACE FUNCTION public.get_remaining_requests(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  remaining INTEGER;
  user_limit INTEGER;
  user_used INTEGER;
BEGIN
  SELECT requests_limit, requests_used 
  INTO user_limit, user_used
  FROM public.profiles 
  WHERE id = user_uuid;
  
  IF user_limit IS NULL THEN
    RETURN 0;
  END IF;
  
  remaining := user_limit - COALESCE(user_used, 0);
  RETURN GREATEST(remaining, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment usage
CREATE OR REPLACE FUNCTION public.increment_usage(
  user_uuid UUID,
  request_type_param TEXT DEFAULT 'ai_generation',
  tokens_param INTEGER DEFAULT 0
)
RETURNS JSONB AS $$
DECLARE
  current_used INTEGER;
  current_limit INTEGER;
  remaining INTEGER;
  result JSONB;
BEGIN
  -- Get current usage
  SELECT requests_used, requests_limit 
  INTO current_used, current_limit
  FROM public.profiles 
  WHERE id = user_uuid;
  
  -- Check if user has requests left
  IF current_used >= current_limit THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Request limit reached',
      'requests_used', current_used,
      'requests_limit', current_limit,
      'requests_remaining', 0
    );
  END IF;
  
  -- Increment usage
  UPDATE public.profiles 
  SET requests_used = requests_used + 1
  WHERE id = user_uuid;
  
  -- Log usage
  INSERT INTO public.usage_history (user_id, request_type, tokens_used)
  VALUES (user_uuid, request_type_param, tokens_param);
  
  -- Calculate remaining
  remaining := current_limit - (current_used + 1);
  
  RETURN jsonb_build_object(
    'success', true,
    'requests_used', current_used + 1,
    'requests_limit', current_limit,
    'requests_remaining', remaining
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to set subscription tier
CREATE OR REPLACE FUNCTION public.set_subscription_tier(
  user_uuid UUID,
  tier subscription_tier,
  duration_days INTEGER DEFAULT 30
)
RETURNS JSONB AS $$
DECLARE
  new_limit INTEGER;
  start_date TIMESTAMP WITH TIME ZONE;
  end_date TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Set limits based on tier
  CASE tier
    WHEN 'basic' THEN
      new_limit := 5;
    WHEN 'professional' THEN
      new_limit := 15;
    ELSE
      new_limit := 0;
  END CASE;
  
  start_date := NOW();
  end_date := NOW() + (duration_days || ' days')::INTERVAL;
  
  -- Update profile
  UPDATE public.profiles 
  SET 
    subscription_tier = tier,
    requests_limit = new_limit,
    requests_used = 0, -- Reset usage on new subscription
    subscription_start_date = start_date,
    subscription_end_date = end_date,
    last_reset_date = NOW()
  WHERE id = user_uuid;
  
  -- Log subscription change
  INSERT INTO public.subscription_history (user_id, tier, start_date, end_date, status)
  VALUES (user_uuid, tier, start_date, end_date, 'active');
  
  RETURN jsonb_build_object(
    'success', true,
    'tier', tier,
    'requests_limit', new_limit,
    'start_date', start_date,
    'end_date', end_date
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset monthly usage
CREATE OR REPLACE FUNCTION public.reset_monthly_usage()
RETURNS INTEGER AS $$
DECLARE
  reset_count INTEGER;
BEGIN
  -- Reset usage for users whose subscription is still active
  UPDATE public.profiles 
  SET 
    requests_used = 0,
    last_reset_date = NOW()
  WHERE 
    subscription_end_date > NOW()
    AND last_reset_date < (NOW() - INTERVAL '30 days');
  
  GET DIAGNOSTICS reset_count = ROW_COUNT;
  RETURN reset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check and expire subscriptions
CREATE OR REPLACE FUNCTION public.expire_subscriptions()
RETURNS INTEGER AS $$
DECLARE
  expired_count INTEGER;
BEGIN
  -- Set tier to free for expired subscriptions
  UPDATE public.profiles 
  SET 
    subscription_tier = 'free',
    requests_limit = 0,
    requests_used = 0
  WHERE 
    subscription_end_date < NOW()
    AND subscription_tier != 'free';
  
  GET DIAGNOSTICS expired_count = ROW_COUNT;
  
  -- Update subscription history
  UPDATE public.subscription_history
  SET status = 'expired'
  WHERE 
    end_date < NOW()
    AND status = 'active';
  
  RETURN expired_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Indexes for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_tier ON public.profiles(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_end_date ON public.profiles(subscription_end_date);
CREATE INDEX IF NOT EXISTS idx_usage_history_user_id ON public.usage_history(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_history_created_at ON public.usage_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscription_history_user_id ON public.subscription_history(user_id);
CREATE INDEX IF NOT EXISTS idx_subscription_history_status ON public.subscription_history(status);

-- ============================================
-- Comments for documentation
-- ============================================
COMMENT ON TABLE public.usage_history IS 'Tracks individual API requests and usage';
COMMENT ON TABLE public.subscription_history IS 'Tracks subscription changes and payments';
COMMENT ON FUNCTION public.get_remaining_requests IS 'Returns number of requests remaining for user';
COMMENT ON FUNCTION public.increment_usage IS 'Increments usage counter and logs the request';
COMMENT ON FUNCTION public.set_subscription_tier IS 'Sets user subscription tier and limits';
COMMENT ON FUNCTION public.reset_monthly_usage IS 'Resets monthly usage counters';
COMMENT ON FUNCTION public.expire_subscriptions IS 'Expires subscriptions that have ended';

-- ============================================
-- Success message
-- ============================================
DO $$
BEGIN
  RAISE NOTICE 'Usage limits migration completed successfully!';
  RAISE NOTICE 'Subscription tiers: free (0), basic (5), professional (15)';
  RAISE NOTICE 'Functions created: get_remaining_requests, increment_usage, set_subscription_tier';
END $$;
