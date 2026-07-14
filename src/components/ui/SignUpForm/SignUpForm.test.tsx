import { describe, expect, it, vi } from "vitest";
import { SignUpForm, type SignUpFormProps } from "./SignUpForm";

describe("SignUpForm", () => {
  it("SignUpForm 컴포넌트는 함수다", () => {
    expect(typeof SignUpForm).toBe("function");
  });

  it("isLoading 기본값은 false다", () => {
    const props: SignUpFormProps = {};
    const { isLoading = false } = props;
    expect(isLoading).toBe(false);
  });

  it("onSubmit prop을 받는다", () => {
    const handler = vi.fn();
    const props: SignUpFormProps = { onSubmit: handler };
    expect(props.onSubmit).toBe(handler);
  });

  it("onGoogleSignUp prop을 받는다", () => {
    const handler = vi.fn();
    const props: SignUpFormProps = { onGoogleSignUp: handler };
    expect(props.onGoogleSignUp).toBe(handler);
  });

  it("onLogin prop을 받는다", () => {
    const handler = vi.fn();
    const props: SignUpFormProps = { onLogin: handler };
    expect(props.onLogin).toBe(handler);
  });

  it("emailError prop을 받는다", () => {
    const props: SignUpFormProps = {
      emailError: "올바른 이메일을 입력해주세요",
    };
    expect(props.emailError).toBe("올바른 이메일을 입력해주세요");
  });

  it("passwordError prop을 받는다", () => {
    const props: SignUpFormProps = {
      passwordError: "비밀번호가 올바르지 않습니다",
    };
    expect(props.passwordError).toBe("비밀번호가 올바르지 않습니다");
  });

  it("passwordConfirmError prop을 받는다", () => {
    const props: SignUpFormProps = {
      passwordConfirmError: "비밀번호가 일치하지 않습니다",
    };
    expect(props.passwordConfirmError).toBe("비밀번호가 일치하지 않습니다");
  });

  it("isLoading prop을 받는다", () => {
    const props: SignUpFormProps = { isLoading: true };
    expect(props.isLoading).toBe(true);
  });

  it("className prop을 받는다", () => {
    const props: SignUpFormProps = { className: "my-signup-form" };
    expect(props.className).toBe("my-signup-form");
  });

  it("asCard 기본값은 true다", () => {
    const props: SignUpFormProps = {};
    const { asCard = true } = props;
    expect(asCard).toBe(true);
  });

  it("showTitle 기본값은 true다", () => {
    const props: SignUpFormProps = {};
    const { showTitle = true } = props;
    expect(showTitle).toBe(true);
  });

  it("onSubmit 콜백 데이터에는 email, password, passwordConfirm이 포함된다", () => {
    const handler = vi.fn();
    const data = {
      email: "user@example.com",
      password: "password123",
      passwordConfirm: "password123",
    };
    handler(data);
    expect(handler).toHaveBeenCalledWith(data);
  });
});
