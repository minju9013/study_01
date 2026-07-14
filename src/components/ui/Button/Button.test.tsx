import { describe, expect, it } from "vitest";
import {
  Button,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
} from "./Button";

const ALL_VARIANTS: ButtonVariant[] = [
  "core",
  "core-light",
  "mono",
  "mono-light",
  "warning",
  "warning-light",
  "outline",
];

const ALL_SIZES: ButtonSize[] = ["sm", "md", "lg"];

describe("Button", () => {
  it("Button 컴포넌트는 함수다", () => {
    expect(typeof Button).toBe("function");
  });

  it("size prop 기본값은 md다", () => {
    const props: ButtonProps = {};
    const { size = "md" } = props;
    expect(size).toBe("md");
  });

  it("variant prop 기본값은 core다", () => {
    const props: ButtonProps = {};
    const { variant = "core" } = props;
    expect(variant).toBe("core");
  });

  it("iconOnly prop 기본값은 false다", () => {
    const props: ButtonProps = {};
    const { iconOnly = false } = props;
    expect(iconOnly).toBe(false);
  });

  it("disabled prop 기본값은 false다", () => {
    const props: ButtonProps = {};
    const { disabled = false } = props;
    expect(disabled).toBe(false);
  });

  it("모든 variant 값이 ButtonVariant 타입에 포함된다", () => {
    expect(ALL_VARIANTS).toHaveLength(7);
  });

  it("모든 size 값이 ButtonSize 타입에 포함된다", () => {
    expect(ALL_SIZES).toHaveLength(3);
  });

  it("variant prop에 core를 전달할 수 있다", () => {
    const props: ButtonProps = { variant: "core" };
    expect(props.variant).toBe("core");
  });

  it("variant prop에 core-light를 전달할 수 있다", () => {
    const props: ButtonProps = { variant: "core-light" };
    expect(props.variant).toBe("core-light");
  });

  it("variant prop에 mono를 전달할 수 있다", () => {
    const props: ButtonProps = { variant: "mono" };
    expect(props.variant).toBe("mono");
  });

  it("variant prop에 mono-light를 전달할 수 있다", () => {
    const props: ButtonProps = { variant: "mono-light" };
    expect(props.variant).toBe("mono-light");
  });

  it("variant prop에 warning을 전달할 수 있다", () => {
    const props: ButtonProps = { variant: "warning" };
    expect(props.variant).toBe("warning");
  });

  it("variant prop에 warning-light를 전달할 수 있다", () => {
    const props: ButtonProps = { variant: "warning-light" };
    expect(props.variant).toBe("warning-light");
  });

  it("variant prop에 outline을 전달할 수 있다", () => {
    const props: ButtonProps = { variant: "outline" };
    expect(props.variant).toBe("outline");
  });

  it("size prop에 sm을 전달할 수 있다", () => {
    const props: ButtonProps = { size: "sm" };
    expect(props.size).toBe("sm");
  });

  it("size prop에 md를 전달할 수 있다", () => {
    const props: ButtonProps = { size: "md" };
    expect(props.size).toBe("md");
  });

  it("size prop에 lg를 전달할 수 있다", () => {
    const props: ButtonProps = { size: "lg" };
    expect(props.size).toBe("lg");
  });

  it("icon prop을 받는다", () => {
    const props: ButtonProps = { icon: "search" };
    expect(props.icon).toBe("search");
  });

  it("iconOnly prop을 받는다", () => {
    const props: ButtonProps = { icon: "close", iconOnly: true };
    expect(props.iconOnly).toBe(true);
  });

  it("disabled prop을 받는다", () => {
    const props: ButtonProps = { disabled: true };
    expect(props.disabled).toBe(true);
  });

  it("className prop을 받는다", () => {
    const props: ButtonProps = { className: "my-button" };
    expect(props.className).toBe("my-button");
  });

  it("children prop을 받는다", () => {
    const props: ButtonProps = { children: "Button" };
    expect(props.children).toBe("Button");
  });

  it("onClick prop을 받는다", () => {
    const handler = () => {};
    const props: ButtonProps = { onClick: handler };
    expect(props.onClick).toBe(handler);
  });

  it("모든 variant를 순회하며 ButtonVariant 타입으로 할당할 수 있다", () => {
    ALL_VARIANTS.forEach((variant) => {
      const props: ButtonProps = { variant };
      expect(props.variant).toBe(variant);
    });
  });

  it("모든 size를 순회하며 ButtonSize 타입으로 할당할 수 있다", () => {
    ALL_SIZES.forEach((size) => {
      const props: ButtonProps = { size };
      expect(props.size).toBe(size);
    });
  });
});
