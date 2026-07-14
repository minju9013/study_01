import { Icon } from "../Icon";

export interface BookmarkButtonProps {
  /** 북마크 여부 (기본값: false) */
  bookmarked?: boolean;
  /** 클릭 시 다음 북마크 상태를 전달하는 콜백 */
  onToggle?: (bookmarked: boolean) => void;
  disabled?: boolean;
  className?: string;
  /** 접근성 레이블 (기본값: "북마크") */
  "aria-label"?: string;
}

export function BookmarkButton({
  bookmarked = false,
  onToggle,
  disabled = false,
  className,
  "aria-label": ariaLabel = "북마크",
}: BookmarkButtonProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={bookmarked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onToggle?.(!bookmarked)}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: disabled ? "not-allowed" : "pointer",
        color: "var(--text-tertiary)",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Icon
        name={bookmarked ? "bookmark-fill" : "bookmark-empty"}
        size={14}
        color="currentColor"
        aria-hidden
      />
    </button>
  );
}
