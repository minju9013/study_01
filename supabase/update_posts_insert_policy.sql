-- posts insert 정책 강화 — 로그인한 본인만 자신의 user_id로 글쓰기 가능
-- 실행 위치: Supabase 대시보드 > SQL Editor
-- 대상 프로젝트: vswrxwtxzmfatyzuzaom
-- 배경: create_posts_table.sql의 posts_insert_anon(with check true)은
--       인증 연동 전 임시로 열어둔 정책. 이제 글쓰기 화면 자체가 로그인한
--       사용자만 접근 가능해졌으므로, DB 레벨에서도 본인 user_id로만
--       insert 가능하도록 제한한다. (auth.uid()가 없는 익명 요청이거나
--       다른 사람의 user_id를 사칭하는 요청은 차단됨)

drop policy if exists "posts_insert_anon" on public.posts;

create policy "posts_insert_own"
  on public.posts
  for insert
  with check (auth.uid() = user_id);
