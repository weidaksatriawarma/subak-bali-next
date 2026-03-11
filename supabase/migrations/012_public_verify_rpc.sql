-- Public verification RPC functions
-- Bypass RLS to allow unauthenticated access to certificate/achievement verification pages

-- get_public_certificate: returns certificate data for a given token
CREATE OR REPLACE FUNCTION public.get_public_certificate(p_token uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT jsonb_build_object(
    'total_score', s.total_score,
    'energy_score', s.energy_score,
    'waste_score', s.waste_score,
    'supply_chain_score', s.supply_chain_score,
    'operations_score', s.operations_score,
    'policy_score', s.policy_score,
    'created_at', s.created_at,
    'business_name', p.business_name,
    'industry', p.industry,
    'certificate_token', s.certificate_token
  )
  FROM public.scores s
  JOIN public.profiles p ON p.id = s.user_id
  WHERE s.certificate_token = p_token
  LIMIT 1;
$$;

-- get_public_achievement: returns achievement data including roadmap items
CREATE OR REPLACE FUNCTION public.get_public_achievement(p_token uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT jsonb_build_object(
    'total_score', s.total_score,
    'energy_score', s.energy_score,
    'waste_score', s.waste_score,
    'supply_chain_score', s.supply_chain_score,
    'operations_score', s.operations_score,
    'policy_score', s.policy_score,
    'created_at', s.created_at,
    'business_name', p.business_name,
    'industry', p.industry,
    'certificate_token', s.certificate_token,
    'roadmap_items', COALESCE(
      (SELECT jsonb_agg(jsonb_build_object(
        'is_completed', ri.is_completed,
        'category', ri.category
      ))
      FROM public.roadmap_items ri
      WHERE ri.user_id = s.user_id),
      '[]'::jsonb
    )
  )
  FROM public.scores s
  JOIN public.profiles p ON p.id = s.user_id
  WHERE s.certificate_token = p_token
  LIMIT 1;
$$;

-- Grant execute to anon (unauthenticated) and authenticated roles
GRANT EXECUTE ON FUNCTION public.get_public_certificate(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_achievement(uuid) TO anon, authenticated;
