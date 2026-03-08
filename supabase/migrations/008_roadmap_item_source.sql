-- Add source and is_mandatory columns to roadmap_items
ALTER TABLE public.roadmap_items
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'ai_generated',
  ADD COLUMN IF NOT EXISTS is_mandatory boolean NOT NULL DEFAULT false;

-- Backfill: all existing items are AI-generated + mandatory
UPDATE public.roadmap_items SET source = 'ai_generated', is_mandatory = true;
