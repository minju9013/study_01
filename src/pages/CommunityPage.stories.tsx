import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { CommunityPage } from "./CommunityPage";
import { MOCK_POSTS } from "../data/mockPosts";

const meta = {
  title: "Pages/CommunityPage",
  component: CommunityPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/?node-id=2098-567",
    },
  },
  argTypes: {
    activeSort: { control: "text" },
    searchValue: { control: "text" },
  },
  args: {
    posts: MOCK_POSTS,
    onLikeToggle: fn(),
    onBookmarkToggle: fn(),
  },
} satisfies Meta<typeof CommunityPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  기본                                                                 */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "전체 게시글" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("피그마 커뮤니티는 역시 피그마피디아"),
    ).toBeInTheDocument();
    await expect(canvas.getByText("최신글")).toBeInTheDocument();
    await expect(canvas.getByText("인기글")).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "로그아웃" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "글쓰기" }),
    ).toBeInTheDocument();
  },
};

/* ------------------------------------------------------------------ */
/*  인기글 정렬 선택 상태                                                  */
/* ------------------------------------------------------------------ */

export const PopularSortActive: Story = {
  args: {
    activeSort: "popular",
  },
};

/* ------------------------------------------------------------------ */
/*  검색어 입력 상태                                                       */
/* ------------------------------------------------------------------ */

export const WithSearchValue: Story = {
  args: {
    searchValue: "피그마피디아",
  },
};

/* ------------------------------------------------------------------ */
/*  게시글 카드 클릭 → onPostClick 호출 (상세보기 이동)                       */
/* ------------------------------------------------------------------ */

export const ClickPostCard: Story = {
  args: {
    onPostClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const postButton = canvas.getByRole("button", {
      name: "피그마 커뮤니티는 역시 피그마피디아 게시글 상세보기",
    });
    await userEvent.click(postButton);
    await expect(args.onPostClick).toHaveBeenCalledWith("1");
  },
};

/* ------------------------------------------------------------------ */
/*  좋아요/북마크 클릭 → 카드 이동(onPostClick)과 충돌 없이 콜백만 호출          */
/* ------------------------------------------------------------------ */

export const ToggleLikeAndBookmark: Story = {
  args: {
    onPostClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const likeButtons = canvas.getAllByRole("switch", { name: "좋아요" });

    await userEvent.click(likeButtons[0]);
    await expect(args.onLikeToggle).toHaveBeenCalledWith("1", true);
    await expect(args.onPostClick).not.toHaveBeenCalled();

    const bookmarkButtons = canvas.getAllByRole("switch", { name: "북마크" });
    await userEvent.click(bookmarkButtons[0]);
    await expect(args.onBookmarkToggle).toHaveBeenCalledWith("1", true);
    await expect(args.onPostClick).not.toHaveBeenCalled();
  },
};
