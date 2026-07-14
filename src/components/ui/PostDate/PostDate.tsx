export interface PostDateProps {
  /** 표시할 날짜 문자열 (예: "26.05.06") */
  date: string;
  className?: string;
}

export function PostDate({ date, className }: PostDateProps) {
  return (
    <span
      className={className}
      style={{
        font: "var(--body-sm-regular)",
        color: "var(--text-tertiary)",
      }}
    >
      {date}
    </span>
  );
}
