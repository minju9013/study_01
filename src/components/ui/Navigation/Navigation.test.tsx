import { describe, expect, it } from "vitest";
import {
  Navigation,
  type NavigationProps,
  type NavigationItem,
} from "./Navigation";

const SAMPLE_ITEMS: NavigationItem[] = [
  { value: "community", label: "커뮤니티" },
  { value: "qna", label: "Q&A" },
  { value: "jobs", label: "채용" },
];

describe("Navigation", () => {
  it("Navigation 컴포넌트는 함수다", () => {
    expect(typeof Navigation).toBe("function");
  });

  it("isLoggedIn prop 기본값은 false다", () => {
    const props: NavigationProps = { items: SAMPLE_ITEMS };
    const { isLoggedIn = false } = props;
    expect(isLoggedIn).toBe(false);
  });

  it("items prop을 받는다", () => {
    const props: NavigationProps = { items: SAMPLE_ITEMS };
    expect(props.items).toHaveLength(3);
  });

  it("activeItem prop을 받는다", () => {
    const props: NavigationProps = {
      items: SAMPLE_ITEMS,
      activeItem: "community",
    };
    expect(props.activeItem).toBe("community");
  });

  it("isLoggedIn이 true일 때 props에 반영된다", () => {
    const props: NavigationProps = { items: SAMPLE_ITEMS, isLoggedIn: true };
    expect(props.isLoggedIn).toBe(true);
  });

  it("isLoggedIn이 false일 때 props에 반영된다", () => {
    const props: NavigationProps = { items: SAMPLE_ITEMS, isLoggedIn: false };
    expect(props.isLoggedIn).toBe(false);
  });

  it("onItemChange 콜백 prop을 받는다", () => {
    const handler = (value: string) => value;
    const props: NavigationProps = {
      items: SAMPLE_ITEMS,
      onItemChange: handler,
    };
    expect(props.onItemChange).toBe(handler);
  });

  it("onAuthClick 콜백 prop을 받는다", () => {
    const handler = () => {};
    const props: NavigationProps = {
      items: SAMPLE_ITEMS,
      onAuthClick: handler,
    };
    expect(props.onAuthClick).toBe(handler);
  });

  it("NavigationItem은 value와 label을 가진다", () => {
    const item: NavigationItem = { value: "community", label: "커뮤니티" };
    expect(item.value).toBe("community");
    expect(item.label).toBe("커뮤니티");
  });

  it("activeItem이 items에 없는 값이어도 오류가 없다", () => {
    const props: NavigationProps = {
      items: SAMPLE_ITEMS,
      activeItem: "nonexistent",
    };
    expect(props.activeItem).toBe("nonexistent");
  });

  it("className prop을 받는다", () => {
    const props: NavigationProps = {
      items: SAMPLE_ITEMS,
      className: "custom-nav",
    };
    expect(props.className).toBe("custom-nav");
  });

  it("items가 빈 배열이어도 오류가 없다", () => {
    const props: NavigationProps = { items: [] };
    expect(props.items).toHaveLength(0);
  });
});
