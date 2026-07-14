import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { ChipArea } from "./ChipArea";

const meta = {
  title: "UI/ChipArea",
  component: ChipArea,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=137-1754",
    },
  },
  argTypes: {
    category: {
      control: "boolean",
      description: "카테고리 칩 표시 여부",
    },
    notice: {
      control: "boolean",
      description: "공지 칩 표시 여부",
    },
  },
} satisfies Meta<typeof ChipArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CategoryOnly: Story = {
  args: {
    category: true,
    notice: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("디자인")).toBeInTheDocument();
    await expect(canvas.queryByText("공지사항")).not.toBeInTheDocument();
  },
};

export const NoticeOnly: Story = {
  args: {
    category: false,
    notice: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("공지사항")).toBeInTheDocument();
    await expect(canvas.queryByText("디자인")).not.toBeInTheDocument();
  },
};

export const Both: Story = {
  args: {
    category: true,
    notice: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("공지사항")).toBeInTheDocument();
    await expect(canvas.getByText("디자인")).toBeInTheDocument();
  },
};

export const ChipsOverride: Story = {
  args: {
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
