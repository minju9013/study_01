import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { LoginForm } from "./LoginForm";

const FIGMA_URL =
  "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=781-5797";

const meta = {
  title: "UI/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
  },
  argTypes: {
    emailError: { control: "text", description: "이메일 에러 메시지" },
    passwordError: { control: "text", description: "비밀번호 에러 메시지" },
    isLoading: { control: "boolean", description: "로딩 상태" },
    asCard: {
      control: "boolean",
      description: "자체 카드 스타일(폭/패딩/배경/radius) 적용 여부",
    },
    showDivider: {
      control: "boolean",
      description: "'또는' 구분선 표시 여부",
    },
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "로그인" }),
    ).toBeInTheDocument();
    await expect(canvas.getByLabelText("이메일")).toBeInTheDocument();
    await expect(canvas.getByLabelText("비밀번호")).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "로그인" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: /구글로 로그인/ }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "회원가입" }),
    ).toBeInTheDocument();
  },
};

export const WithValidationErrors: Story = {
  args: {
    emailError: "올바른 이메일 형식을 입력해주세요",
    passwordError: "비밀번호는 8자 이상이어야 합니다",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("올바른 이메일 형식을 입력해주세요"),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("비밀번호는 8자 이상이어야 합니다"),
    ).toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: { isLoading: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByRole("button", { name: "로그인 중..." });
    await expect(submitBtn).toBeDisabled();
  },
};

export const WithoutCard: Story = {
  args: { asCard: false },
  parameters: { layout: "padded" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const form = canvas
      .getByRole("heading", { name: "로그인" })
      .closest("form");
    await expect(form).toHaveStyle({ padding: "0px" });
    await expect(form).toHaveAttribute(
      "style",
      expect.stringContaining("width: 100%"),
    );
  },
};

export const WithoutDivider: Story = {
  args: { showDivider: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText("또는")).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: /구글로 로그인/ }),
    ).toBeInTheDocument();
  },
};

export const InteractiveLogin: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText("이메일");
    const passwordInput = canvas.getByLabelText("비밀번호");
    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password123");
    await expect(emailInput).toHaveValue("user@example.com");
    await expect(passwordInput).toHaveValue("password123");
    const rememberCheckbox = canvas.getByRole("checkbox");
    await userEvent.click(rememberCheckbox);
    await expect(rememberCheckbox).toBeChecked();
  },
};
