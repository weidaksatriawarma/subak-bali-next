-- Chat Conversations table
create table if not exists public.chat_conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text default 'Percakapan Baru',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.chat_conversations enable row level security;

do $$ begin
  create policy "Users can CRUD own conversations"
    on public.chat_conversations for all
    using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

-- Chat Messages table
create table if not exists public.chat_messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.chat_conversations(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text not null,                    -- 'user', 'assistant'
  content text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.chat_messages enable row level security;

do $$ begin
  create policy "Users can CRUD own messages"
    on public.chat_messages for all
    using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

-- Performance indexes
create index if not exists idx_chat_conversations_user_id on public.chat_conversations(user_id, updated_at desc);
create index if not exists idx_chat_messages_conversation_id on public.chat_messages(conversation_id, created_at asc);
create index if not exists idx_chat_messages_user_id on public.chat_messages(user_id);
