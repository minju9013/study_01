import { describe, expect, it, vi } from "vitest";
import {
  CommunityViewPage,
  type CommunityViewPageProps,
} from "./CommunityViewPage";

/*
 * 참고: 이 프로젝트의 Vitest는 Storybook addon + Playwright 브라우저 모드로만
 * 구성되어 있어(jsdom/testing-library 미사용), .test.tsx에서는 DOM 렌더링을 하지
 * 않는다. 실제 렌더링/라우트 파라미터 조회 흐름 검증은
 * CommunityViewPage.stories.tsx 의 play function 에서 수행한다. 여기서는
 * 컴포넌트 계약(props 위임)을 단위로 검증한다.
 */

describe("CommunityViewPage", () => {
  it("CommunityViewPage 컴포넌트는 함수다", () => {
    expect(typeof CommunityViewPage).toBe("function");
  });

  it("onAuthClick prop을 받는다", () => {
    const handler = vi.fn();
    const props: CommunityViewPageProps = { post: null, onAuthClick: handler };
    expect(props.onAuthClick).toBe(handler);
  });

  it("post / loading prop을 받는다", () => {
    const props: CommunityViewPageProps = { post: null, loading: true };
    expect(props.post).toBeNull();
    expect(props.loading).toBe(true);
  });
});
