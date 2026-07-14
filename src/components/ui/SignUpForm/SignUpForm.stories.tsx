import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { SignUpForm } from "./SignUpForm";

const FIGMA_URL =
  "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=4211-793";

const meta = {
  title: "UI/SignUpForm",
  component: SignUpForm,
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
    passwordConfirmError: {
      control: "text",
      description: "비밀번호 확인 에러 메시지",
    },
    isLoading: { control: "boolean", description: "로딩 상태" },
    asCard: {
      control: "boolean",
      description: "자체 카드 스타일(폭/패딩/배경/radius) 적용 여부",
    },
    showTitle: {
      control: "boolean",
      description: "'회원가입' 타이틀 표시 여부",
    },
  },
} satisfies Meta<typeof SignUpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "회원가입" }),
    ).toBeInTheDocument();
    await expect(canvas.getByLabelText("이메일")).toBeInTheDocument();
    await expect(canvas.getByLabelText("비밀번호")).toBeInTheDocument();
    await expect(canvas.getByLabelText("비밀번호 확인")).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "회원가입" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: /구글로 가입/ }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "로그인" }),
    ).toBeInTheDocument();
  },
};

export const WithValidationErrors: Story = {
  args: {
    emailError: "올바른 이메일 형식을 입력해주세요",
    passwordError: "비밀번호는 8자 이상이어야 합니다",
    passwordConfirmError: "비밀번호가 일치하지 않습니다",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("올바른 이메일 형식을 입력해주세요"),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("비밀번호는 8자 이상이어야 합니다"),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("비밀번호가 일치하지 않습니다"),
    ).toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: { isLoading: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByRole("button", { name: "회원가입 중..." });
    await expect(submitBtn).toBeDisabled();
  },
};

export const WithoutCard: Story = {
  args: { asCard: false },
  parameters: { layout: "padded" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const form = canvas
      .getByRole("heading", { name: "회원가입" })
      .closest("form");
    await expect(form).toHaveStyle({ padding: "0px" });
    await expect(form).toHaveAttribute(
      "style",
      expect.stringContaining("width: 100%"),
    );
  },
};

export const WithoutTitle: Story = {
  args: { showTitle: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.queryByRole("heading", { name: "회원가입" }),
    ).not.toBeInTheDocument();
    await expect(canvas.getByLabelText("이메일")).toBeInTheDocument();
  },
};

export const InteractiveSignUp: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText("이메일");
    const passwordInput = canvas.getByLabelText("비밀번호");
    const passwordConfirmInput = canvas.getByLabelText("비밀번호 확인");
    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.type(passwordConfirmInput, "password123");
    await expect(emailInput).toHaveValue("user@example.com");
    await expect(passwordInput).toHaveValue("password123");
    await expect(passwordConfirmInput).toHaveValue("password123");
  },
};

export const InteractivePasswordMismatch: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText("이메일");
    const passwordInput = canvas.getByLabelText("비밀번호");
    const passwordConfirmInput = canvas.getByLabelText("비밀번호 확인");
    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.type(passwordConfirmInput, "different123");
    const submitBtn = canvas.getByRole("button", { name: "회원가입" });
    await userEvent.click(submitBtn);
    await expect(
      canvas.getByText("비밀번호가 일치하지 않습니다"),
    ).toBeInTheDocument();
  },
};
