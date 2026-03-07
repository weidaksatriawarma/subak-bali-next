-- Assessments table
-- Stores sustainability assessment questionnaire responses
create table public.assessments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'draft',      -- 'draft', 'completed'

  -- Energy
  energy_source text,               -- 'pln_only', 'pln_solar', 'solar_only', 'diesel_generator'
  monthly_electricity_kwh numeric,
  uses_energy_efficient_equipment boolean default false,

  -- Waste
  waste_management text,            -- 'none', 'segregation', 'recycling', 'composting', 'circular'
  plastic_reduction_efforts boolean default false,
  waste_volume_kg_monthly numeric,

  -- Supply Chain
  local_sourcing_percentage numeric, -- 0-100
  supplier_sustainability_check boolean default false,
  packaging_type text,              -- 'single_use_plastic', 'recyclable', 'biodegradable', 'reusable'

  -- Operations
  water_conservation boolean default false,
  digital_operations boolean default false,
  transportation_type text,         -- 'gasoline', 'electric', 'hybrid', 'bicycle', 'none'

  -- Policy
  has_sustainability_policy boolean default false,
  employee_sustainability_training boolean default false,
  community_engagement boolean default false,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.assessments enable row level security;

-- RLS policies
create policy "Users can CRUD own assessments"
  on public.assessments for all
  using (auth.uid() = user_id);
