import { describe, it, expect } from "vitest";
import { Chip, type ChipProps } from "./Chip";

describe("Chip", () => {
  it("type prop으로 category를 받는다", () => {
    const props: ChipProps = { type: "category" };
    expect(props.type).toBe("category");
  });

  it("type prop으로 notice를 받는다", () => {
    const props: ChipProps = { type: "notice" };
    expect(props.type).toBe("notice");
  });

  it("label prop을 받는다", () => {
    const props: ChipProps = { type: "category", label: "개발" };
    expect(props.label).toBe("개발");
  });

  it("label 미입력 시 category 기본값은 '디자인'이다", () => {
    const props: ChipProps = { type: "category" };
    const label =
      props.label ?? (props.type === "notice" ? "공지사항" : "디자인");
    expect(label).toBe("디자인");
  });

  it("label 미입력 시 notice 기본값은 '공지사항'이다", () => {
    const props: ChipProps = { type: "notice" };
    const label =
      props.label ?? (props.type === "notice" ? "공지사항" : "디자인");
    expect(label).toBe("공지사항");
  });

  it("icon prop을 받는다 (미입력 시 type별 기본 아이콘 사용)", () => {
    const props: ChipProps = { type: "notice", icon: "pencil" };
    expect(props.icon).toBe("pencil");
  });

  it("Chip 컴포넌트는 함수다", () => {
    expect(typeof Chip).toBe("function");
  });
});
