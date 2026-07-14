import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import { PostTitleInput } from "./PostTitleInput";

const meta = {
  title: "UI/PostTitleInput",
  component: PostTitleInput,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/?node-id=764-2345",
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    value: { control: "text" },
  },
} satisfies Meta<typeof PostTitleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  기본 (placeholder)                                                   */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {},
};

/* ------------------------------------------------------------------ */
/*  값이 입력된 상태                                                       */
/* ------------------------------------------------------------------ */

export const WithValue: Story = {
  args: {
    value: "디자인 시스템 구축 후기 공유합니다",
  },
};

/* ------------------------------------------------------------------ */
/*  Controlled 상호작용 + play function                                  */
/* ------------------------------------------------------------------ */

function ControlledPostTitleInput() {
  const [value, setValue] = useState("");
  return (
    <PostTitleInput value={value} onChange={(e) => setValue(e.target.value)} />
  );
}

export const Interactive: Story = {
  render: () => <ControlledPostTitleInput />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("제목을 입력해주세요");

    await userEvent.type(input, "새 게시글 제목");
    await expect(input).toHaveValue("새 게시글 제목");

    await userEvent.click(input);
    await expect(input).toHaveFocus();
  },
};
