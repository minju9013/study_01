import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { InputField } from "./InputField";

const FIGMA_URL =
  "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=783-3924";

const meta = {
  title: "UI/InputField",
  component: InputField,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
  },
  argTypes: {
    visualState: {
      control: "select",
      options: ["default", "error", "disabled"],
      description: "시각적 상태",
    },
    type: {
      control: "select",
      options: ["text", "password", "email"],
      description: "input type",
    },
    label: { control: "text", description: "레이블" },
    placeholder: { control: "text", description: "플레이스홀더" },
    helptext: { control: "text", description: "도움말 텍스트" },
    value: { control: "text", description: "입력값" },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일을 입력해주세요",
    type: "email",
    visualState: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("이메일을 입력해주세요");
    await expect(input).toBeInTheDocument();
    await userEvent.type(input, "test@example.com");
    await expect(input).toHaveValue("test@example.com");
  },
};

export const Error: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일을 입력해주세요",
    value: "invalid-email",
    visualState: "error",
    helptext: "올바른 이메일 형식을 입력해주세요",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("올바른 이메일 형식을 입력해주세요"),
    ).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일을 입력해주세요",
    visualState: "disabled",
    helptext: "비활성화된 필드입니다",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("이메일을 입력해주세요");
    await expect(input).toBeDisabled();
  },
};

export const PasswordType: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력해주세요",
    type: "password",
    visualState: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("비밀번호를 입력해주세요");
    await expect(input).toHaveAttribute("type", "password");
    const toggleBtn = canvas.getByRole("button", { name: "비밀번호 보기" });
    await userEvent.click(toggleBtn);
    await expect(input).toHaveAttribute("type", "text");
    await userEvent.click(toggleBtn);
    await expect(input).toHaveAttribute("type", "password");
  },
};

export const WithHelptext: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일을 입력해주세요",
    helptext: "가입 시 사용한 이메일을 입력해주세요",
    visualState: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("가입 시 사용한 이메일을 입력해주세요"),
    ).toBeInTheDocument();
  },
};
