import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { MemoryRouter } from "react-router-dom";
import { CommunityWritePage } from "./CommunityWritePage";

const meta = {
  title: "Pages/CommunityWritePage",
  component: CommunityWritePage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-시밀즈라러--Part-2.-크로드-코드-Figma-MCP-조하비을로-디자인-시스템-구성하가?node-id=764-2245",
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/home/write"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof CommunityWritePage>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  기본                                                                 */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "게시글 쓰기" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("건전한 커뮤니티를 위해 바른말 고운말을 씁시다."),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "뒤로가기" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "등록하기" }),
    ).toBeInTheDocument();
  },
};

/* ------------------------------------------------------------------ */
/*  제목/본문 입력 상호작용                                                 */
/* ------------------------------------------------------------------ */

export const FillForm: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const titleInput = canvas.getByPlaceholderText("제목을 입력해주세요");
    await userEvent.type(titleInput, "새 게시글 제목입니다");
    await expect(titleInput).toHaveValue("새 게시글 제목입니다");

    const contentInput =
      canvas.getByPlaceholderText("게시글 내용을 입력해주세요.");
    await userEvent.type(contentInput, "게시글 본문 내용입니다");
    await expect(contentInput).toHaveValue("게시글 본문 내용입니다");
  },
};

/* ------------------------------------------------------------------ */
/*  등록하기 클릭 → onSubmit 호출                                          */
/* ------------------------------------------------------------------ */

export const SubmitForm: Story = {
  args: {
    onSubmit: fn(async () => {}),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByPlaceholderText("제목을 입력해주세요"),
      "새 게시글 제목",
    );
    await userEvent.type(
      canvas.getByPlaceholderText("게시글 내용을 입력해주세요."),
      "새 게시글 본문",
    );
    await userEvent.click(canvas.getByRole("button", { name: "등록하기" }));

    await expect(args.onSubmit).toHaveBeenCalledWith({
      title: "새 게시글 제목",
      content: "새 게시글 본문",
    });
  },
};
