import { Icon, type IconName } from "../Icon";

export interface ChipProps {
  type: "category" | "notice";
  label?: string;
  /** 아이콘 override (미입력 시 type별 기본 아이콘 사용: notice→notification, category→link) */
  icon?: IconName;
}

export function Chip({ type, label, icon }: ChipProps) {
  const isNotice = type === "notice";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--spacing-4)",
        paddingTop: "var(--spacing-4)",
        paddingBottom: "var(--spacing-4)",
        paddingLeft: "var(--spacing-8)",
        paddingRight: "var(--spacing-8)",
        backgroundColor: isNotice
          ? "var(--background-danger)"
          : "var(--background-muted)",
        borderRadius: "var(--radius-sm)",
        font: "var(--body-sm-bold)",
        color: isNotice ? "var(--text-danger)" : "var(--content-strong)",
      }}
    >
      <Icon
        name={icon ?? (isNotice ? "notification" : "link")}
        size={12}
        color="currentColor"
        aria-hidden
      />
      {label ?? (isNotice ? "공지사항" : "디자인")}
    </span>
  );
}
