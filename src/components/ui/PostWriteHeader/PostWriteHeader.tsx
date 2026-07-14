export interface PostWriteHeaderProps {
  /** 상단 타이틀 (기본: "게시글 쓰기") */
  title?: string;
  /** 안내 서브텍스트 */
  description: string;
  className?: string;
}

export function PostWriteHeader({
  title = "게시글 쓰기",
  description,
  className,
}: PostWriteHeaderProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "var(--spacing-12)",
        width: "100%",
      }}
    >
      <h2
        style={{
          font: "var(--display-lg-bold)",
          color: "var(--content-strong)",
          margin: 0,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          font: "var(--title-lg-regular)",
          color: "var(--text-secondary)",
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}
