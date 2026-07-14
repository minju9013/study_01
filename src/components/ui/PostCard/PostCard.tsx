import { ChipArea } from "../ChipArea";
import type { ChipProps } from "../Chip";
import { PostCardImage, type PostCardImageType } from "../PostCardImage";
import { PostCardStats } from "../PostCardStats";

export interface PostCardProps {
  title: string;
  preview: string;
  timeAgo: string;
  showThum?: boolean;
  category?: boolean;
  notice?: boolean;
  viewcount?: string;
  likecount?: string;
  /** 썸네일 이미지 크롭/오프셋 프리셋 (기본값: "1") */
  imageType?: PostCardImageType;
  /** 칩 목록 override — 지정 시 category/notice 대신 이 목록을 순서대로 렌더링 */
  chips?: ChipProps[];
  /** 좋아요 여부. onLikeToggle과 함께 전달된 경우에만 클릭 가능해진다 */
  liked?: boolean;
  /** 좋아요 클릭 시 다음 상태를 전달하는 콜백 */
  onLikeToggle?: (liked: boolean) => void;
  /** 북마크 여부. onBookmarkToggle과 함께 전달된 경우에만 북마크 아이콘이 표시된다 */
  bookmarked?: boolean;
  /** 북마크 클릭 시 다음 상태를 전달하는 콜백 */
  onBookmarkToggle?: (bookmarked: boolean) => void;
}

export function PostCard({
  title,
  preview,
  timeAgo,
  showThum = true,
  category = true,
  notice = false,
  viewcount = "0",
  likecount = "0",
  imageType,
  chips,
  liked,
  onLikeToggle,
  bookmarked,
  onBookmarkToggle,
}: PostCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-12)",
        paddingTop: "var(--spacing-24)",
        paddingBottom: "var(--spacing-24)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "var(--spacing-20)",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-8)",
            flex: 1,
            minWidth: 0,
          }}
        >
          <ChipArea category={category} notice={notice} chips={chips} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-8)",
            }}
          >
            <p
              style={{
                margin: 0,
                font: "var(--title-sm-bold)",
                color: "var(--text-primary)",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              {title}
            </p>
            <p
              style={{
                margin: 0,
                font: "var(--body-lg-regular)",
                color: "var(--content-default)",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {preview}
            </p>
          </div>
        </div>
        {showThum && <PostCardImage type={imageType} />}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ flex: 1 }} onClick={(e) => e.stopPropagation()}>
          <PostCardStats
            viewcount={viewcount}
            likecount={likecount}
            liked={liked}
            onLikeToggle={onLikeToggle}
            bookmarked={bookmarked}
            onBookmarkToggle={onBookmarkToggle}
          />
        </div>
        <span
          style={{
            font: "var(--caption-lg-medium)",
            color: "var(--text-secondary)",
            flexShrink: 0,
          }}
        >
          {timeAgo}
        </span>
      </div>
    </div>
  );
}
