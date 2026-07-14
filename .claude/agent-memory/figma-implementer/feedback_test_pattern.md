---
name: feedback-test-pattern
description: stories/test 파일 import 패턴 — @storybook/test 대신 storybook/test 사용
metadata:
  type: feedback
---

stories 파일에서 play function 작성 시 `storybook/test`에서 import해야 한다.
`@storybook/test`는 이 프로젝트에 설치되어 있지 않아 빌드 에러 발생.

**Why:** 프로젝트가 Storybook 10.x + @storybook/addon-vitest 조합을 사용하며, 이 버전에서는 `storybook/test`가 올바른 진입점.

**How to apply:**

- stories 파일: `import { expect, within, userEvent } from "storybook/test"`
- test 파일: `@testing-library/react` 없이 vitest native API만 사용하거나 play function으로 대체
- Meta import: `import type { Meta, StoryObj } from "@storybook/react-vite"` (not "@storybook/react")
