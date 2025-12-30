-- ========================================
-- 테스트용 시드 데이터
-- ========================================

-- 개발/테스트용 태그 데이터
INSERT INTO tags (name) VALUES
  ('JavaScript'),
  ('TypeScript'),
  ('React'),
  ('Node.js'),
  ('Express'),
  ('Database'),
  ('Supabase'),
  ('PostgreSQL'),
  ('Frontend'),
  ('Backend')
ON CONFLICT (name) DO NOTHING;

-- 참고: Users와 Posts는 Supabase Auth를 통해 생성되므로
-- 시드 데이터로 추가하지 않습니다.
