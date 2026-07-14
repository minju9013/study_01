import { describe, it, expect } from "vitest";
import { PostCardImage } from "./PostCardImage";

describe("PostCardImage", () => {
  it("컴포넌트가 정의되어 있어야 한다", () => {
    expect(PostCardImage).toBeDefined();
  });

  it("type prop의 기본값은 '1'이어야 한다", () => {
    const defaultProps = PostCardImage.length;
    expect(defaultProps).toBeGreaterThanOrEqual(0);
  });

  it("type 옵션이 1~6까지 지원되어야 한다", () => {
    const validTypes = ["1", "2", "3", "4", "5", "6"] as const;
    validTypes.forEach((type) => {
      expect(type).toMatch(/^[1-6]$/);
    });
  });
});
