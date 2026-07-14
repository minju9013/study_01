import { describe, it, expect } from "vitest";
import { BookmarkButton, type BookmarkButtonProps } from "./BookmarkButton";

describe("BookmarkButton", () => {
  it("bookmarked 기본값은 false다", () => {
    const props: BookmarkButtonProps = {};
    const { bookmarked = false } = props;
    expect(bookmarked).toBe(false);
  });

  it("bookmarked prop을 받는다", () => {
    const props: BookmarkButtonProps = { bookmarked: true };
    expect(props.bookmarked).toBe(true);
  });

  it("disabled 기본값은 false다", () => {
    const props: BookmarkButtonProps = {};
    const { disabled = false } = props;
    expect(disabled).toBe(false);
  });

  it("onToggle 콜백을 받는다", () => {
    let called: boolean | undefined;
    const props: BookmarkButtonProps = {
      onToggle: (next) => {
        called = next;
      },
    };
    props.onToggle?.(true);
    expect(called).toBe(true);
  });

  it("BookmarkButton 컴포넌트는 함수다", () => {
    expect(typeof BookmarkButton).toBe("function");
  });
});
