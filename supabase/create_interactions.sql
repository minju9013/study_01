-- 좋아요 / 북마크 / 조회수 증가 지원
-- 실행 위치: Supabase 대시보드 > SQL Editor
-- 선행 조건: create_posts_table.sql 을 먼저 실행했어야 함
-- 주의: 아직 인증 연동 전이라 visitor_id(브라우저 로컬 익명 ID) 기준으로만 구분함
--       (posts_insert_anon 정책과 동일한 급의 임시 한계)

create table public.likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  visitor_id text not null,
  created_at timestamptz not null default now(),
  unique (post_id, visitor_id)
);

create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  visitor_id text not null,
  created_at timestamptz not null default now(),
  unique (post_id, visitor_id)
);

alter table public.likes enable row level security;
alter table public.bookmarks enable row level security;

create policy "likes_select_all" on public.likes for select using (true);
create policy "likes_insert_anon" on public.likes for insert with check (true);
create policy "likes_delete_anon" on public.likes for delete using (true);

create policy "bookmarks_select_all" on public.bookmarks for select using (true);
create policy "bookmarks_insert_anon" on public.bookmarks for insert with check (true);
create policy "bookmarks_delete_anon" on public.bookmarks for delete using (true);

-- likes insert/delete 시 posts.like_count 자동 동기화
-- security definer: posts 테이블엔 update 정책이 없어서(의도적으로 열어두지 않음),
-- 이 함수 안에서만 예외적으로 posts.like_count 갱신을 허용하기 위함
create or replace function public.sync_post_like_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update public.posts set like_count = like_count + 1 where id = new.post_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.posts set like_count = like_count - 1 where id = old.post_id;
    return old;
  end if;
  return null;
end;
$$;

create trigger trg_likes_sync_count
after insert or delete on public.likes
for each row execute function public.sync_post_like_count();

-- 조회수 증가 (원자적 update). posts에 update 정책이 없으므로 RPC로만 허용.
create or replace function public.increment_view_count(post_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.posts set view_count = view_count + 1 where id = post_id;
end;
$$;

grant execute on function public.increment_view_count(uuid) to anon, authenticated;
