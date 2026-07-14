import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import { ContentInputContainer } from "./ContentInputContainer";

const meta = {
  title: "UI/ContentInputContainer",
  component: ContentInputContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/?node-id=783-2817",
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    value: { control: "text" },
    image: {
      control: "select",
      options: [undefined, "1", "2", "3", "4", "5", "6"],
    },
    readOnly: { control: "boolean" },
  },
} satisfies Meta<typeof ContentInputContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  Empty — 입력 전 상태 (placeholder). 테두리/패딩은 입력 상태와 무관하게      */
/*  항상 유지된다.                                                        */
/* ------------------------------------------------------------------ */

export const Empty: Story = {
  args: {},
};

/* ------------------------------------------------------------------ */
/*  Filled — 텍스트만 입력된 상태 (테두리/패딩은 Empty와 동일하게 유지)         */
/* ------------------------------------------------------------------ */

export const FilledTextOnly: Story = {
  args: {
    value:
      "오늘 디자인 시스템을 처음부터 구축해봤는데 생각보다 재밌었어요. 다음에는 토큰 자동화까지 붙여볼 예정입니다.",
  },
};

/* ------------------------------------------------------------------ */
/*  Filled — 이미지 + 텍스트                                              */
/* ------------------------------------------------------------------ */

export const FilledWithImage: Story = {
  args: {
    value: "오늘 작업한 화면 공유합니다!",
    image: "1",
  },
};

/* ------------------------------------------------------------------ */
/*  ReadOnly — 게시글 상세보기 화면에서 사용하는 읽기 전용 상태               */
/* ------------------------------------------------------------------ */

export const ReadOnly: Story = {
  args: {
    value:
      "게시글 상세보기에서는 본문을 수정할 수 없습니다. 읽기 전용으로 표시됩니다.",
    image: "1",
    readOnly: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByDisplayValue(
      "게시글 상세보기에서는 본문을 수정할 수 없습니다. 읽기 전용으로 표시됩니다.",
    );
    await expect(textarea).toHaveAttribute("readonly");
  },
};

/* ------------------------------------------------------------------ */
/*  Controlled 상호작용 + play function (empty → filled 전환)              */
/* ------------------------------------------------------------------ */

function ControlledContentInputContainer() {
  const [value, setValue] = useState("");
  return (
    <ContentInputContainer
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export const Interactive: Story = {
  render: () => <ControlledContentInputContainer />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText("게시글 내용을 입력해주세요.");

    await userEvent.type(textarea, "타이핑 시작하면 filled 상태로 전환됩니다.");
    await expect(textarea).toHaveValue(
      "타이핑 시작하면 filled 상태로 전환됩니다.",
    );
  },
};
