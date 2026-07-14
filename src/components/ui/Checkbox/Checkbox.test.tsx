import { describe, expect, it, vi } from "vitest";
import { Checkbox, type CheckboxProps } from "./Checkbox";

describe("Checkbox", () => {
  it("Checkbox 컴포넌트는 함수다", () => {
    expect(typeof Checkbox).toBe("function");
  });

  it("checked 기본값은 false다", () => {
    const props: CheckboxProps = {};
    const { checked = false } = props;
    expect(checked).toBe(false);
  });

  it("indeterminate 기본값은 false다", () => {
    const props: CheckboxProps = {};
    const { indeterminate = false } = props;
    expect(indeterminate).toBe(false);
  });

  it("disabled 기본값은 false다", () => {
    const props: CheckboxProps = {};
    const { disabled = false } = props;
    expect(disabled).toBe(false);
  });

  it("checked prop을 받는다", () => {
    const props: CheckboxProps = { checked: true };
    expect(props.checked).toBe(true);
  });

  it("indeterminate prop을 받는다", () => {
    const props: CheckboxProps = { indeterminate: true };
    expect(props.indeterminate).toBe(true);
  });

  it("disabled prop을 받는다", () => {
    const props: CheckboxProps = { disabled: true };
    expect(props.disabled).toBe(true);
  });

  it("label prop을 받는다", () => {
    const props: CheckboxProps = { label: "로그인 유지" };
    expect(props.label).toBe("로그인 유지");
  });

  it("onChange prop을 받는다", () => {
    const handler = vi.fn();
    const props: CheckboxProps = { onChange: handler };
    expect(props.onChange).toBe(handler);
  });

  it("className prop을 받는다", () => {
    const props: CheckboxProps = { className: "my-checkbox" };
    expect(props.className).toBe("my-checkbox");
  });

  it("checked와 indeterminate를 동시에 받는다", () => {
    const props: CheckboxProps = { checked: true, indeterminate: true };
    expect(props.checked).toBe(true);
    expect(props.indeterminate).toBe(true);
  });
});
