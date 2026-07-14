import { useState } from "react";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { InputField } from "../InputField";

export interface LoginFormProps {
  onSubmit?: (data: {
    email: string;
    password: string;
    remember: boolean;
  }) => void;
  onGoogleLogin?: () => void;
  onFindPassword?: () => void;
  onSignUp?: () => void;
  emailError?: string;
  passwordError?: string;
  isLoading?: boolean;
  /** 자체 카드 스타일(고정 폭/패딩/배경/radius) 적용 여부 (기본값: true) */
  asCard?: boolean;
  /** 로그인 버튼과 구글 로그인 사이 "또는" 구분선 표시 여부 (기본값: true) */
  showDivider?: boolean;
  /** "로그인" 타이틀 표시 여부 (기본값: true) */
  showTitle?: boolean;
  className?: string;
}

export function LoginForm({
  onSubmit,
  onGoogleLogin,
  onFindPassword,
  onSignUp,
  emailError,
  passwordError,
  isLoading = false,
  asCard = true,
  showDivider = true,
  showTitle = true,
  className,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [internalEmailError, setInternalEmailError] = useState<string>();
  const [internalPasswordError, setInternalPasswordError] = useState<string>();

  function validateEmail(value: string) {
    if (!value) return "이메일을 입력해주세요";
    if (!value.includes("@")) return `이메일 주소에 "@"를 포함해주세요`;
    return undefined;
  }

  function validatePassword(value: string) {
    if (!value) return "비밀번호를 입력해주세요";
    return undefined;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextEmailError = validateEmail(email);
    const nextPasswordError = validatePassword(password);
    setInternalEmailError(nextEmailError);
    setInternalPasswordError(nextPasswordError);
    if (nextEmailError || nextPasswordError) return;
    onSubmit?.({ email, password, remember });
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
          로그인
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
        {/* loginarea: 이메일 + 비밀번호 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-16)",
          }}
        >
          <InputField
            id="login-email"
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
            id="login-password"
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
        </div>

        {/* buttonGroup: 로그인 버튼 + 구글 로그인 버튼 */}
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
            size="md"
            disabled={isLoading}
            style={{ width: "100%" }}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>

          {/* Divider */}
          {showDivider && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-8)",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "var(--border-default)",
                }}
              />
              <span
                style={{
                  font: "var(--caption-lg-regular)",
                  color: "var(--text-tertiary)",
                }}
              >
                또는
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "var(--border-default)",
                }}
              />
            </div>
          )}

          {/* LoginGoogle */}
          <Button
            type="button"
            variant="mono-light"
            size="md"
            icon="google"
            onClick={onGoogleLogin}
            style={{ width: "100%" }}
          >
            구글로 로그인 하기
          </Button>
        </div>
      </div>

      {/* LoginBottom: 로그인 유지/비밀번호 찾기 + 회원가입 안내 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-8)",
        }}
      >
        {/* LoginSetup: 로그인 유지 + 비밀번호 찾기 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Checkbox
            checked={remember}
            onChange={setRemember}
            label="로그인 유지"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onFindPassword}
          >
            비밀번호 찾기
          </Button>
        </div>

        {/* LoginSign: 회원가입 안내 */}
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
            아직 회원이 아니세요?
          </span>
          <Button
            type="button"
            variant="mono-light"
            size="sm"
            onClick={onSignUp}
          >
            회원가입
          </Button>
        </div>
      </div>
    </form>
  );
}
