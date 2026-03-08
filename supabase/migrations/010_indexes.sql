-- Performance indexes for common queries
-- Subak Hijau dashboard queries optimization

-- Scores: used in dashboard overview, score page (latest by user)
CREATE INDEX IF NOT EXISTS idx_scores_user_created
  ON scores (user_id, created_at DESC);

-- Assessments: used in dashboard, assessment history
CREATE INDEX IF NOT EXISTS idx_assessments_user_status_created
  ON assessments (user_id, status, created_at DESC);

-- Roadmap items: used in progress tracking, completion stats
CREATE INDEX IF NOT EXISTS idx_roadmap_items_user_completed
  ON roadmap_items (user_id, is_completed);

-- Chat conversations: used in chat page (list by user, sorted by recent)
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_updated
  ON chat_conversations (user_id, updated_at DESC);

-- Chat messages: used when loading conversation messages
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_created
  ON chat_messages (conversation_id, created_at ASC);
