import { Icon } from "../Icon";

/* ------------------------------------------------------------------ */
/*  타입 정의                                                             */
/* ------------------------------------------------------------------ */

export interface SortOption {
  /** 정렬 옵션 고유 식별자 */
  value: string;
  /** 정렬 옵션 표시 레이블 */
  label: string;
}

export interface ToolbarProps {
  /** 정렬 탭 목록 (기본: 최신글/인기글) */
  sortOptions?: SortOption[];
  /** 현재 선택된 정렬 value */
  activeSort?: string;
  /** 정렬 탭 변경 콜백 */
  onSortChange?: (value: string) => void;
  /** 검색어 (controlled input) */
  searchValue?: string;
  /** 검색어 변경 콜백 */
  onSearchChange?: (value: string) => void;
  /** 검색 placeholder (기본: "제목, 내용, 작성자") */
  searchPlaceholder?: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  기본값                                                               */
/* ------------------------------------------------------------------ */

const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { value: "latest", label: "최신글" },
  { value: "popular", label: "인기글" },
];

/* ------------------------------------------------------------------ */
/*  SortTabItem — 개별 정렬 탭 (Toolbar 내부 전용)                         */
/* ------------------------------------------------------------------ */

interface SortTabItemProps {
  option: SortOption;
  isSelected: boolean;
  onClick: () => void;
}

function SortTabItem({ option, isSelected, onClick }: SortTabItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="tab"
      aria-selected={isSelected}
      style={{
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        gap: "var(--spacing-4)",
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
        font: isSelected ? "var(--body-sm-bold)" : "var(--body-sm-regular)",
        color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
      }}
    >
      {isSelected && (
        <Icon
          name="check"
          size={16}
          color="var(--text-primary)"
          aria-label="선택됨"
        />
      )}
      {option.label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  세로 구분선 — Toolbar 내부 전용 (Divider 컴포넌트 미사용)              */
/* ------------------------------------------------------------------ */

function VerticalDivider() {
  return (
    <span
      role="separator"
      aria-orientation="vertical"
      style={{
        display: "inline-block",
        flexShrink: 0,
        width: "1px",
        height: "var(--spacing-12)",
        background: "var(--text-disabled)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Toolbar 컴포넌트                                                      */
/* ------------------------------------------------------------------ */

export function Toolbar({
  sortOptions = DEFAULT_SORT_OPTIONS,
  activeSort = "latest",
  onSortChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = "제목, 내용, 작성자",
  className,
}: ToolbarProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {/* 왼쪽: 정렬 탭 영역 */}
      <div
        role="tablist"
        aria-label="정렬"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-12)",
          flexShrink: 0,
        }}
      >
        {sortOptions.map((option, index) => (
          <div
            key={option.value}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-12)",
            }}
          >
            {index > 0 && <VerticalDivider />}
            <SortTabItem
              option={option}
              isSelected={option.value === activeSort}
              onClick={() => onSortChange?.(option.value)}
            />
          </div>
        ))}
      </div>

      {/* 오른쪽: 검색바 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-8)",
          /* TODO: 누락된 토큰 — 검색바 고정 크기 240x36 */
          width: "240px",
          height: "36px",
          paddingTop: "var(--spacing-8)",
          paddingBottom: "var(--spacing-8)",
          paddingLeft: "var(--spacing-16)",
          paddingRight: "var(--spacing-16)",
          /* border-width: 1px — 최소 선 두께, 토큰 없음 */
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-circle)",
          flexShrink: 0,
        }}
      >
        <Icon
          name="search"
          size={16}
          color="var(--text-secondary)"
          aria-label="검색"
        />
        <input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder={searchPlaceholder}
          aria-label="검색"
          style={{
            flex: "1 0 0",
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            font: "var(--body-lg-regular)",
            color: "var(--text-primary)",
            // 브라우저 기본 X 버튼 제거
            WebkitAppearance: "none",
          }}
        />
        {searchValue && (
          <button
            type="button"
            onClick={() => onSearchChange?.("")}
            aria-label="검색어 지우기"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              padding: 0,
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "var(--text-tertiary)",
            }}
          >
            <Icon name="close" size={10} color="var(--text-tertiary)" />
          </button>
        )}
      </div>
    </div>
  );
}
