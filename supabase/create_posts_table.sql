-- 커뮤니티 게시글(posts) 테이블 생성
-- 실행 위치: Supabase 대시보드 > SQL Editor
-- 대상 프로젝트: vswrxwtxzmfatyzuzaom

create table public.posts (
  id uuid primary key default gen_random_uuid(),

  -- 작성자 (인증 연동 전이라 nullable, 추후 auth.uid()로 채움)
  user_id uuid references auth.users (id) on delete set null,
  author_name text not null,
  author_role text not null,

  -- 본문
  title text not null,
  preview text not null,
  content text not null,

  -- 칩 표시 여부 (기존 PostCardProps.category/notice와 동일한 boolean 구조)
  notice boolean not null default false,
  category boolean not null default true,

  -- 썸네일 프리셋 (1~6, 로컬 번들 이미지 매칭용 — 업로드 파일 아님)
  image_type text check (image_type in ('1', '2', '3', '4', '5', '6')),

  -- 통계
  view_count integer not null default 0,
  like_count integer not null default 0,

  created_at timestamptz not null default now()
);

-- Row Level Security 활성화
alter table public.posts enable row level security;

-- 조회: 누구나 가능
create policy "posts_select_all"
  on public.posts
  for select
  using (true);

-- 작성: 누구나 가능 (임시 — 인증 연동 후 auth.uid() = user_id 조건으로 교체 예정)
create policy "posts_insert_anon"
  on public.posts
  for insert
  with check (true);
