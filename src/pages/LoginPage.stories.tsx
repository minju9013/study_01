import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { LoginPage } from "./LoginPage";

const meta = {
  title: "Pages/LoginPage",
  component: LoginPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/?node-id=781-4699",
    },
  },
  argTypes: {
    emailError: { control: "text" },
    passwordError: { control: "text" },
    isLoading: { control: "boolean" },
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  기본                                                                 */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByAltText("FigmaPedia")).toBeInTheDocument();
    await expect(
      canvas.queryByRole("heading", { name: "로그인" }),
    ).not.toBeInTheDocument();
    await expect(canvas.queryByText("또는")).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: /구글로 로그인/ }),
    ).toBeInTheDocument();
  },
};

/* ------------------------------------------------------------------ */
/*  유효성 에러 상태                                                       */
/* ------------------------------------------------------------------ */

export const WithValidationErrors: Story = {
  args: {
    emailError: "올바른 이메일 형식을 입력해주세요",
    passwordError: "비밀번호는 8자 이상이어야 합니다",
  },
};

/* ------------------------------------------------------------------ */
/*  로딩 상태                                                             */
/* ------------------------------------------------------------------ */

export const Loading: Story = {
  args: { isLoading: true },
};

/* ------------------------------------------------------------------ */
/*  Interactive — 입력 흐름 확인                                          */
/* ------------------------------------------------------------------ */

export const Interactive: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText("이메일");
    const passwordInput = canvas.getByLabelText("비밀번호");

    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password123");

    await expect(emailInput).toHaveValue("user@example.com");
    await expect(passwordInput).toHaveValue("password123");
  },
};
