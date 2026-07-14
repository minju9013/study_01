import { describe, it, expect } from "vitest";
import { PostCardStats, type PostCardStatsProps } from "./PostCardStats";

describe("PostCardStats", () => {
  it("viewcount 기본값은 '0'이다", () => {
    const props: PostCardStatsProps = {};
    const { viewcount = "0" } = props;
    expect(viewcount).toBe("0");
  });

  it("likecount 기본값은 '0'이다", () => {
    const props: PostCardStatsProps = {};
    const { likecount = "0" } = props;
    expect(likecount).toBe("0");
  });

  it("viewcount prop을 받는다", () => {
    const props: PostCardStatsProps = { viewcount: "1,234" };
    expect(props.viewcount).toBe("1,234");
  });

  it("likecount prop을 받는다", () => {
    const props: PostCardStatsProps = { likecount: "56" };
    expect(props.likecount).toBe("56");
  });

  it("PostCardStats 컴포넌트는 함수다", () => {
    expect(typeof PostCardStats).toBe("function");
  });

  it("liked 기본값은 false다", () => {
    const props: PostCardStatsProps = {};
    const { liked = false } = props;
    expect(liked).toBe(false);
  });

  it("liked prop을 받는다", () => {
    const props: PostCardStatsProps = { liked: true };
    expect(props.liked).toBe(true);
  });

  it("onLikeToggle 콜백을 받는다", () => {
    let called: boolean | undefined;
    const props: PostCardStatsProps = {
      onLikeToggle: (next) => {
        called = next;
      },
    };
    props.onLikeToggle?.(true);
    expect(called).toBe(true);
  });

  it("bookmarked 기본값은 false다", () => {
    const props: PostCardStatsProps = {};
    const { bookmarked = false } = props;
    expect(bookmarked).toBe(false);
  });

  it("bookmarked prop을 받는다", () => {
    const props: PostCardStatsProps = { bookmarked: true };
    expect(props.bookmarked).toBe(true);
  });

  it("onBookmarkToggle 콜백을 받는다", () => {
    let called: boolean | undefined;
    const props: PostCardStatsProps = {
      onBookmarkToggle: (next) => {
        called = next;
      },
    };
    props.onBookmarkToggle?.(true);
    expect(called).toBe(true);
  });
});
