import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Chip } from "./Chip";

const meta = {
  title: "UI/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=137-1763",
    },
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["category", "notice"],
      description: "칩 유형",
    },
    label: {
      control: "text",
      description: "칩 라벨 (미입력 시 type별 기본값 사용)",
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Category: Story = {
  args: {
    type: "category",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByText("디자인");
    await expect(chip).toBeInTheDocument();
  },
};

export const Notice: Story = {
  args: {
    type: "notice",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByText("공지사항");
    await expect(chip).toBeInTheDocument();
  },
};

export const CustomLabel: Story = {
  args: {
    type: "category",
    label: "개발",
  },
};

export const CustomIcon: Story = {
  args: {
    type: "notice",
    label: "튜토리얼",
    icon: "pencil",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("튜토리얼")).toBeInTheDocument();
  },
};
