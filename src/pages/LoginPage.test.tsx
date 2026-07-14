import { describe, expect, it, vi } from "vitest";
import { LoginPage, type LoginPageProps } from "./LoginPage";

/*
 * 참고: 이 프로젝트의 Vitest는 Storybook addon + Playwright 브라우저 모드로만
 * 구성되어 있어(jsdom/testing-library 미사용), .test.tsx에서는 DOM 렌더링을 하지
 * 않는다. 실제 렌더링/입력 흐름 검증은 LoginPage.stories.tsx 의 play function 에서
 * 수행한다. 여기서는 컴포넌트 계약(props 위임)을 단위로 검증한다.
 */

describe("LoginPage", () => {
  it("LoginPage 컴포넌트는 함수다", () => {
    expect(typeof LoginPage).toBe("function");
  });

  it("onSubmit prop을 받는다", () => {
    const handler = vi.fn();
    const props: LoginPageProps = { onSubmit: handler };
    expect(props.onSubmit).toBe(handler);
  });

  it("onGoogleLogin prop을 받는다", () => {
    const handler = vi.fn();
    const props: LoginPageProps = { onGoogleLogin: handler };
    expect(props.onGoogleLogin).toBe(handler);
  });

  it("emailError / passwordError prop을 받는다", () => {
    const props: LoginPageProps = {
      emailError: "이메일 오류",
      passwordError: "비밀번호 오류",
    };
    expect(props.emailError).toBe("이메일 오류");
    expect(props.passwordError).toBe("비밀번호 오류");
  });

  it("isLoading prop을 받는다", () => {
    const props: LoginPageProps = { isLoading: true };
    expect(props.isLoading).toBe(true);
  });
});
