import type1 from "../../../image/post-image-type1.jpg";
import type2 from "../../../image/post-image-type2.jpg";
import type3 from "../../../image/post-image-type3.jpg";
import type4 from "../../../image/post-image-type4.jpg";
import type5 from "../../../image/post-image-type5.jpg";
import type6 from "../../../image/post-image-type6.jpg";

const imageMap: Record<PostImageType, string> = {
  "1": type1,
  "2": type2,
  "3": type3,
  "4": type4,
  "5": type5,
  "6": type6,
};

// type=1,5,6: object-cover로 꽉 채움
// type=2,3,4: 이미지가 컨테이너보다 크며 세로 위치 오프셋 적용
const offsetMap: Record<string, string> = {
  "2": "-63.24%",
  "3": "-50.19%",
  "4": "-68.78%",
};

const coverTypes = new Set(["1", "5", "6"]);

export type PostImageType = "1" | "2" | "3" | "4" | "5" | "6";

export interface PostImageProps {
  type?: PostImageType;
  className?: string;
  alt?: string;
}

export function PostImage({ type = "1", className, alt = "" }: PostImageProps) {
  const isCover = coverTypes.has(type);
  const src = imageMap[type];

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "500px",
        height: "319px",
        overflow: "hidden",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--text-disabled)",
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
            borderRadius: "var(--radius-md)",
            pointerEvents: "none",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: "var(--radius-md)",
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
              height: "209.92%",
              maxWidth: "none",
            }}
          />
        </div>
      )}
    </div>
  );
}
