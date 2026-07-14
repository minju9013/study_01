import type1 from "../../../image/post-card-type1.jpg";
import type2 from "../../../image/post-card-type2.jpg";
import type3 from "../../../image/post-card-type3.jpg";
import type4 from "../../../image/post-card-type4.jpg";
import type5 from "../../../image/post-card-type5.jpg";
import type6 from "../../../image/post-card-type6.jpg";

const imageMap: Record<PostCardImageType, string> = {
  "1": type1,
  "2": type2,
  "3": type3,
  "4": type4,
  "5": type5,
  "6": type6,
};

// type=1,3,6: object-cover로 꽉 채움
// type=2,4,5: 이미지가 컨테이너보다 크며 세로 위치 오프셋 적용
const offsetMap: Record<string, string> = {
  "2": "-140.41%",
  "4": "-104.22%",
  "5": "-130.47%",
};

const coverTypes = new Set(["1", "3", "6"]);

export type PostCardImageType = "1" | "2" | "3" | "4" | "5" | "6";

export interface PostCardImageProps {
  type?: PostCardImageType;
  className?: string;
  alt?: string;
}

export function PostCardImage({
  type = "1",
  className,
  alt = "",
}: PostCardImageProps) {
  const isCover = coverTypes.has(type);
  const src = imageMap[type];

  return (
    <div
      className={className}
      style={{
        position: "relative",
        /* TODO: 누락된 토큰 — 썸네일 고정 크기 160x102 */
        width: "160px",
        height: "102px",
        overflow: "hidden",
        borderRadius: "var(--radius-sm)",
        /* border-width: 1px — 최소 선 두께, 토큰 없음 */
        border: "1px solid var(--border-default)",
      }}
    >
      {isCover ? (
        <img
          alt={alt}
          src={src}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "var(--radius-sm)",
            pointerEvents: "none",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: "var(--radius-sm)",
            pointerEvents: "none",
          }}
        >
          <img
            alt={alt}
            src={src}
            style={{
              position: "absolute",
              left: 0,
              top: offsetMap[type],
              width: "100%",
              height: "281.06%",
              maxWidth: "none",
            }}
          />
        </div>
      )}
    </div>
  );
}
