export interface DividerProps {
  /** 구분선 방향 */
  orientation?: "horizontal" | "vertical";
  /** 추가 CSS 클래스 */
  className?: string;
}

export function Divider({
  orientation = "horizontal",
  className = "",
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={className}
        style={{
          display: "inline-block",
          alignSelf: "stretch",
          /* border-width: 1px — 최소 선 두께, 토큰 없음 */
          borderLeft: "1px solid var(--background-muted)",
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={className}
      style={{
        paddingTop: "var(--spacing-12)",
        paddingBottom: "var(--spacing-12)",
        width: "100%",
      }}
    >
      <div
        style={{
          /* border-width: 1px — 최소 선 두께, 토큰 없음 */
          borderTop: "1px solid var(--background-muted)",
          width: "100%",
        }}
      />
    </div>
  );
}
