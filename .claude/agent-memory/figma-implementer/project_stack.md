---
name: project-stack
description: 프로젝트 기술 스택, 토큰 위치, 테스트 환경 상세 — 컴포넌트 구현 전 반드시 확인
metadata:
  type: project
---

## 기술 스택

- React 19 + TypeScript 5.x
- Tailwind v4 (CSS-first, @tailwindcss/vite plugin)
- Storybook 8 + @storybook/addon-vitest (play function 기반 테스트)
- Vitest + @vitest/browser-playwright (브라우저 테스트)

## 토큰 파일 위치

- `src/tokens/colors.css` — Primitive(blue/gray/red) + Semantic(text/background/border/interactive/content)
- `src/tokens/spacing.css` — spacing, radius, font-size, line-height, font-weight, font-family, composite tokens
- `_generated.css` 파일은 존재하지 않음 (CLAUDE.md에 명시되어 있으나 실제로는 colors.css + spacing.css가 분리됨)

## 컴포넌트 디렉토리

- `src/components/ui/` — 첫 컴포넌트(Divider) 구현 시점에 신규 생성됨 (이전에는 없었음)
- 4파일 세트: `.tsx` / `.stories.tsx` / `.test.tsx` / `index.ts`

## 설치된 테스트 패키지

- `@testing-library/react` NOT 설치 (사용 불가)
- `@storybook/test` NOT 설치 (사용 불가)
- `storybook/test` — 사용 가능 (within, expect, userEvent 등 import)
- `.test.tsx`에서는 vitest native API만 사용 또는 story에서 play function으로 대체

**Why:** 이 프로젝트는 Storybook Vitest addon을 통해 story play function으로 컴포넌트를 테스트하는 방식 채택.

**How to apply:** stories 파일에서 `import { expect, within } from "storybook/test"`, test 파일에서 `import { describe, it, expect } from "vitest"` 사용.
