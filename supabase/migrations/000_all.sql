-- ============================================================
-- GreenAdvisor — Combined Migration Script (idempotent)
-- Run this in Supabase Dashboard > SQL Editor > New Query
-- Safe to re-run: uses IF NOT EXISTS for all objects
-- ============================================================

-- ============================================================
-- 001: Extensions
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- 002: Profiles
-- ============================================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  business_name text not null,
  industry text not null,
  business_size text not null,
  employee_count int,
  location text,
  description text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'profiles' and policyname = 'Users can view own profile') then
    create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'profiles' and policyname = 'Users can insert own profile') then
    create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'profiles' and policyname = 'Users can update own profile') then
    create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
  end if;
end $$;

-- ============================================================
-- 003: Assessments
-- ============================================================
create table if not exists public.assessments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'draft',

  -- Energy
  energy_source text,
  monthly_electricity_kwh numeric,
  uses_energy_efficient_equipment boolean default false,

  -- Waste
  waste_management text,
  plastic_reduction_efforts boolean default false,
  waste_volume_kg_monthly numeric,

  -- Supply Chain
  local_sourcing_percentage numeric,
  supplier_sustainability_check boolean default false,
  packaging_type text,

  -- Operations
  water_conservation boolean default false,
  digital_operations boolean default false,
  transportation_type text,

  -- Policy
  has_sustainability_policy boolean default false,
  employee_sustainability_training boolean default false,
  community_engagement boolean default false,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.assessments enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'assessments' and policyname = 'Users can CRUD own assessments') then
    create policy "Users can CRUD own assessments" on public.assessments for all using (auth.uid() = user_id);
  end if;
end $$;

-- ============================================================
-- 004: Scores
-- ============================================================
create table if not exists public.scores (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  assessment_id uuid references public.assessments(id) on delete cascade not null,

  total_score numeric not null,
  energy_score numeric not null,
  waste_score numeric not null,
  supply_chain_score numeric not null,
  operations_score numeric not null,
  policy_score numeric not null,

  ai_summary text,
  industry_benchmark numeric,

  created_at timestamptz default now()
);

alter table public.scores enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'scores' and policyname = 'Users can view own scores') then
    create policy "Users can view own scores" on public.scores for select using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'scores' and policyname = 'Users can insert own scores') then
    create policy "Users can insert own scores" on public.scores for insert with check (auth.uid() = user_id);
  end if;
end $$;

-- ============================================================
-- 005: Roadmaps & Roadmap Items
-- ============================================================
create table if not exists public.roadmaps (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  score_id uuid references public.scores(id) on delete cascade not null,

  title text not null,
  ai_generated_content jsonb not null,

  created_at timestamptz default now()
);

alter table public.roadmaps enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'roadmaps' and policyname = 'Users can CRUD own roadmaps') then
    create policy "Users can CRUD own roadmaps" on public.roadmaps for all using (auth.uid() = user_id);
  end if;
end $$;

create table if not exists public.roadmap_items (
  id uuid default uuid_generate_v4() primary key,
  roadmap_id uuid references public.roadmaps(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,

  title text not null,
  description text not null,
  category text not null,
  priority text not null,
  estimated_impact text,
  estimated_cost text,
  timeline text,

  is_completed boolean default false,
  completed_at timestamptz,
  sort_order int default 0,

  created_at timestamptz default now()
);

alter table public.roadmap_items enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'roadmap_items' and policyname = 'Users can CRUD own roadmap items') then
    create policy "Users can CRUD own roadmap items" on public.roadmap_items for all using (auth.uid() = user_id);
  end if;
end $$;

-- ============================================================
-- 006: Chat
-- ============================================================
create table if not exists public.chat_conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text default 'Percakapan Baru',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.chat_conversations enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'chat_conversations' and policyname = 'Users can CRUD own conversations') then
    create policy "Users can CRUD own conversations" on public.chat_conversations for all using (auth.uid() = user_id);
  end if;
end $$;

create table if not exists public.chat_messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.chat_conversations(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text not null,
  content text not null,
  created_at timestamptz default now()
);

alter table public.chat_messages enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'chat_messages' and policyname = 'Users can CRUD own messages') then
    create policy "Users can CRUD own messages" on public.chat_messages for all using (auth.uid() = user_id);
  end if;
end $$;

-- ============================================================
-- 007: Triggers & Indexes
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Drop and recreate triggers to avoid "already exists" errors
drop trigger if exists on_profiles_updated on public.profiles;
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();

drop trigger if exists on_assessments_updated on public.assessments;
create trigger on_assessments_updated
  before update on public.assessments
  for each row execute function public.handle_updated_at();

drop trigger if exists on_chat_conversations_updated on public.chat_conversations;
create trigger on_chat_conversations_updated
  before update on public.chat_conversations
  for each row execute function public.handle_updated_at();

-- Indexes (IF NOT EXISTS)
create index if not exists idx_assessments_user_id on public.assessments(user_id);
create index if not exists idx_scores_user_id on public.scores(user_id);
create index if not exists idx_scores_assessment_id on public.scores(assessment_id);
create index if not exists idx_roadmaps_user_id on public.roadmaps(user_id);
create index if not exists idx_roadmap_items_roadmap_id on public.roadmap_items(roadmap_id);
create index if not exists idx_roadmap_items_user_id on public.roadmap_items(user_id);
create index if not exists idx_chat_conversations_user_id on public.chat_conversations(user_id);
create index if not exists idx_chat_messages_conversation_id on public.chat_messages(conversation_id);
create index if not exists idx_chat_messages_user_id on public.chat_messages(user_id);
