-- Roadmaps table
-- Stores AI-generated roadmap metadata
create table public.roadmaps (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  score_id uuid references public.scores(id) on delete cascade not null,

  title text not null,
  ai_generated_content jsonb not null,

  created_at timestamptz default now()
);

-- Enable RLS
alter table public.roadmaps enable row level security;

create policy "Users can CRUD own roadmaps"
  on public.roadmaps for all
  using (auth.uid() = user_id);

-- Roadmap Items table
-- Individual actionable items within a roadmap
create table public.roadmap_items (
  id uuid default uuid_generate_v4() primary key,
  roadmap_id uuid references public.roadmaps(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,

  title text not null,
  description text not null,
  category text not null,               -- 'energy', 'waste', 'supply_chain', 'operations', 'policy'
  priority text not null,               -- 'high', 'medium', 'low'
  estimated_impact text,                -- 'high', 'medium', 'low'
  estimated_cost text,                  -- 'free', 'low', 'medium', 'high'
  timeline text,                        -- '1_week', '1_month', '3_months', '6_months', '1_year'

  is_completed boolean default false,
  completed_at timestamptz,
  sort_order int default 0,

  created_at timestamptz default now()
);

-- Enable RLS
alter table public.roadmap_items enable row level security;

create policy "Users can CRUD own roadmap items"
  on public.roadmap_items for all
  using (auth.uid() = user_id);
