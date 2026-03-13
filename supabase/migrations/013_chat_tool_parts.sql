-- Add tool_parts column for persisting AI tool results in chat messages
ALTER TABLE public.chat_messages
  ADD COLUMN IF NOT EXISTS tool_parts jsonb DEFAULT NULL;
