import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PostCard } from "./PostCard";

const meta = {
  title: "UI/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=137-1364",
    },
  },
  argTypes: {
    title: { control: "text", description: "게시글 제목" },
    preview: { control: "text", description: "게시글 미리보기" },
    timeAgo: { control: "text", description: "작성 시간" },
    showThum: { control: "boolean", description: "썸네일 표시 여부" },
    category: { control: "boolean", description: "카테고리 칩 표시" },
    notice: { control: "boolean", description: "공지 칩 표시" },
    viewcount: { control: "text", description: "조회수" },
    likecount: { control: "text", description: "좋아요 수" },
    imageType: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6"],
      description: "썸네일 이미지 크롭/오프셋 프리셋",
    },
  },
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  title: "Figma MCP와 Claude로 디자인 시스템 구축하기",
  preview:
    "Figma MCP를 활용하면 디자인 토큰을 코드와 자동으로 동기화할 수 있습니다. 이번 글에서는 실제 프로젝트에 적용한 경험을 공유합니다.",
  timeAgo: "3시간 전",
  viewcount: "1,234",
  likecount: "56",
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    showThum: true,
    category: true,
    notice: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Figma MCP와 Claude로 디자인 시스템 구축하기"),
    ).toBeInTheDocument();
    await expect(canvas.getByText("3시간 전")).toBeInTheDocument();
  },
};

export const WithNotice: Story = {
  args: {
    ...defaultArgs,
    showThum: true,
    category: true,
    notice: true,
  },
};

export const NoThumbnail: Story = {
  args: {
    ...defaultArgs,
    showThum: false,
    category: true,
    notice: false,
  },
};

export const NoticeOnly: Story = {
  args: {
    ...defaultArgs,
    showThum: false,
    category: false,
    notice: true,
  },
};

export const ChipsOverride: Story = {
  args: {
    ...defaultArgs,
    showThum: true,
    chips: [
      { type: "notice", label: "튜토리얼", icon: "pencil" },
      { type: "category", label: "AI", icon: "ai" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("튜토리얼")).toBeInTheDocument();
    await expect(canvas.getByText("AI")).toBeInTheDocument();
  },
};

/* ------------------------------------------------------------------ */
/*  좋아요/북마크 클릭 → 콜백 호출 (카드 클릭과 전파 충돌 없어야 함)              */
/* ------------------------------------------------------------------ */

export const WithLikeAndBookmark: Story = {
  args: {
    ...defaultArgs,
    liked: false,
    onLikeToggle: fn(),
    bookmarked: false,
    onBookmarkToggle: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("switch", { name: "좋아요" }));
    await expect(args.onLikeToggle).toHaveBeenCalledWith(true);

    await userEvent.click(canvas.getByRole("switch", { name: "북마크" }));
    await expect(args.onBookmarkToggle).toHaveBeenCalledWith(true);
  },
};
