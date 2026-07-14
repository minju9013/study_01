import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { MemoryRouter } from "react-router-dom";
import { CommunityViewPage } from "./CommunityViewPage";
import { MOCK_POSTS } from "../data/mockPosts";

const meta = {
  title: "Pages/CommunityViewPage",
  component: CommunityViewPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-Part-2.-클로드-코드-Figma-MCP-조합으로-디자인-시스템-구성하기?node-id=783-3601",
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    onLikeToggle: fn(),
    onBookmarkToggle: fn(),
  },
} satisfies Meta<typeof CommunityViewPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  Default — id="1" 게시글 (Figma 레퍼런스와 동일한 콘텐츠)                  */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    post: MOCK_POSTS[0],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "피그마피디아 짱짱" }),
    ).toBeInTheDocument();
    await expect(canvas.getByText("피튜")).toBeInTheDocument();
    await expect(canvas.getByText("26.05.06")).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "뒤로가기" }),
    ).toBeInTheDocument();
    await expect(canvas.getByText("128")).toBeInTheDocument();
    await expect(canvas.getByText("12")).toBeInTheDocument();
  },
};

/* ------------------------------------------------------------------ */
/*  다른 게시글(id="4") — post prop에 따라 다른 게시글이 표시되는지 확인          */
/* ------------------------------------------------------------------ */

export const AnotherPost: Story = {
  args: {
    post: MOCK_POSTS[3],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "토큰장인" }),
    ).toBeInTheDocument();
    await expect(canvas.getByText("프론트엔드 엔지니어")).toBeInTheDocument();
    await expect(canvas.getByText("26.05.03")).toBeInTheDocument();
  },
};

/* ------------------------------------------------------------------ */
/*  본문 읽기 전용 상태 확인 (textarea readOnly 속성)                        */
/* ------------------------------------------------------------------ */

export const ReadOnlyContent: Story = {
  args: {
    post: MOCK_POSTS[0],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const content = canvas.getByDisplayValue(
      /피그마피디아 운영팀입니다\. 커뮤니티가 점점 성장하면서/,
    );
    await expect(content).toHaveAttribute("readonly");
  },
};

/* ------------------------------------------------------------------ */
/*  좋아요/북마크 클릭 → 콜백 호출                                          */
/* ------------------------------------------------------------------ */

export const ToggleLikeAndBookmark: Story = {
  args: {
    post: MOCK_POSTS[0],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("switch", { name: "좋아요" }));
    await expect(args.onLikeToggle).toHaveBeenCalledWith(true);

    await userEvent.click(canvas.getByRole("switch", { name: "북마크" }));
    await expect(args.onBookmarkToggle).toHaveBeenCalledWith(true);
  },
};

/* ------------------------------------------------------------------ */
/*  로딩 상태                                                             */
/* ------------------------------------------------------------------ */

export const Loading: Story = {
  args: {
    post: null,
    loading: true,
  },
};

/* ------------------------------------------------------------------ */
/*  게시글 없음                                                           */
/* ------------------------------------------------------------------ */

export const NotFound: Story = {
  args: {
    post: null,
    loading: false,
  },
};
