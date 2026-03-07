-- Auto-update updated_at timestamp function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger on_assessments_updated
  before update on public.assessments
  for each row execute function public.handle_updated_at();

create trigger on_chat_conversations_updated
  before update on public.chat_conversations
  for each row execute function public.handle_updated_at();

-- Performance indexes
create index idx_assessments_user_id on public.assessments(user_id);
create index idx_scores_user_id on public.scores(user_id);
create index idx_scores_assessment_id on public.scores(assessment_id);
create index idx_roadmaps_user_id on public.roadmaps(user_id);
create index idx_roadmap_items_roadmap_id on public.roadmap_items(roadmap_id);
create index idx_roadmap_items_user_id on public.roadmap_items(user_id);
create index idx_chat_conversations_user_id on public.chat_conversations(user_id);
create index idx_chat_messages_conversation_id on public.chat_messages(conversation_id);
create index idx_chat_messages_user_id on public.chat_messages(user_id);
