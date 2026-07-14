import { BookmarkButton } from "../BookmarkButton";
import { Icon } from "../Icon";

export interface PostCardStatsProps {
  viewcount?: string;
  likecount?: string;
  /** 좋아요 여부. onLikeToggle과 함께 전달된 경우에만 클릭 가능한 버튼으로 표시된다 */
  liked?: boolean;
  /** 좋아요 클릭 시 다음 상태를 전달하는 콜백. 전달된 경우에만 하트가 클릭 가능해진다 */
  onLikeToggle?: (liked: boolean) => void;
  /** 북마크 여부. onBookmarkToggle과 함께 전달된 경우에만 북마크 아이콘이 표시된다 */
  bookmarked?: boolean;
  /** 북마크 클릭 시 다음 상태를 전달하는 콜백. 전달된 경우에만 북마크 아이콘이 표시된다 */
  onBookmarkToggle?: (bookmarked: boolean) => void;
}

export function PostCardStats({
  viewcount = "0",
  likecount = "0",
  liked = false,
  onLikeToggle,
  bookmarked = false,
  onBookmarkToggle,
}: PostCardStatsProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--spacing-24)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--spacing-4)",
          font: "var(--caption-lg-medium)",
          color: "var(--text-tertiary)",
        }}
      >
        <Icon name="eye-on" size={14} color="currentColor" aria-hidden />
        {viewcount}
      </div>
      {onLikeToggle ? (
        <button
          type="button"
          role="switch"
          aria-checked={liked}
          aria-label="좋아요"
          onClick={() => onLikeToggle(!liked)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--spacing-4)",
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            font: "var(--caption-lg-medium)",
            color: "var(--text-tertiary)",
          }}
        >
          <Icon
            name={liked ? "heart-fill" : "heart-empty"}
            size={14}
            color="currentColor"
            aria-hidden
          />
          {likecount}
        </button>
      ) : (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--spacing-4)",
            font: "var(--caption-lg-medium)",
            color: "var(--text-tertiary)",
          }}
        >
          <Icon name="heart-empty" size={14} color="currentColor" aria-hidden />
          {likecount}
        </div>
      )}
      {onBookmarkToggle && (
        <BookmarkButton bookmarked={bookmarked} onToggle={onBookmarkToggle} />
      )}
    </div>
  );
}
