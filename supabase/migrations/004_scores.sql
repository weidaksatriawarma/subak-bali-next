-- Scores table
-- Stores AI-generated sustainability scores per assessment
create table public.scores (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  assessment_id uuid references public.assessments(id) on delete cascade not null,

  total_score numeric not null,          -- 0-100
  energy_score numeric not null,         -- 0-100
  waste_score numeric not null,          -- 0-100
  supply_chain_score numeric not null,   -- 0-100
  operations_score numeric not null,     -- 0-100
  policy_score numeric not null,         -- 0-100

  ai_summary text,
  industry_benchmark numeric,

  created_at timestamptz default now()
);

-- Enable RLS
alter table public.scores enable row level security;

-- RLS policies
create policy "Users can view own scores"
  on public.scores for select
  using (auth.uid() = user_id);

create policy "Users can insert own scores"
  on public.scores for insert
  with check (auth.uid() = user_id);
