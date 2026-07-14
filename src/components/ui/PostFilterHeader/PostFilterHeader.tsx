import { Button } from "../Button";
import { Toolbar, type ToolbarProps } from "../Toolbar";

export interface PostFilterHeaderProps extends Omit<ToolbarProps, "className"> {
  /** 상단 타이틀 (기본: "전체 게시글") */
  title?: string;
  /** 글쓰기 버튼 레이블 */
  writeLabel?: string;
  /** 글쓰기 버튼 클릭 콜백 */
  onWriteClick?: () => void;
  className?: string;
}

export function PostFilterHeader({
  title = "전체 게시글",
  writeLabel = "글쓰기",
  onWriteClick,
  className,
  ...toolbarProps
}: PostFilterHeaderProps) {
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
        <Button type="button" variant="core" size="md" onClick={onWriteClick}>
          {writeLabel}
        </Button>
      </div>

      <Toolbar {...toolbarProps} />
    </div>
  );
}
