import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { PostDate } from "./PostDate";

const meta = {
  title: "UI/PostDate",
  component: PostDate,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/?node-id=781-5082",
    },
  },
  argTypes: {
    date: { control: "text" },
  },
} satisfies Meta<typeof PostDate>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  기본                                                                 */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    date: "26.05.06",
  },
};

/* ------------------------------------------------------------------ */
/*  다른 날짜 형식 예시                                                    */
/* ------------------------------------------------------------------ */

export const AnotherDate: Story = {
  args: {
    date: "25.12.31",
  },
};

/* ------------------------------------------------------------------ */
/*  렌더링 확인 + play function                                          */
/* ------------------------------------------------------------------ */

export const RendersDate: Story = {
  args: {
    date: "26.05.06",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(args.date)).toBeInTheDocument();
  },
};
