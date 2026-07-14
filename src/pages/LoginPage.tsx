import { LoginForm, type LoginFormProps } from "../components/ui/LoginForm";
import loginLogo from "../image/login-logo.svg";

export interface LoginPageProps {
  onSubmit?: LoginFormProps["onSubmit"];
  onGoogleLogin?: () => void;
  onFindPassword?: () => void;
  onSignUp?: () => void;
  emailError?: string;
  passwordError?: string;
  isLoading?: boolean;
}

export function LoginPage({
  onSubmit,
  onGoogleLogin,
  onFindPassword,
  onSignUp,
  emailError,
  passwordError,
  isLoading,
}: LoginPageProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        minHeight: "100vh",
        padding: "200px 0",
        boxSizing: "border-box",
        background: "var(--background-subtle)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--spacing-32)",
          width: "720px",
          padding: "90px 160px",
          boxSizing: "border-box",
          borderRadius: "var(--radius-2xl)",
          background: "var(--background-default)",
        }}
      >
        <img src={loginLogo} alt="FigmaPedia" width={186} height={38} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "320px",
          }}
        >
          <LoginForm
            asCard={false}
            showDivider={false}
            showTitle={false}
            onSubmit={onSubmit}
            onGoogleLogin={onGoogleLogin}
            onFindPassword={onFindPassword}
            onSignUp={onSignUp}
            emailError={emailError}
            passwordError={passwordError}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
