import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ContentInputContainer } from "../components/ui/ContentInputContainer";
import { Navigation } from "../components/ui/Navigation";
import { PostTitleInput } from "../components/ui/PostTitleInput";
import { PostWriteHeader } from "../components/ui/PostWriteHeader";

export interface CommunityWritePageProps {
  /** 로그인 여부 */
  isLoggedIn?: boolean;
  /** 로그인 상태일 때 로그아웃 버튼 앞에 표시할 사용자 이름 */
  userLabel?: string;
  /** 로그인/로그아웃 버튼 클릭 콜백 */
  onAuthClick?: () => void;
  /** 등록 버튼 클릭 시 호출 — 성공 시 상세/목록 등으로 이동은 호출부에서 처리 */
  onSubmit?: (input: { title: string; content: string }) => Promise<void>;
}

/* ------------------------------------------------------------------ */
/*  CommunityWritePage                                                 */
/* ------------------------------------------------------------------ */

export function CommunityWritePage({
  isLoggedIn = false,
  userLabel,
  onAuthClick,
  onSubmit,
}: CommunityWritePageProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!onSubmit) {
      navigate("/home");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit({ title, content });
      navigate("/home");
    } catch {
      setError("게시글 등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              gap: "var(--spacing-40)",
            }}
          >
            <PostWriteHeader description="건전한 커뮤니티를 위해 바른말 고운말을 씁시다." />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                gap: "var(--spacing-20)",
              }}
            >
              <PostTitleInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <ContentInputContainer
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {error && (
              <p
                style={{
                  margin: 0,
                  font: "var(--body-md-regular)",
                  color: "var(--text-danger)",
                }}
              >
                {error}
              </p>
            )}

            <Button
              variant="core"
              size="lg"
              style={{ width: "100%" }}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "등록 중..." : "등록하기"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
