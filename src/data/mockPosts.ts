import type { PostCardProps } from "../components/ui/PostCard";

/* ------------------------------------------------------------------ */
/*  PostData                                                            */
/* ------------------------------------------------------------------ */

/**
 * 커뮤니티 게시글 mock 데이터 타입.
 * `PostCardProps`(목록 카드 표시용)를 확장해 상세보기(view) 페이지에서만
 * 필요한 필드(작성자 정보/날짜/본문)를 추가로 갖는다.
 * 목록(CommunityPage)과 상세(CommunityViewPage)가 동일한 소스를 id로 조회한다.
 */
export interface PostData extends PostCardProps {
  /** 게시글 고유 식별자 (라우트 파라미터로 사용) */
  id: string;
  /** 작성자 닉네임 — 상세화면 PostWriteHeader의 description으로 사용 */
  authorName: string;
  /** 작성자 부가정보(한줄 소개) — 현재 상세화면에서 미사용 */
  authorRole: string;
  /** 작성일 (예: "26.05.06") — 상세화면 PostDate에 사용 */
  date: string;
  /** 게시글 상세 본문 — 상세화면 ContentInputContainer(readOnly)에 사용 */
  content: string;
}

/* ------------------------------------------------------------------ */
/*  Mock 게시글 데이터                                                    */
/* ------------------------------------------------------------------ */

export const MOCK_POSTS: PostData[] = [
  {
    id: "1",
    notice: true,
    category: false,
    title: "피그마 커뮤니티는 역시 피그마피디아",
    preview:
      "안녕하세요, 피그마피디아 운영팀입니다. 커뮤니티가 점점 성장하면서 새롭게 정책을 정비하게 되었습니다. 앞으로 게시글 작성 시 카테고리를 필수로 선택해 주셔야 하며, 홍보성 게시글은 '홍보/공유' 카테고리 외 게시판에 올리실 경우 별도 안내 없이 이동 조치될 수 있습니다.",
    timeAgo: "1분 전",
    viewcount: "128",
    likecount: "12",
    imageType: "1",
    authorName: "피그마피디아 짱짱",
    authorRole: "피튜",
    date: "26.05.06",
    content:
      "안녕하세요, 피그마피디아 운영팀입니다. 커뮤니티가 점점 성장하면서 새롭게 정책을 정비하게 되었습니다. 앞으로 게시글 작성 시 카테고리를 필수로 선택해 주셔야 하며, 홍보성 게시글은 '홍보/공유' 카테고리 외 게시판에 올리실 경우 별도 안내 없이 이동 조치될 수 있습니다. 커뮤니티가 더 건강하게 운영될 수 있도록 멤버 여러분의 협조 부탁드립니다. 문의사항은 운영 DM으로 남겨주세요.",
  },
  {
    id: "2",
    notice: false,
    category: true,
    title: "반려동물과 함께하는 디자인 영감 모음",
    preview:
      "요즘 반려동물을 모티브로 한 브랜드 디자인이 눈에 띄게 늘고 있어요. 귀여운 레퍼런스와 함께 작업 팁을 정리해봤습니다.",
    timeAgo: "5분 전",
    viewcount: "342",
    likecount: "48",
    imageType: "2",
    authorName: "댕댕디자이너",
    authorRole: "브랜드 디자이너",
    date: "26.05.05",
    content:
      "요즘 반려동물을 모티브로 한 브랜드 디자인이 눈에 띄게 늘고 있어요. 귀여운 레퍼런스와 함께 작업 팁을 정리해봤습니다. 특히 색감과 캐릭터 라인을 단순화할수록 브랜드 톤이 살아나는 걸 느꼈는데, 다음 글에서는 실제 작업 과정도 공유해볼게요.",
  },
  {
    id: "3",
    notice: true,
    category: false,
    title: "커뮤니티 이용 가이드라인 안내",
    preview:
      "건강한 커뮤니티 운영을 위해 게시글 작성 가이드라인을 안내드립니다. 자세한 내용은 본문을 확인해 주세요. 문의사항은 운영 DM으로 남겨주세요.",
    timeAgo: "12분 전",
    viewcount: "89",
    likecount: "6",
    imageType: "3",
    authorName: "피그마피디아 운영팀",
    authorRole: "운영진",
    date: "26.05.04",
    content:
      "건강한 커뮤니티 운영을 위해 게시글 작성 가이드라인을 안내드립니다. 욕설/비방/광고성 게시글은 사전 고지 없이 삭제될 수 있으며, 반복 위반 시 이용이 제한될 수 있습니다. 자세한 내용은 커뮤니티 이용약관을 참고해 주세요. 문의사항은 운영 DM으로 남겨주세요.",
  },
  {
    id: "4",
    notice: true,
    category: true,
    title: "Figma 변수와 Style Dictionary 연동기",
    preview:
      "Figma 변수를 Style Dictionary로 자동 변환해 프론트엔드 토큰과 동기화한 경험을 공유합니다. 삽질기와 팁 위주로 정리했어요.",
    timeAgo: "30분 전",
    viewcount: "512",
    likecount: "73",
    imageType: "4",
    authorName: "토큰장인",
    authorRole: "프론트엔드 엔지니어",
    date: "26.05.03",
    content:
      "Figma 변수를 Style Dictionary로 자동 변환해 프론트엔드 토큰과 동기화한 경험을 공유합니다. 네이밍 규칙을 먼저 통일하지 않으면 변환 스크립트가 계속 깨지는 걸 몸소 겪었고, 결국 Figma 변수 네이밍부터 CSS 커스텀 프로퍼티 네이밍까지 매핑 테이블을 문서화한 뒤에야 안정화됐습니다. 삽질기와 팁 위주로 정리했어요.",
  },
  {
    id: "5",
    notice: false,
    category: true,
    title: "디자인 시스템 컴포넌트 네이밍 팁",
    preview:
      "컴포넌트 이름을 잘 짓는 것만으로도 협업 효율이 크게 달라집니다. 저희 팀이 사용하는 네이밍 규칙을 소개합니다.",
    timeAgo: "1시간 전",
    viewcount: "204",
    likecount: "29",
    imageType: "5",
    authorName: "네이밍요정",
    authorRole: "프로덕트 디자이너",
    date: "26.05.02",
    content:
      "컴포넌트 이름을 잘 짓는 것만으로도 협업 효율이 크게 달라집니다. 저희 팀이 사용하는 네이밍 규칙을 소개합니다. Figma 레이어명과 코드 컴포넌트명을 최대한 1:1로 맞추면 Code Connect 매핑 작업이 훨씬 수월해지더라고요.",
  },
  {
    id: "6",
    notice: false,
    category: true,
    title: "공지 + 디자인 카테고리 동시 적용 예시",
    preview:
      "하나의 게시글에 여러 카테고리를 함께 적용하는 예시입니다. 공지사항과 일반 카테고리 칩이 함께 표시될 때의 레이아웃을 확인해 보세요.",
    timeAgo: "2시간 전",
    viewcount: "97",
    likecount: "15",
    imageType: "6",
    authorName: "칩테스터",
    authorRole: "QA 엔지니어",
    date: "26.05.01",
    content:
      "하나의 게시글에 여러 카테고리를 함께 적용하는 예시입니다. 공지사항과 일반 카테고리 칩이 함께 표시될 때의 레이아웃을 확인해 보세요. 칩 간 간격과 줄바꿈 처리가 특히 중요한 포인트였습니다.",
  },
];
