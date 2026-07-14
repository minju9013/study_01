import { useState } from "react";

export interface PostTitleInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

export function PostTitleInput({
  value,
  onChange,
  placeholder = "제목을 입력해주세요",
  id,
  className,
}: PostTitleInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder={placeholder}
      className={className}
      style={{
        width: "100%",
        maxWidth: "840px",
        boxSizing: "border-box",
        border: `1px solid ${isFocused ? "var(--interactive-primaryhover)" : "var(--text-disabled)"}`,
        borderRadius: "var(--radius-md)",
        padding: "var(--spacing-16) var(--spacing-24)",
        font: "var(--title-lg-regular)",
        color: "var(--text-primary)",
        background: "var(--background-default)",
        outline: "none",
        transition: "border-color 0.15s",
      }}
    />
  );
}
