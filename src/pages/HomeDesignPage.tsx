import { Divider } from "../components/ui/Divider";
import { Navigation } from "../components/ui/Navigation";
import { PostCard } from "../components/ui/PostCard";
import { PostFilterHeader } from "../components/ui/PostFilterHeader";
import { HOME_DESIGN_POSTS } from "../data/homeDesignPosts";

const SORT_OPTIONS = [
  { value: "latest", label: "추천순" },
  { value: "popular", label: "최신순" },
];

export interface HomeDesignPageProps {
  /** 로그인 여부 */
  isLoggedIn?: boolean;
  /** 로그인 상태일 때 로그아웃 버튼 앞에 표시할 사용자 이름 */
  userLabel?: string;
  /** 로그인/로그아웃 버튼 클릭 콜백 */
  onAuthClick?: () => void;
  /** 글쓰기 버튼 클릭 콜백 */
  onWriteClick?: () => void;
  /** 게시글 카드 클릭 콜백 — 클릭된 게시글의 id를 전달 (상세보기 이동용) */
  onPostClick?: (id: string) => void;
  /** 현재 선택된 정렬 value ("latest" | "popular") */
  activeSort?: string;
  /** 정렬 탭 변경 콜백 */
  onSortChange?: (value: string) => void;
  /** 검색어 (controlled input) */
  searchValue?: string;
  /** 검색어 변경 콜백 */
  onSearchChange?: (value: string) => void;
}

/* ------------------------------------------------------------------ */
/*  HomeDesignPage — Home 페이지 베리에이션 (디자인 팁 / 실시간 게시글)        */
/* ------------------------------------------------------------------ */

export function HomeDesignPage({
  isLoggedIn = false,
  userLabel,
  onAuthClick,
  onWriteClick,
  onPostClick,
  activeSort,
  onSortChange,
  searchValue,
  onSearchChange,
}: HomeDesignPageProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingTop: "var(--spacing-32)",
        paddingBottom: "var(--spacing-32)",
        background: "var(--background-default)",
      }}
    >
      <Navigation
        items={[{ value: "design-tip", label: "디자인 팁" }]}
        activeItem="design-tip"
        isLoggedIn={isLoggedIn}
        userLabel={userLabel}
        onAuthClick={onAuthClick}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingTop: "var(--spacing-48)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            maxWidth: "840px",
          }}
        >
          <PostFilterHeader
            title="실시간 게시글"
            onWriteClick={onWriteClick}
            sortOptions={SORT_OPTIONS}
            activeSort={activeSort}
            onSortChange={onSortChange}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
          />
          <Divider />

          {HOME_DESIGN_POSTS.map((post) => (
            <div key={post.id} style={{ width: "100%" }}>
              <div
                role="button"
                tabIndex={0}
                aria-label={`${post.title} 게시글 상세보기`}
                onClick={() => onPostClick?.(post.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onPostClick?.(post.id);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <PostCard
                  title={post.title}
                  preview={post.preview}
                  timeAgo={post.timeAgo}
                  showThum={post.showThum}
                  viewcount={post.viewcount}
                  likecount={post.likecount}
                  imageType={post.imageType}
                  chips={post.chips}
                />
              </div>
              <Divider />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
