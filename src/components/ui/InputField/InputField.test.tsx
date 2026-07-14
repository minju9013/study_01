import { describe, expect, it, vi } from "vitest";
import {
  InputField,
  type InputFieldProps,
  type InputFieldVisualState,
} from "./InputField";

const ALL_VISUAL_STATES: InputFieldVisualState[] = [
  "default",
  "error",
  "disabled",
];

describe("InputField", () => {
  it("InputField 컴포넌트는 함수다", () => {
    expect(typeof InputField).toBe("function");
  });

  it("visualState 기본값은 default다", () => {
    const props: InputFieldProps = {};
    const { visualState = "default" } = props;
    expect(visualState).toBe("default");
  });

  it("type 기본값은 text다", () => {
    const props: InputFieldProps = {};
    const { type = "text" } = props;
    expect(type).toBe("text");
  });

  it("label prop을 받는다", () => {
    const props: InputFieldProps = { label: "이메일" };
    expect(props.label).toBe("이메일");
  });

  it("placeholder prop을 받는다", () => {
    const props: InputFieldProps = { placeholder: "이메일을 입력해주세요" };
    expect(props.placeholder).toBe("이메일을 입력해주세요");
  });

  it("helptext prop을 받는다", () => {
    const props: InputFieldProps = { helptext: "올바른 형식을 입력해주세요" };
    expect(props.helptext).toBe("올바른 형식을 입력해주세요");
  });

  it("value prop을 받는다", () => {
    const props: InputFieldProps = { value: "test@example.com" };
    expect(props.value).toBe("test@example.com");
  });

  it("id prop을 받는다", () => {
    const props: InputFieldProps = { id: "email-input" };
    expect(props.id).toBe("email-input");
  });

  it("className prop을 받는다", () => {
    const props: InputFieldProps = { className: "my-input" };
    expect(props.className).toBe("my-input");
  });

  it("onChange prop을 받는다", () => {
    const handler = vi.fn();
    const props: InputFieldProps = { onChange: handler };
    expect(props.onChange).toBe(handler);
  });

  it("visualState에 error를 전달할 수 있다", () => {
    const props: InputFieldProps = { visualState: "error" };
    expect(props.visualState).toBe("error");
  });

  it("visualState에 disabled를 전달할 수 있다", () => {
    const props: InputFieldProps = { visualState: "disabled" };
    expect(props.visualState).toBe("disabled");
  });

  it("type에 password를 전달할 수 있다", () => {
    const props: InputFieldProps = { type: "password" };
    expect(props.type).toBe("password");
  });

  it("type에 email을 전달할 수 있다", () => {
    const props: InputFieldProps = { type: "email" };
    expect(props.type).toBe("email");
  });

  it("모든 visualState 값이 InputFieldVisualState 타입에 포함된다", () => {
    expect(ALL_VISUAL_STATES).toHaveLength(3);
  });

  it("모든 visualState를 순회하며 타입으로 할당할 수 있다", () => {
    ALL_VISUAL_STATES.forEach((state) => {
      const props: InputFieldProps = { visualState: state };
      expect(props.visualState).toBe(state);
    });
  });
});
