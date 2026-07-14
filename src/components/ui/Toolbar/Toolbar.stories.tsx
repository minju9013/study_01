import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import { Toolbar, type SortOption } from "./Toolbar";

const meta = {
  title: "UI/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/?node-id=781-5336",
    },
  },
  argTypes: {
    activeSort: {
      control: "text",
      description: "현재 선택된 정렬 value",
    },
    searchPlaceholder: {
      control: "text",
      description: "검색 placeholder",
    },
    onSortChange: { action: "sortChanged" },
    onSearchChange: { action: "searchChanged" },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  기본 — 최신글 선택                                                    */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    activeSort: "latest",
  },
};

/* ------------------------------------------------------------------ */
/*  인기글 선택 상태                                                      */
/* ------------------------------------------------------------------ */

export const PopularSelected: Story = {
  args: {
    activeSort: "popular",
  },
};

/* ------------------------------------------------------------------ */
/*  정렬 옵션 N개 일반화 예시                                              */
/* ------------------------------------------------------------------ */

const THREE_OPTIONS: SortOption[] = [
  { value: "latest", label: "최신글" },
  { value: "popular", label: "인기글" },
  { value: "comments", label: "댓글순" },
];

export const MultipleSortOptions: Story = {
  args: {
    sortOptions: THREE_OPTIONS,
    activeSort: "comments",
  },
};

/* ------------------------------------------------------------------ */
/*  검색어 입력 상태                                                      */
/* ------------------------------------------------------------------ */

export const WithSearchValue: Story = {
  args: {
    activeSort: "latest",
    searchValue: "디자인 시스템",
  },
};

/* ------------------------------------------------------------------ */
/*  Controlled 상호작용 + play function                                  */
/* ------------------------------------------------------------------ */

function ControlledToolbar() {
  const [activeSort, setActiveSort] = useState("latest");
  const [searchValue, setSearchValue] = useState("");
  return (
    <Toolbar
      activeSort={activeSort}
      onSortChange={setActiveSort}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
}

export const Interactive: Story = {
  render: () => <ControlledToolbar />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 정렬 탭 전환: 인기글 클릭 시 aria-selected 갱신
    const popularTab = canvas.getByRole("tab", { name: "인기글" });
    await userEvent.click(popularTab);
    await expect(popularTab).toHaveAttribute("aria-selected", "true");

    // 검색 input 타이핑
    const searchInput = canvas.getByRole("searchbox", { name: "검색" });
    await userEvent.type(searchInput, "React");
    await expect(searchInput).toHaveValue("React");
  },
};
