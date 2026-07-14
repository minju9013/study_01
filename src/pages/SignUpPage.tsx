import { SignUpForm, type SignUpFormProps } from "../components/ui/SignUpForm";
import loginLogo from "../image/login-logo.svg";

export interface SignUpPageProps {
  onSubmit?: SignUpFormProps["onSubmit"];
  onGoogleSignUp?: () => void;
  onLogin?: () => void;
  emailError?: string;
  passwordError?: string;
  passwordConfirmError?: string;
  isLoading?: boolean;
}

export function SignUpPage({
  onSubmit,
  onGoogleSignUp,
  onLogin,
  emailError,
  passwordError,
  passwordConfirmError,
  isLoading,
}: SignUpPageProps) {
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
          <SignUpForm
            asCard={false}
            showTitle={false}
            onSubmit={onSubmit}
            onGoogleSignUp={onGoogleSignUp}
            onLogin={onLogin}
            emailError={emailError}
            passwordError={passwordError}
            passwordConfirmError={passwordConfirmError}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
