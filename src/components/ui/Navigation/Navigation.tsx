import { Button } from "../Button";

/* ------------------------------------------------------------------ */
/*  타입 정의                                                             */
/* ------------------------------------------------------------------ */

export interface NavigationItem {
  /** 탭 고유 식별자 */
  value: string;
  /** 탭 표시 레이블 */
  label: string;
}

export interface NavigationProps {
  /** 탭 목록 */
  items: NavigationItem[];
  /** 현재 선택된 탭 value */
  activeItem?: string;
  /** 탭 변경 콜백 */
  onItemChange?: (value: string) => void;
  /** 로그인 여부 — true이면 "로그아웃" 버튼, false이면 "로그인" 버튼 */
  isLoggedIn?: boolean;
  /** 로그인 상태일 때 로그아웃 버튼 앞에 표시할 사용자 이름 (예: "민주님") */
  userLabel?: string;
  /** 로그인/로그아웃 버튼 클릭 콜백 */
  onAuthClick?: () => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  CategoryTab — 개별 탭 아이템                                          */
/* ------------------------------------------------------------------ */

interface CategoryTabProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function CategoryTab({ label, isSelected, onClick }: CategoryTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-selected={isSelected}
      role="tab"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexShrink: 0,
        paddingTop: "var(--spacing-8)",
        paddingLeft: "var(--spacing-8)",
        paddingRight: "var(--spacing-8)",
        paddingBottom: "var(--spacing-8)",
        border: "none",
        /* TODO: 누락된 토큰 — Figma CategoryTab 선택 indicator 두께 4px */
        borderBottom: isSelected
          ? `4px solid var(--interactive-primary)`
          : "4px solid transparent",
        background: "none",
        cursor: "pointer",
        outline: "none",
        font: "var(--display-sm-bold)",
        color: isSelected ? "var(--text-primary)" : "var(--text-disabled)",
        whiteSpace: "nowrap",
        lineHeight: "var(--line-height-36)",
        transition: "color 0.15s, border-color 0.15s",
      }}
      data-category-selected={String(isSelected)}
    >
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation 컴포넌트                                                   */
/* ------------------------------------------------------------------ */

export function Navigation({
  items,
  activeItem,
  onItemChange,
  isLoggedIn = false,
  userLabel,
  onAuthClick,
  className,
}: NavigationProps) {
  return (
    <nav
      className={className}
      aria-label="카테고리 네비게이션"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "var(--spacing-16)",
        paddingLeft: "var(--spacing-8)",
        paddingRight: "var(--spacing-8)",
        /* border-width: 1px — 최소 선 두께, 토큰 없음 */
        borderBottom: `1px solid var(--background-muted)`,
        width: "100%",
        backgroundColor: "var(--background-default)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          /* TODO: 누락된 토큰 — 콘텐츠 컨테이너 최대 폭 840px */
          maxWidth: "840px",
          paddingTop: "var(--spacing-2)",
          overflow: "auto",
          boxShadow: "var(--shadow-header)",
        }}
      >
        {/* 카테고리 탭 스크롤 영역 */}
        <div
          role="tablist"
          aria-label="카테고리"
          style={{
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            flexShrink: 1,
            gap: "var(--spacing-0)",
          }}
        >
          {items.map((item) => (
            <CategoryTab
              key={item.value}
              label={item.label}
              isSelected={activeItem === item.value}
              onClick={() => onItemChange?.(item.value)}
            />
          ))}
        </div>

        {/* 사용자 표시 이름 + 로그인 / 로그아웃 버튼 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-8)",
            flexShrink: 0,
          }}
        >
          {isLoggedIn && userLabel && (
            <span
              style={{
                font: "var(--body-sm-bold)",
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
              }}
            >
              {userLabel}
            </span>
          )}
          <Button
            variant="core-light"
            size="sm"
            onClick={onAuthClick}
            style={{ flexShrink: 0 }}
          >
            {isLoggedIn ? "로그아웃" : "로그인"}
          </Button>
        </div>
      </div>
    </nav>
  );
}
