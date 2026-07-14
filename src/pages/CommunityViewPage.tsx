import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ContentInputContainer } from "../components/ui/ContentInputContainer";
import { Divider } from "../components/ui/Divider";
import { Navigation } from "../components/ui/Navigation";
import { PostCardStats } from "../components/ui/PostCardStats";
import { PostDate } from "../components/ui/PostDate";
import { PostWriteHeader } from "../components/ui/PostWriteHeader";
import type { PostData } from "../data/mockPosts";

export interface CommunityViewPageProps {
  /** 조회된 게시글 (없으면 로딩 중 또는 존재하지 않음) */
  post: PostData | null;
  /** 조회 로딩 중 여부 */
  loading?: boolean;
  /** 로그인 여부 */
  isLoggedIn?: boolean;
  /** 로그인 상태일 때 로그아웃 버튼 앞에 표시할 사용자 이름 */
  userLabel?: string;
  /** 로그인/로그아웃 버튼 클릭 콜백 */
  onAuthClick?: () => void;
  /** 좋아요 클릭 시 다음 상태를 전달하는 콜백 */
  onLikeToggle?: (liked: boolean) => void;
  /** 북마크 클릭 시 다음 상태를 전달하는 콜백 */
  onBookmarkToggle?: (bookmarked: boolean) => void;
}

/* ------------------------------------------------------------------ */
/*  CommunityViewPage — 게시글 상세화면(view)                             */
/* ------------------------------------------------------------------ */

export function CommunityViewPage({
  post,
  loading = false,
  isLoggedIn = false,
  userLabel,
  onAuthClick,
  onLikeToggle,
  onBookmarkToggle,
}: CommunityViewPageProps) {
  const navigate = useNavigate();

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
            maxWidth: "840px",
            gap: "var(--spacing-12)",
          }}
        >
          <div style={{ padding: "var(--spacing-12) 0" }}>
            <Button
              variant="outline"
              size="sm"
              iconOnly
              icon="arrow-left"
              iconColor="var(--text-tertiary)"
              style={{ borderRadius: "var(--radius-circle)" }}
              onClick={() => navigate("/home")}
              aria-label="뒤로가기"
            />
          </div>

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

          {!loading && !post && (
            <p
              style={{
                width: "100%",
                textAlign: "center",
                padding: "var(--spacing-32) 0",
                font: "var(--body-lg-regular)",
                color: "var(--text-secondary)",
              }}
            >
              게시글을 찾을 수 없습니다.
            </p>
          )}

          {!loading && post && (
            <>
              <PostWriteHeader
                title={post.title}
                description={post.authorName}
              />

              <PostDate date={post.date} />

              <Divider />

              <ContentInputContainer
                value={post.content}
                image={post.imageType}
                imageAlt={post.title}
                readOnly
              />

              <PostCardStats
                viewcount={post.viewcount}
                likecount={post.likecount}
                liked={post.liked}
                onLikeToggle={onLikeToggle}
                bookmarked={post.bookmarked}
                onBookmarkToggle={onBookmarkToggle}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
