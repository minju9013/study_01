---
name: project-test-runner
description: Vitest는 storybook 프로젝트 단일 구성 — .test.tsx는 수집 안 됨, 검증은 stories play function이 담당
metadata:
  type: project
---

이 프로젝트의 Vitest(`vite.config.ts`)는 `test.projects`에 **storybook 프로젝트 하나만** 등록돼 있고 `@storybook/addon-vitest` + Playwright 브라우저(chromium, headless) 모드로 돈다. include 패턴이 `*.stories.*` / `*.mdx`로 한정돼 있어 일반 `*.test.tsx` 파일은 **테스트 러너가 수집하지 않는다**.

또한 `package.json`에는 `typecheck` 스크립트가 없다(CLAUDE.md엔 언급되나 실제 부재). 타입 검증은 `npx tsc --noEmit -p tsconfig.app.json`으로 직접 실행. lint는 `npx eslint <path>`. 테스트는 `npx vitest run <story-name-or-path>`.

testing-library/react, jsdom/happy-dom 모두 미설치.

**Why:** 컴포넌트의 실제 DOM 상호작용(클릭→콜백, input→value) 검증은 `.test.tsx`가 아니라 **stories의 play function**(storybook/test의 userEvent/within/expect)이 브라우저에서 수행한다. `.test.tsx`는 4파일 세트 규칙 충족 + 컨트랙트(기본값/타입) 단위 검증용이며 DOM 렌더링을 하면 안 된다.

**How to apply:** 새 컴포넌트 검증 시 (1) `tsc --noEmit -p tsconfig.app.json`, (2) `eslint`, (3) `vitest run <Component>`로 stories 실행. 상호작용 테스트는 반드시 stories play function에 넣을 것. `.test.tsx`에서 `render()` 호출하지 말 것 — 수집되지도 않고 testing-library도 없다. 기존 [[feedback_test_pattern]] 참고.
