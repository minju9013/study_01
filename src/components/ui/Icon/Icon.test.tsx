import { describe, expect, it } from "vitest";
import { Icon, type IconName, type IconProps } from "./Icon";

const ALL_ICONS: IconName[] = [
  "iconview",
  "arrow-left",
  "arrow-right",
  "user",
  "ai",
  "dog",
  "eye-on",
  "eye-off",
  "design",
  "menu",
  "notification",
  "close",
  "search",
  "message",
  "heart-empty",
  "heart-fill",
  "bookmark-empty",
  "bookmark-fill",
  "check",
  "pencil",
  "google",
];

describe("Icon", () => {
  it("Icon 컴포넌트는 함수다", () => {
    expect(typeof Icon).toBe("function");
  });

  it("name prop은 필수다", () => {
    const props: IconProps = { name: "search" };
    expect(props.name).toBe("search");
  });

  it("size prop 기본값은 16이다", () => {
    const props: IconProps = { name: "search" };
    const { size = 16 } = props;
    expect(size).toBe(16);
  });

  it("color prop 기본값은 currentColor다", () => {
    const props: IconProps = { name: "search" };
    const { color = "currentColor" } = props;
    expect(color).toBe("currentColor");
  });

  it("모든 아이콘 이름이 IconName 타입에 포함된다", () => {
    expect(ALL_ICONS).toHaveLength(21);
  });

  it("arrow-left 아이콘 이름을 올바르게 지정할 수 있다", () => {
    const props: IconProps = { name: "arrow-left" };
    expect(props.name).toBe("arrow-left");
  });

  it("arrow-right 아이콘 이름을 올바르게 지정할 수 있다", () => {
    const props: IconProps = { name: "arrow-right" };
    expect(props.name).toBe("arrow-right");
  });

  it("heart-fill 아이콘 이름을 올바르게 지정할 수 있다", () => {
    const props: IconProps = { name: "heart-fill" };
    expect(props.name).toBe("heart-fill");
  });

  it("google 아이콘 이름을 올바르게 지정할 수 있다", () => {
    const props: IconProps = { name: "google" };
    expect(props.name).toBe("google");
  });

  it("className prop을 받는다", () => {
    const props: IconProps = { name: "search", className: "my-icon" };
    expect(props.className).toBe("my-icon");
  });

  it("aria-label prop을 받는다", () => {
    const props: IconProps = { name: "close", "aria-label": "닫기" };
    expect(props["aria-label"]).toBe("닫기");
  });

  it("title prop을 받는다", () => {
    const props: IconProps = { name: "search", title: "검색" };
    expect(props.title).toBe("검색");
  });

  it("size prop에 숫자를 전달할 수 있다", () => {
    const props: IconProps = { name: "search", size: 32 };
    expect(props.size).toBe(32);
  });

  it("color prop에 CSS 변수를 전달할 수 있다", () => {
    const props: IconProps = {
      name: "heart-fill",
      color: "var(--text-danger)",
    };
    expect(props.color).toBe("var(--text-danger)");
  });

  it("모든 아이콘 이름이 유효한 IconName 타입이다", () => {
    ALL_ICONS.forEach((name) => {
      const props: IconProps = { name };
      expect(props.name).toBe(name);
    });
  });
});
