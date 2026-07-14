import { Icon, type IconName } from "../Icon";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant =
  | "core"
  | "core-light"
  | "mono"
  | "mono-light"
  | "warning"
  | "warning-light"
  | "outline";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 크기 (기본값: md) */
  size?: ButtonSize;
  /** 버튼 스타일 variant (기본값: core) */
  variant?: ButtonVariant;
  /** 아이콘만 표시 여부 — true이면 children 대신 icon만 표시 */
  iconOnly?: boolean;
  /** leading 영역 아이콘 이름 (Icon 컴포넌트 재사용) */
  icon?: IconName;
  /** 아이콘 색상 override — 기본값은 variant 색상 */
  iconColor?: string;
  /** 버튼 레이블 (iconOnly=false일 때 표시) */
  children?: React.ReactNode;
  /** 비활성화 여부 */
  disabled?: boolean;
}

/* ------------------------------------------------------------------ */
/*  사이즈별 스타일 매핑                                                  */
/* ------------------------------------------------------------------ */

const SIZE_STYLES: Record<
  ButtonSize,
  {
    paddingLabel: string;
    paddingIcon: string;
    iconSize: number;
    font: string;
    height: string;
    gap: string;
  }
> = {
  sm: {
    paddingLabel: "var(--spacing-8) var(--spacing-12)",
    paddingIcon: "var(--spacing-8)",
    iconSize: 16,
    font: "var(--caption-lg-bold)",
    height: "32px" /* TODO: 누락된 토큰 — Figma Button/Small 고정 높이 32px */,
    gap: "var(--spacing-4)",
  },
  md: {
    paddingLabel: "var(--spacing-12) var(--spacing-16)",
    paddingIcon: "var(--spacing-12)",
    iconSize: 20,
    font: "var(--body-sm-bold)",
    height: "44px" /* TODO: 누락된 토큰 — Figma Button/Medium 고정 높이 44px */,
    gap: "var(--spacing-8)",
  },
  lg: {
    paddingLabel: "var(--spacing-16) var(--spacing-20)",
    paddingIcon: "var(--spacing-16)",
    iconSize: 24,
    font: "var(--body-lg-bold)",
    height: "56px" /* TODO: 누락된 토큰 — Figma Button/Large 고정 높이 56px */,
    gap: "var(--spacing-8)",
  },
};

/* ------------------------------------------------------------------ */
/*  Variant별 색상 토큰 매핑                                              */
/* ------------------------------------------------------------------ */

const VARIANT_STYLES: Record<
  ButtonVariant,
  {
    background: string;
    backgroundHover: string;
    backgroundActive: string;
    color: string;
    border?: string;
  }
> = {
  core: {
    background: "var(--interactive-primary)",
    backgroundHover: "var(--interactive-primaryhover)",
    backgroundActive: "var(--interactive-primaryhover)",
    color: "var(--text-onbrand)",
  },
  "core-light": {
    background: "var(--background-brandsubtle)",
    backgroundHover: "var(--primitive-blue-120)",
    backgroundActive: "var(--primitive-blue-200)",
    color: "var(--interactive-primary)",
  },
  mono: {
    background: "var(--content-strong)",
    backgroundHover: "var(--primitive-gray-850)",
    backgroundActive: "var(--primitive-gray-1000)",
    color: "var(--text-onbrand)",
  },
  "mono-light": {
    background: "var(--background-muted)",
    backgroundHover: "var(--primitive-gray-340)",
    backgroundActive: "var(--primitive-gray-360)",
    color: "var(--content-strong)",
  },
  warning: {
    background: "var(--interactive-destructive)",
    backgroundHover: "var(--interactive-destructivehover)",
    backgroundActive: "var(--interactive-destructivehover)",
    color: "var(--text-onbrand)",
  },
  "warning-light": {
    background: "var(--background-dangersubtle)",
    backgroundHover: "var(--background-danger)",
    backgroundActive: "var(--primitive-red-300)",
    color: "var(--text-danger)",
  },
  outline: {
    background: "var(--background-default)",
    backgroundHover: "var(--background-muted)",
    backgroundActive: "var(--primitive-gray-340)",
    color: "var(--content-strong)",
    border: "1px solid var(--border-default)",
  },
};

/* ------------------------------------------------------------------ */
/*  Button 컴포넌트                                                      */
/* ------------------------------------------------------------------ */

export function Button({
  size = "md",
  variant = "core",
  iconOnly = false,
  icon,
  iconColor,
  children,
  disabled = false,
  className,
  style,
  ...rest
}: ButtonProps) {
  const sizeConfig = SIZE_STYLES[size];
  const variantConfig = VARIANT_STYLES[variant];

  const padding = iconOnly ? sizeConfig.paddingIcon : sizeConfig.paddingLabel;

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: sizeConfig.gap,
    height: iconOnly ? sizeConfig.height : undefined,
    width: iconOnly ? sizeConfig.height : undefined,
    minHeight: sizeConfig.height,
    padding,
    font: sizeConfig.font,
    color: disabled ? "var(--text-disabled)" : variantConfig.color,
    background: disabled ? "var(--background-muted)" : variantConfig.background,
    border: disabled ? "none" : (variantConfig.border ?? "none"),
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    outline: "none",
    textDecoration: "none",
    userSelect: "none",
    whiteSpace: "nowrap",
    flexShrink: 0,
    ...style,
  };

  const hoverStyle = `
    button[data-button-variant="${variant}"][data-button-disabled="false"]:hover {
      background: ${variantConfig.backgroundHover};
    }
    button[data-button-variant="${variant}"][data-button-disabled="false"]:active {
      background: ${variantConfig.backgroundActive};
    }
  `;

  return (
    <>
      <style>{hoverStyle}</style>
      <button
        type="button"
        disabled={disabled}
        aria-disabled={disabled}
        data-button-variant={variant}
        data-button-disabled={String(disabled)}
        style={baseStyle}
        className={className}
        {...rest}
      >
        {iconOnly ? (
          <Icon
            name={icon ?? "iconview"}
            size={sizeConfig.iconSize}
            color={
              disabled
                ? "var(--text-disabled)"
                : (iconColor ?? variantConfig.color)
            }
          />
        ) : (
          <>
            {icon && (
              <Icon
                name={icon}
                size={sizeConfig.iconSize}
                color={
                  disabled
                    ? "var(--text-disabled)"
                    : (iconColor ?? variantConfig.color)
                }
              />
            )}
            {children}
          </>
        )}
      </button>
    </>
  );
}
