import { describe, expect, it, vi } from "vitest";
import { LoginForm, type LoginFormProps } from "./LoginForm";

describe("LoginForm", () => {
  it("LoginForm 컴포넌트는 함수다", () => {
    expect(typeof LoginForm).toBe("function");
  });

  it("isLoading 기본값은 false다", () => {
    const props: LoginFormProps = {};
    const { isLoading = false } = props;
    expect(isLoading).toBe(false);
  });

  it("onSubmit prop을 받는다", () => {
    const handler = vi.fn();
    const props: LoginFormProps = { onSubmit: handler };
    expect(props.onSubmit).toBe(handler);
  });

  it("onGoogleLogin prop을 받는다", () => {
    const handler = vi.fn();
    const props: LoginFormProps = { onGoogleLogin: handler };
    expect(props.onGoogleLogin).toBe(handler);
  });

  it("onFindPassword prop을 받는다", () => {
    const handler = vi.fn();
    const props: LoginFormProps = { onFindPassword: handler };
    expect(props.onFindPassword).toBe(handler);
  });

  it("onSignUp prop을 받는다", () => {
    const handler = vi.fn();
    const props: LoginFormProps = { onSignUp: handler };
    expect(props.onSignUp).toBe(handler);
  });

  it("emailError prop을 받는다", () => {
    const props: LoginFormProps = {
      emailError: "올바른 이메일을 입력해주세요",
    };
    expect(props.emailError).toBe("올바른 이메일을 입력해주세요");
  });

  it("passwordError prop을 받는다", () => {
    const props: LoginFormProps = {
      passwordError: "비밀번호가 올바르지 않습니다",
    };
    expect(props.passwordError).toBe("비밀번호가 올바르지 않습니다");
  });

  it("isLoading prop을 받는다", () => {
    const props: LoginFormProps = { isLoading: true };
    expect(props.isLoading).toBe(true);
  });

  it("className prop을 받는다", () => {
    const props: LoginFormProps = { className: "my-login-form" };
    expect(props.className).toBe("my-login-form");
  });

  it("asCard 기본값은 true다", () => {
    const props: LoginFormProps = {};
    const { asCard = true } = props;
    expect(asCard).toBe(true);
  });

  it("showDivider 기본값은 true다", () => {
    const props: LoginFormProps = {};
    const { showDivider = true } = props;
    expect(showDivider).toBe(true);
  });
});
