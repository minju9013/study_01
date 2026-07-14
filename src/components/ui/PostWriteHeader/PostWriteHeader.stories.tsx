import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { PostWriteHeader } from "./PostWriteHeader";

const meta = {
  title: "UI/PostWriteHeader",
  component: PostWriteHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/?node-id=764-2338",
    },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<typeof PostWriteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  기본                                                                 */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    description: "자유롭게 이야기를 나눠보세요.",
  },
};

/* ------------------------------------------------------------------ */
/*  커스텀 타이틀                                                         */
/* ------------------------------------------------------------------ */

export const CustomTitle: Story = {
  args: {
    title: "질문 게시글 쓰기",
    description: "궁금한 점을 자유롭게 남겨주세요.",
  },
};

/* ------------------------------------------------------------------ */
/*  렌더링 확인 + play function                                          */
/* ------------------------------------------------------------------ */

export const RendersContent: Story = {
  args: {
    title: "게시글 쓰기",
    description: "자유롭게 이야기를 나눠보세요.",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { name: args.title }),
    ).toBeInTheDocument();
    await expect(canvas.getByText(args.description)).toBeInTheDocument();
  },
};
