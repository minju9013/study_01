---
name: navigation-component
description: Navigation 컴포넌트 구현 정보 — 탭 + 로그인/로그아웃 버튼 네비게이션 바
metadata:
  type: project
---

## 위치

`src/components/ui/Navigation/`

## Props

- `items: NavigationItem[]` — 탭 목록 (value + label)
- `activeItem?: string` — 선택된 탭 value
- `onItemChange?: (value: string) => void` — 탭 클릭 콜백
- `isLoggedIn?: boolean` — true이면 "로그아웃" 버튼, false이면 "로그인" 버튼
- `onAuthClick?: () => void` — 로그인/로그아웃 버튼 클릭 콜백

## 내부 구조

- `CategoryTab` — 개별 탭 (aria role="tab"), 선택 시 하단 파란 border-bottom 4px
- `Navigation` — 전체 nav (aria role="tablist" 포함) + Button(core-light, sm) 재사용

## 사용 토큰

- `--interactive-primary` — 선택 탭 border-bottom 색상
- `--text-primary` / `--text-disabled` — 탭 레이블 색상
- `--background-default` — nav 배경
- `--background-muted` — nav 하단 border 색상
- `--display-sm-bold` — 탭 레이블 typography
- `--spacing-8`, `--spacing-16`, `--spacing-2`, `--spacing-0`

## 누락 토큰

`4px solid transparent` — Figma CategoryTab 선택 indicator 두께, 토큰 미정의 (TODO 플래그 처리)

**Why:** Figma 디자인에서 탭 하단 강조선 두께가 4px로 고정되어 있으나 spacing 토큰에 없음.
