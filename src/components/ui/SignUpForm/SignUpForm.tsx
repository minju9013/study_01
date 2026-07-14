import { useState } from "react";
import { Button } from "../Button";
import { InputField } from "../InputField";

export interface SignUpFormProps {
  onSubmit?: (data: {
    email: string;
    password: string;
    passwordConfirm: string;
  }) => void;
  onGoogleSignUp?: () => void;
  onLogin?: () => void;
  emailError?: string;
  passwordError?: string;
  passwordConfirmError?: string;
  isLoading?: boolean;
  /** 자체 카드 스타일(고정 폭/패딩/배경/radius) 적용 여부 (기본값: true) */
  asCard?: boolean;
  /** "회원가입" 타이틀 표시 여부 (기본값: true) */
  showTitle?: boolean;
  className?: string;
}

export function SignUpForm({
  onSubmit,
  onGoogleSignUp,
  onLogin,
  emailError,
  passwordError,
  passwordConfirmError,
  isLoading = false,
  asCard = true,
  showTitle = true,
  className,
}: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [internalEmailError, setInternalEmailError] = useState<string>();
  const [internalPasswordError, setInternalPasswordError] = useState<string>();
  const [internalPasswordConfirmError, setInternalPasswordConfirmError] =
    useState<string>();

  function validateEmail(value: string) {
    if (!value) return "이메일을 입력해주세요";
    if (!value.includes("@")) return `이메일 주소에 "@"를 포함해주세요`;
    return undefined;
  }

  function validatePassword(value: string) {
    if (!value) return "비밀번호를 입력해주세요";
    return undefined;
  }

  function validatePasswordConfirm(value: string, passwordValue: string) {
    if (!value) return "비밀번호를 다시 입력해주세요";
    if (value !== passwordValue) return "비밀번호가 일치하지 않습니다";
    return undefined;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextEmailError = validateEmail(email);
    const nextPasswordError = validatePassword(password);
    const nextPasswordConfirmError = validatePasswordConfirm(
      passwordConfirm,
      password,
    );
    setInternalEmailError(nextEmailError);
    setInternalPasswordError(nextPasswordError);
    setInternalPasswordConfirmError(nextPasswordConfirmError);
    if (nextEmailError || nextPasswordError || nextPasswordConfirmError) return;
    onSubmit?.({ email, password, passwordConfirm });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-16)",
        width: asCard ? "400px" : "100%",
        padding: asCard ? "var(--spacing-32)" : 0,
        backgroundColor: asCard ? "var(--background-default)" : "transparent",
        borderRadius: asCard ? "var(--radius-lg)" : 0,
      }}
      className={className}
    >
      {showTitle && (
        <h1
          style={{
            font: "var(--title-lg-bold)",
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          회원가입
        </h1>
      )}

      {/* body: 입력 영역 + 버튼 그룹 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-16)",
        }}
      >
        {/* loginarea: 이메일 + 비밀번호 + 비밀번호 확인 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-16)",
          }}
        >
          <InputField
            id="signup-email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setInternalEmailError(undefined);
            }}
            visualState={emailError || internalEmailError ? "error" : "default"}
            helptext={emailError ?? internalEmailError}
          />

          <InputField
            id="signup-password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setInternalPasswordError(undefined);
            }}
            visualState={
              passwordError || internalPasswordError ? "error" : "default"
            }
            helptext={passwordError ?? internalPasswordError}
          />

          <InputField
            id="signup-password-confirm"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              setInternalPasswordConfirmError(undefined);
            }}
            visualState={
              passwordConfirmError || internalPasswordConfirmError
                ? "error"
                : "default"
            }
            helptext={passwordConfirmError ?? internalPasswordConfirmError}
          />
        </div>

        {/* buttonGroup: 회원가입 버튼 + 구글 가입 버튼 (구분선 없음 — Figma에 없음) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-8)",
          }}
        >
          <Button
            type="submit"
            variant="core"
            size="lg"
            disabled={isLoading}
            style={{ width: "100%" }}
          >
            {isLoading ? "회원가입 중..." : "회원가입"}
          </Button>

          {/* LoginGoogle */}
          <Button
            type="button"
            variant="mono-light"
            size="md"
            icon="google"
            onClick={onGoogleSignUp}
            style={{ width: "100%" }}
          >
            구글로 가입하기
          </Button>
        </div>
      </div>

      {/* LoginBottom: 로그인 안내 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-8)",
        }}
      >
        {/* LoginSign: 로그인 안내 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--spacing-8)",
            padding: "var(--spacing-12) 0",
          }}
        >
          <span
            style={{
              font: "var(--caption-lg-medium)",
              color: "var(--text-tertiary)",
            }}
          >
            이미 계정이 있으신가요?
          </span>
          <Button
            type="button"
            variant="mono-light"
            size="sm"
            onClick={onLogin}
          >
            로그인
          </Button>
        </div>
      </div>
    </form>
  );
}
