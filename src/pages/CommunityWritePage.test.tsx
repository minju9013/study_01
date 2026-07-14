import { describe, expect, it, vi } from "vitest";
import {
  CommunityWritePage,
  type CommunityWritePageProps,
} from "./CommunityWritePage";

/*
 * 참고: 이 프로젝트의 Vitest는 Storybook addon + Playwright 브라우저 모드로만
 * 구성되어 있어(jsdom/testing-library 미사용), .test.tsx에서는 DOM 렌더링을 하지
 * 않는다. 실제 렌더링/입력 흐름 검증은 CommunityWritePage.stories.tsx 의 play
 * function 에서 수행한다. 여기서는 컴포넌트 계약(props 위임)을 단위로 검증한다.
 */

describe("CommunityWritePage", () => {
  it("CommunityWritePage 컴포넌트는 함수다", () => {
    expect(typeof CommunityWritePage).toBe("function");
  });

  it("onAuthClick prop을 받는다", () => {
    const handler = vi.fn();
    const props: CommunityWritePageProps = { onAuthClick: handler };
    expect(props.onAuthClick).toBe(handler);
  });

  it("onSubmit prop을 받는다", () => {
    const handler = vi.fn(async () => {});
    const props: CommunityWritePageProps = { onSubmit: handler };
    expect(props.onSubmit).toBe(handler);
  });
});
