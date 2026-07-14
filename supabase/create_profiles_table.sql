-- 유저 프로필(profiles) 테이블 생성 — auth.users 확장
-- 실행 위치: Supabase 대시보드 > SQL Editor
-- 대상 프로젝트: vswrxwtxzmfatyzuzaom
-- 선행 조건: Supabase Auth(이메일/소셜 로그인) 활성화

create table public.profiles (
  -- auth.users와 1:1. 유저 삭제 시 프로필도 함께 삭제
  id uuid primary key references auth.users (id) on delete cascade,

  -- 조인 없이 조회하기 위한 캐시성 컬럼 (auth.users.email과 동기화)
  email text,
  nickname text,
  avatar_url text,

  -- 가입 경로: 'email' / 'google' / 'kakao' 등
  provider text,

  -- 권한/상태
  role text not null default 'user',
  status text not null default 'active',

  -- 약관 동의
  terms_agreed_at timestamptz,
  marketing_agreed boolean not null default false,

  -- 로그인 시각은 auth.users.last_sign_in_at을 그대로 사용 (중복 저장 안 함)
  -- 누적 로그인 횟수만 트리거로 별도 집계
  login_count integer not null default 0,

  -- 소프트 삭제 (탈퇴 처리). null이면 활성 계정
  deleted_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row Level Security 활성화
alter table public.profiles enable row level security;

-- 조회: 본인 프로필만
create policy "profiles_select_own"
  on public.profiles
  for select
  using (auth.uid() = id);

-- 수정: 본인 프로필만
create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- insert/delete 정책은 없음: 아래 트리거(security definer)로만 생성/삭제되며,
-- auth.users 삭제 시 on delete cascade로 자동 삭제됨

-- 회원가입 시 auth.users insert에 맞춰 profiles 행 자동 생성
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, provider)
  values (
    new.id,
    new.email,
    coalesce(new.raw_app_meta_data ->> 'provider', 'email')
  );
  return new;
end;
$$;

create trigger trg_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- 로그인 시 auth.users.last_sign_in_at 갱신에 맞춰 login_count 증가
create or replace function public.handle_user_sign_in()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set login_count = login_count + 1,
      updated_at = now()
  where id = new.id;
  return new;
end;
$$;

create trigger trg_auth_user_sign_in
after update of last_sign_in_at on auth.users
for each row execute function public.handle_user_sign_in();
