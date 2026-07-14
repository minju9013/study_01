import type { PostCardProps } from "../components/ui/PostCard";

/* ------------------------------------------------------------------ */
/*  HomeDesignPost                                                      */
/* ------------------------------------------------------------------ */

/**
 * `/home-design` (Home 페이지 베리에이션) 전용 mock 게시글 데이터.
 * 화면정의서(Home 페이지 베리에이션) No.4/No.5 콘텐츠를 반영한다.
 */
export interface HomeDesignPost extends PostCardProps {
  id: string;
}

export const HOME_DESIGN_POSTS: HomeDesignPost[] = [
  {
    id: "1",
    title: "Auto Layout 완벽 가이드",
    preview:
      "Auto Layout의 핵심 개념부터 실전 활용까지. Fill, Hug, Fixed의 차이를 예제와 함께 정리했습니다.",
    timeAgo: "2시간 전",
    viewcount: "0",
    likecount: "0",
    imageType: "1",
    chips: [{ type: "notice", label: "튜토리얼", icon: "pencil" }],
  },
  {
    id: "2",
    title: "디자인 토큰, 왜 써야 할까?",
    preview:
      "색상, 간격, 타이포 — 왜 하드코딩하면 안 되는지, 토큰으로 관리하면 뭐가 좋은지 실무 관점에서 정리합니다",
    timeAgo: "5시간 전",
    viewcount: "0",
    likecount: "0",
    imageType: "2",
    chips: [{ type: "category", label: "리소스", icon: "design" }],
  },
  {
    id: "3",
    title: "Figma Variables로 다크모드 만들기",
    preview:
      "Variables 기능으로 라이트/다크 모드를 한 파일에서 관리하는 방법. 컬렉션 구조 설계부터 적용까지.",
    timeAgo: "1일 전",
    viewcount: "0",
    likecount: "0",
    imageType: "3",
    chips: [
      { type: "notice", label: "튜토리얼", icon: "pencil" },
      { type: "category", label: "AI", icon: "ai" },
    ],
  },
];
