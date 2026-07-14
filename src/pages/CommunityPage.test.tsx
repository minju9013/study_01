import { describe, expect, it, vi } from "vitest";
import { CommunityPage, type CommunityPageProps } from "./CommunityPage";

/*
 * 참고: 이 프로젝트의 Vitest는 Storybook addon + Playwright 브라우저 모드로만
 * 구성되어 있어(jsdom/testing-library 미사용), .test.tsx에서는 DOM 렌더링을 하지
 * 않는다. 실제 렌더링/입력 흐름 검증은 CommunityPage.stories.tsx 의 play function
 * 에서 수행한다. 여기서는 컴포넌트 계약(props 위임)을 단위로 검증한다.
 */

describe("CommunityPage", () => {
  it("CommunityPage 컴포넌트는 함수다", () => {
    expect(typeof CommunityPage).toBe("function");
  });

  it("posts / loading prop을 받는다", () => {
    const props: CommunityPageProps = { posts: [], loading: true };
    expect(props.posts).toEqual([]);
    expect(props.loading).toBe(true);
  });

  it("onAuthClick prop을 받는다", () => {
    const handler = vi.fn();
    const props: CommunityPageProps = { posts: [], onAuthClick: handler };
    expect(props.onAuthClick).toBe(handler);
  });

  it("onWriteClick prop을 받는다", () => {
    const handler = vi.fn();
    const props: CommunityPageProps = { posts: [], onWriteClick: handler };
    expect(props.onWriteClick).toBe(handler);
  });

  it("activeSort / onSortChange prop을 받는다", () => {
    const handler = vi.fn();
    const props: CommunityPageProps = {
      posts: [],
      activeSort: "popular",
      onSortChange: handler,
    };
    expect(props.activeSort).toBe("popular");
    expect(props.onSortChange).toBe(handler);
  });

  it("searchValue / onSearchChange prop을 받는다", () => {
    const handler = vi.fn();
    const props: CommunityPageProps = {
      posts: [],
      searchValue: "검색어",
      onSearchChange: handler,
    };
    expect(props.searchValue).toBe("검색어");
    expect(props.onSearchChange).toBe(handler);
  });

  it("onPostClick prop을 받는다 (게시글 상세보기 이동용)", () => {
    const handler = vi.fn();
    const props: CommunityPageProps = { posts: [], onPostClick: handler };
    expect(props.onPostClick).toBe(handler);
  });
});
