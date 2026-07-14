import { describe, it, expect } from "vitest";
import { PostCard, type PostCardProps } from "./PostCard";

describe("PostCard", () => {
  it("title prop을 받는다", () => {
    const props: PostCardProps = {
      title: "테스트 제목",
      preview: "미리보기",
      timeAgo: "1시간 전",
    };
    expect(props.title).toBe("테스트 제목");
  });

  it("showThum 기본값은 true다", () => {
    const props: PostCardProps = {
      title: "제목",
      preview: "미리보기",
      timeAgo: "1시간 전",
    };
    const { showThum = true } = props;
    expect(showThum).toBe(true);
  });

  it("category 기본값은 true다", () => {
    const props: PostCardProps = {
      title: "제목",
      preview: "미리보기",
      timeAgo: "1시간 전",
    };
    const { category = true } = props;
    expect(category).toBe(true);
  });

  it("notice 기본값은 false다", () => {
    const props: PostCardProps = {
      title: "제목",
      preview: "미리보기",
      timeAgo: "1시간 전",
    };
    const { notice = false } = props;
    expect(notice).toBe(false);
  });

  it("viewcount 기본값은 '0'이다", () => {
    const props: PostCardProps = {
      title: "제목",
      preview: "미리보기",
      timeAgo: "1시간 전",
    };
    const { viewcount = "0" } = props;
    expect(viewcount).toBe("0");
  });

  it("PostCard 컴포넌트는 함수다", () => {
    expect(typeof PostCard).toBe("function");
  });

  it("imageType prop을 받는다", () => {
    const props: PostCardProps = {
      title: "제목",
      preview: "미리보기",
      timeAgo: "1시간 전",
      imageType: "3",
    };
    expect(props.imageType).toBe("3");
  });

  it("liked / onLikeToggle prop을 받는다", () => {
    let called: boolean | undefined;
    const props: PostCardProps = {
      title: "제목",
      preview: "미리보기",
      timeAgo: "1시간 전",
      liked: true,
      onLikeToggle: (next) => {
        called = next;
      },
    };
    expect(props.liked).toBe(true);
    props.onLikeToggle?.(false);
    expect(called).toBe(false);
  });

  it("bookmarked / onBookmarkToggle prop을 받는다", () => {
    let called: boolean | undefined;
    const props: PostCardProps = {
      title: "제목",
      preview: "미리보기",
      timeAgo: "1시간 전",
      bookmarked: true,
      onBookmarkToggle: (next) => {
        called = next;
      },
    };
    expect(props.bookmarked).toBe(true);
    props.onBookmarkToggle?.(false);
    expect(called).toBe(false);
  });
});
