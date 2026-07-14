import { Divider } from "../components/ui/Divider";
import { Navigation } from "../components/ui/Navigation";
import { PostCard } from "../components/ui/PostCard";
import { PostFilterHeader } from "../components/ui/PostFilterHeader";
import type { PostData } from "../data/mockPosts";

export interface CommunityPageProps {
  /** 게시글 목록 (Supabase에서 조회한 데이터) */
  posts: PostData[];
  /** 목록 로딩 중 여부 */
  loading?: boolean;
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
  /** 좋아요 클릭 콜백 — 게시글 id와 다음 상태를 전달 */
  onLikeToggle?: (id: string, liked: boolean) => void;
  /** 북마크 클릭 콜백 — 게시글 id와 다음 상태를 전달 */
  onBookmarkToggle?: (id: string, bookmarked: boolean) => void;
}

/* ------------------------------------------------------------------ */
/*  CommunityPage                                                       */
/* ------------------------------------------------------------------ */

export function CommunityPage({
  posts,
  loading = false,
  isLoggedIn = false,
  userLabel,
  onAuthClick,
  onWriteClick,
  onPostClick,
  activeSort,
  onSortChange,
  searchValue,
  onSearchChange,
  onLikeToggle,
  onBookmarkToggle,
}: CommunityPageProps) {
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
        items={[{ value: "community", label: "커뮤니티" }]}
        activeItem="community"
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
            /* TODO: 누락된 토큰 — 콘텐츠 컨테이너 최대 폭 840px */
            maxWidth: "840px",
          }}
        >
          <PostFilterHeader
            onWriteClick={onWriteClick}
            activeSort={activeSort}
            onSortChange={onSortChange}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
          />
          <Divider />

          {loading && (
            <p
              style={{
                width: "100%",
                textAlign: "center",
                padding: "var(--spacing-32) 0",
                font: "var(--body-lg-regular)",
                color: "var(--text-secondary)",
              }}
            >
              불러오는 중...
            </p>
          )}

          {!loading && posts.length === 0 && (
            <p
              style={{
                width: "100%",
                textAlign: "center",
                padding: "var(--spacing-32) 0",
                font: "var(--body-lg-regular)",
                color: "var(--text-secondary)",
              }}
            >
              아직 게시글이 없습니다.
            </p>
          )}

          {posts.map((post) => (
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
                  category={post.category}
                  notice={post.notice}
                  viewcount={post.viewcount}
                  likecount={post.likecount}
                  imageType={post.imageType}
                  liked={post.liked}
                  onLikeToggle={
                    onLikeToggle && ((next) => onLikeToggle(post.id, next))
                  }
                  bookmarked={post.bookmarked}
                  onBookmarkToggle={
                    onBookmarkToggle &&
                    ((next) => onBookmarkToggle(post.id, next))
                  }
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
