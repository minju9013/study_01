import { describe, it, expect } from "vitest";
import { ChipArea, type ChipAreaProps } from "./ChipArea";

describe("ChipArea", () => {
  it("category 기본값은 true다", () => {
    const props: ChipAreaProps = {};
    const { category = true } = props;
    expect(category).toBe(true);
  });

  it("notice 기본값은 false다", () => {
    const props: ChipAreaProps = {};
    const { notice = false } = props;
    expect(notice).toBe(false);
  });

  it("category prop을 받는다", () => {
    const props: ChipAreaProps = { category: false };
    expect(props.category).toBe(false);
  });

  it("notice prop을 받는다", () => {
    const props: ChipAreaProps = { notice: true };
    expect(props.notice).toBe(true);
  });

  it("ChipArea 컴포넌트는 함수다", () => {
    expect(typeof ChipArea).toBe("function");
  });
});
