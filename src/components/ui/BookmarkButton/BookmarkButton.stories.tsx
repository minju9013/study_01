import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { BookmarkButton } from "./BookmarkButton";

const meta = {
  title: "UI/BookmarkButton",
  component: BookmarkButton,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=783-2846",
    },
  },
  args: {
    onToggle: fn(),
  },
  argTypes: {
    bookmarked: { control: "boolean", description: "북마크 여부" },
    disabled: { control: "boolean", description: "비활성화 여부" },
    onToggle: { description: "클릭 시 다음 북마크 상태를 전달하는 콜백" },
  },
} satisfies Meta<typeof BookmarkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    bookmarked: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("switch");
    await expect(button).toHaveAttribute("aria-checked", "false");

    await userEvent.click(button);
    await expect(args.onToggle).toHaveBeenCalledWith(true);
  },
};

export const Filled: Story = {
  args: {
    bookmarked: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("switch");
    await expect(button).toHaveAttribute("aria-checked", "true");

    await userEvent.click(button);
    await expect(args.onToggle).toHaveBeenCalledWith(false);
  },
};

export const Disabled: Story = {
  args: {
    bookmarked: false,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("switch");
    await expect(button).toBeDisabled();
  },
};
