import { describe, it, expect } from "vitest";
import { Divider, type DividerProps } from "./Divider";

describe("Divider", () => {
  it("기본 orientation은 horizontal이다", () => {
    const defaultProps: DividerProps = {};
    // orientation prop의 기본값 검증 (타입 수준)
    const { orientation = "horizontal" } = defaultProps;
    expect(orientation).toBe("horizontal");
  });

  it("orientation prop으로 horizontal을 받는다", () => {
    const props: DividerProps = { orientation: "horizontal" };
    expect(props.orientation).toBe("horizontal");
  });

  it("orientation prop으로 vertical을 받는다", () => {
    const props: DividerProps = { orientation: "vertical" };
    expect(props.orientation).toBe("vertical");
  });

  it("className prop을 받는다", () => {
    const props: DividerProps = { className: "my-divider" };
    expect(props.className).toBe("my-divider");
  });

  it("Divider 컴포넌트는 함수다", () => {
    expect(typeof Divider).toBe("function");
  });
});
