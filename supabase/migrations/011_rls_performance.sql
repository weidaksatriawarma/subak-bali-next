-- Migration: Fix Supabase database linter warnings
-- 1. RLS policies: wrap auth.uid() in (select ...) to cache per-statement instead of per-row
-- 2. Function search_path: set search_path = '' on handle_updated_at()

-- ============================================================================
-- 1. FIX: auth_rls_initplan — Cache auth.uid() with (select auth.uid())
-- ============================================================================

-- profiles: 3 policies (SELECT, INSERT, UPDATE)
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;

create policy "Users can view own profile"
  on public.profiles for select
  using ((select auth.uid()) = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check ((select auth.uid()) = id);

create policy "Users can update own profile"
  on public.profiles for update
  using ((select auth.uid()) = id);

-- assessments: 1 policy (ALL)
drop policy if exists "Users can CRUD own assessments" on public.assessments;

create policy "Users can CRUD own assessments"
  on public.assessments for all
  using ((select auth.uid()) = user_id);

-- scores: 2 policies (SELECT, INSERT)
drop policy if exists "Users can view own scores" on public.scores;
drop policy if exists "Users can insert own scores" on public.scores;

create policy "Users can view own scores"
  on public.scores for select
  using ((select auth.uid()) = user_id);

create policy "Users can insert own scores"
  on public.scores for insert
  with check ((select auth.uid()) = user_id);

-- roadmaps: 1 policy (ALL)
drop policy if exists "Users can CRUD own roadmaps" on public.roadmaps;

create policy "Users can CRUD own roadmaps"
  on public.roadmaps for all
  using ((select auth.uid()) = user_id);

-- roadmap_items: 1 policy (ALL)
drop policy if exists "Users can CRUD own roadmap items" on public.roadmap_items;

create policy "Users can CRUD own roadmap items"
  on public.roadmap_items for all
  using ((select auth.uid()) = user_id);

-- chat_conversations: 1 policy (ALL)
drop policy if exists "Users can CRUD own conversations" on public.chat_conversations;

create policy "Users can CRUD own conversations"
  on public.chat_conversations for all
  using ((select auth.uid()) = user_id);

-- chat_messages: 1 policy (ALL)
drop policy if exists "Users can CRUD own messages" on public.chat_messages;

create policy "Users can CRUD own messages"
  on public.chat_messages for all
  using ((select auth.uid()) = user_id);

-- ============================================================================
-- 2. FIX: function_search_path_mutable — Immutable search_path for handle_updated_at()
-- ============================================================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;
