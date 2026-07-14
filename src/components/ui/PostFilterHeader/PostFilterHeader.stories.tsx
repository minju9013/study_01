import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import { PostFilterHeader } from "./PostFilterHeader";

const meta = {
  title: "UI/PostFilterHeader",
  component: PostFilterHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/?node-id=764-2375",
    },
  },
  argTypes: {
    title: { control: "text" },
    writeLabel: { control: "text" },
    onWriteClick: { action: "writeClicked" },
    onSortChange: { action: "sortChanged" },
    onSearchChange: { action: "searchChanged" },
  },
} satisfies Meta<typeof PostFilterHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  기본                                                                 */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    activeSort: "latest",
  },
};

/* ------------------------------------------------------------------ */
/*  인기글 정렬 선택 상태                                                   */
/* ------------------------------------------------------------------ */

export const PopularSelected: Story = {
  args: {
    activeSort: "popular",
  },
};

/* ------------------------------------------------------------------ */
/*  커스텀 타이틀/버튼 레이블                                                */
/* ------------------------------------------------------------------ */

export const CustomLabels: Story = {
  args: {
    title: "인기 게시글",
    writeLabel: "새 글 작성",
    activeSort: "latest",
  },
};

/* ------------------------------------------------------------------ */
/*  Controlled 상호작용 + play function                                  */
/* ------------------------------------------------------------------ */

function ControlledPostFilterHeader() {
  const [activeSort, setActiveSort] = useState("latest");
  const [searchValue, setSearchValue] = useState("");
  return (
    <PostFilterHeader
      activeSort={activeSort}
      onSortChange={setActiveSort}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
}

export const Interactive: Story = {
  render: () => <ControlledPostFilterHeader />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 글쓰기 버튼 노출 확인
    await expect(
      canvas.getByRole("button", { name: "글쓰기" }),
    ).toBeInTheDocument();

    // 정렬 탭 전환
    const popularTab = canvas.getByRole("tab", { name: "인기글" });
    await userEvent.click(popularTab);
    await expect(popularTab).toHaveAttribute("aria-selected", "true");
  },
};
