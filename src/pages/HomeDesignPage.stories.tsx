import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { HomeDesignPage } from "./HomeDesignPage";

const meta = {
  title: "Pages/HomeDesignPage",
  component: HomeDesignPage,
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
} satisfies Meta<typeof HomeDesignPage>;

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
      canvas.getByRole("tab", { name: "디자인 팁" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { name: "실시간 게시글" }),
    ).toBeInTheDocument();
    await expect(canvas.getByText("추천순")).toBeInTheDocument();
    await expect(canvas.getByText("최신순")).toBeInTheDocument();
    await expect(
      canvas.getByText("Auto Layout 완벽 가이드"),
    ).toBeInTheDocument();
    await expect(canvas.getAllByText("튜토리얼")).toHaveLength(2);
    await expect(canvas.getByText("리소스")).toBeInTheDocument();
    await expect(canvas.getByText("AI")).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "로그아웃" }),
    ).toBeInTheDocument();
  },
};

/* ------------------------------------------------------------------ */
/*  최신순 정렬 선택 상태                                                  */
/* ------------------------------------------------------------------ */

export const PopularSortActive: Story = {
  args: {
    activeSort: "popular",
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
      name: "Auto Layout 완벽 가이드 게시글 상세보기",
    });
    await userEvent.click(postButton);
    await expect(args.onPostClick).toHaveBeenCalledWith("1");
  },
};
