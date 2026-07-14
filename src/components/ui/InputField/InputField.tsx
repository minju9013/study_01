import { useState } from "react";
import { Icon } from "../Icon";

export type InputFieldVisualState = "default" | "error" | "disabled";

export interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helptext?: string;
  visualState?: InputFieldVisualState;
  type?: "text" | "password" | "email";
  id?: string;
  showTrailingIcon?: boolean;
  className?: string;
}

export function InputField({
  label,
  placeholder,
  value,
  onChange,
  helptext,
  visualState = "default",
  type = "text",
  id,
  showTrailingIcon = false,
  className,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isDisabled = visualState === "disabled";
  const isError = visualState === "error";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const borderColor = isError
    ? "var(--interactive-destructivehover)"
    : isFocused
      ? "var(--interactive-primaryhover)"
      : "var(--border-default)";

  const helptextColor = isError
    ? "var(--interactive-destructivehover)"
    : isFocused
      ? "var(--interactive-primaryhover)"
      : "var(--text-tertiary)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-2)",
      }}
      className={className}
    >
      {label && (
        <label
          htmlFor={id}
          style={{
            font: "var(--body-sm-bold)",
            color: "var(--text-primary)",
            padding: "var(--spacing-4)",
          }}
        >
          {label}
        </label>
      )}
      <div
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-8)",
          padding: "var(--spacing-12) var(--spacing-16)",
          borderRadius: "var(--radius-md)",
          border: `1px solid ${borderColor}`,
          backgroundColor: "var(--background-default)",
          transition: "border-color 0.15s",
        }}
      >
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            font: "var(--body-lg-regular)",
            color: isDisabled ? "var(--text-tertiary)" : "var(--text-primary)",
          }}
        />
        {isPassword && !isDisabled && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            style={{
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Icon
              name={showPassword ? "eye-off" : "eye-on"}
              size={16}
              color="var(--text-tertiary)"
            />
          </button>
        )}
        {showTrailingIcon && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              color: "var(--text-tertiary)",
            }}
            aria-hidden="true"
          >
            <Icon name="iconview" size={16} color="var(--text-tertiary)" />
          </span>
        )}
      </div>
      {helptext && (
        <span
          style={{
            font: "var(--caption-lg-medium)",
            color: helptextColor,
            padding: "var(--spacing-4)",
          }}
        >
          {helptext}
        </span>
      )}
    </div>
  );
}
