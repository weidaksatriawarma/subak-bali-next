-- Profiles table (extends Supabase auth.users)
-- Stores business information collected during onboarding
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  business_name text not null,
  industry text not null,           -- 'fnb', 'retail', 'manufacturing', 'services', 'agriculture', 'other'
  business_size text not null,      -- 'micro', 'small', 'medium'
  employee_count int,
  location text,
  description text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- RLS policies: users can only access their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);
