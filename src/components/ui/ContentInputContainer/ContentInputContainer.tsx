import { useEffect, useRef } from "react";
import { PostImage, type PostImageType } from "../PostImage";

export interface ContentInputContainerProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  /** 본문 위에 표시할 첨부 이미지 (없으면 텍스트만) */
  image?: PostImageType;
  imageAlt?: string;
  /** true이면 읽기 전용(상세보기)으로 표시 — onChange 없이도 동작 (기본값: false) */
  readOnly?: boolean;
  className?: string;
}

export function ContentInputContainer({
  value = "",
  onChange,
  placeholder = "게시글 내용을 입력해주세요.",
  image,
  imageAlt = "",
  readOnly = false,
  className,
}: ContentInputContainerProps) {
  const isFilled = value.length > 0;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!readOnly) return;
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [readOnly, value]);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-32)",
        width: "100%",
        maxWidth: "840px",
        boxSizing: "border-box",
        border: readOnly ? "none" : "1px solid var(--text-disabled)",
        borderRadius: "var(--radius-md)",
        padding: readOnly
          ? "0 0 var(--spacing-32)"
          : "var(--spacing-32) var(--spacing-24)",
        background: "var(--background-default)",
      }}
    >
      {isFilled && image && <PostImage type={image} alt={imageAlt} />}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        aria-readonly={readOnly}
        tabIndex={readOnly ? -1 : undefined}
        style={{
          width: "100%",
          minHeight: isFilled ? "120px" : "200px",
          height: readOnly ? "auto" : undefined,
          boxSizing: "border-box",
          border: "none",
          outline: "none",
          overflow: readOnly ? "hidden" : undefined,
          resize: readOnly ? "none" : "vertical",
          cursor: readOnly ? "default" : "text",
          background: "transparent",
          font: "var(--body-lg-regular)",
          color: isFilled ? "var(--content-strong)" : "var(--text-tertiary)",
          padding: 0,
        }}
      />
    </div>
  );
}
