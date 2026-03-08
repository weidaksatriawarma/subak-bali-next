-- Industry-specific assessment answers (JSONB for flexibility per industry)
ALTER TABLE public.assessments
ADD COLUMN IF NOT EXISTS industry_answers jsonb DEFAULT '{}';

-- Certificate verification tokens
ALTER TABLE public.scores
ADD COLUMN IF NOT EXISTS certificate_token uuid DEFAULT gen_random_uuid();

-- Create index for certificate verification lookups
CREATE INDEX IF NOT EXISTS idx_scores_certificate_token ON public.scores(certificate_token);
