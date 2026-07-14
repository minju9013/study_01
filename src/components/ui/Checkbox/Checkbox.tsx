import { useEffect, useRef } from "react";
import { Icon } from "../Icon";

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  disabled = false,
  className,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isActive = checked || indeterminate;

  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--spacing-8)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className={className}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={indeterminate ? false : checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span
        style={{
          width: "var(--spacing-16)",
          height: "var(--spacing-16)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--radius-xs)",
          border: `1.5px solid ${isActive && !disabled ? "var(--interactive-primary)" : "var(--border-default)"}`,
          backgroundColor: isActive
            ? disabled
              ? "var(--text-disabled)"
              : "var(--interactive-primary)"
            : "var(--background-default)",
          opacity: disabled && !isActive ? 0.5 : 1,
          flexShrink: 0,
          transition: "background-color 0.15s, border-color 0.15s",
        }}
        aria-hidden="true"
      >
        {indeterminate && (
          <span
            style={{
              display: "block",
              width: "var(--spacing-8)",
              height: "var(--spacing-2)",
              backgroundColor: "var(--text-onbrand)",
              borderRadius: "var(--radius-xs)",
            }}
          />
        )}
        {!indeterminate && checked && (
          <Icon name="check" size={10} color="var(--text-onbrand)" />
        )}
      </span>
      {label && (
        <span
          style={{
            font: "var(--caption-lg-medium)",
            color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
            lineHeight: 1,
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
}
