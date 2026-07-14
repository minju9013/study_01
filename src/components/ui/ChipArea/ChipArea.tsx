import { Chip, type ChipProps } from "../Chip";

export interface ChipAreaProps {
  category?: boolean;
  notice?: boolean;
  /** 칩 목록 override — 지정 시 category/notice 대신 이 목록을 순서대로 렌더링 */
  chips?: ChipProps[];
}

export function ChipArea({
  category = true,
  notice = false,
  chips,
}: ChipAreaProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--spacing-8)",
      }}
    >
      {chips ? (
        chips.map((chip, index) => <Chip key={index} {...chip} />)
      ) : (
        <>
          {notice && <Chip type="notice" />}
          {category && <Chip type="category" />}
        </>
      )}
    </div>
  );
}
