import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PostCardStats } from "./PostCardStats";

const meta = {
  title: "UI/PostCardStats",
  component: PostCardStats,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=783-2846",
    },
  },
  argTypes: {
    viewcount: {
      control: "text",
      description: "조회수",
    },
    likecount: {
      control: "text",
      description: "좋아요 수",
    },
    liked: {
      control: "boolean",
      description:
        "좋아요 여부. onLikeToggle과 함께 전달된 경우에만 클릭 가능해진다",
    },
    onLikeToggle: {
      description: "좋아요 클릭 시 다음 상태를 전달하는 콜백",
    },
    bookmarked: {
      control: "boolean",
      description:
        "북마크 여부. onBookmarkToggle과 함께 전달된 경우에만 북마크 아이콘이 표시된다",
    },
    onBookmarkToggle: {
      description: "북마크 클릭 시 다음 상태를 전달하는 콜백",
    },
  },
} satisfies Meta<typeof PostCardStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    viewcount: "0",
    likecount: "0",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const counts = canvas.getAllByText("0");
    await expect(counts).toHaveLength(2);
  },
};

export const WithCounts: Story = {
  args: {
    viewcount: "1,234",
    likecount: "56",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("1,234")).toBeInTheDocument();
    await expect(canvas.getByText("56")).toBeInTheDocument();
    await expect(canvas.queryByRole("switch")).not.toBeInTheDocument();
  },
};

export const WithLike: Story = {
  args: {
    viewcount: "1,234",
    likecount: "56",
    liked: false,
    onLikeToggle: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const likeButton = canvas.getByRole("switch", { name: "좋아요" });
    await expect(likeButton).toHaveAttribute("aria-checked", "false");

    await userEvent.click(likeButton);
    await expect(args.onLikeToggle).toHaveBeenCalledWith(true);
  },
};

export const LikeFilled: Story = {
  args: {
    viewcount: "1,234",
    likecount: "57",
    liked: true,
    onLikeToggle: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likeButton = canvas.getByRole("switch", { name: "좋아요" });
    await expect(likeButton).toHaveAttribute("aria-checked", "true");
  },
};

export const WithBookmark: Story = {
  args: {
    viewcount: "1,234",
    likecount: "56",
    bookmarked: false,
    onBookmarkToggle: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const bookmarkButton = canvas.getByRole("switch");
    await expect(bookmarkButton).toHaveAttribute("aria-checked", "false");

    await userEvent.click(bookmarkButton);
    await expect(args.onBookmarkToggle).toHaveBeenCalledWith(true);
  },
};

export const BookmarkFilled: Story = {
  args: {
    viewcount: "1,234",
    likecount: "56",
    bookmarked: true,
    onBookmarkToggle: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bookmarkButton = canvas.getByRole("switch");
    await expect(bookmarkButton).toHaveAttribute("aria-checked", "true");
  },
};
