import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Navigation } from "./Navigation";

/* ------------------------------------------------------------------ */
/*  Meta                                                                */
/* ------------------------------------------------------------------ */

const meta = {
  title: "UI/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=781-5852",
    },
    layout: "fullscreen",
  },
  argTypes: {
    isLoggedIn: {
      control: "boolean",
      description: "로그인 여부 (true: 로그아웃 버튼, false: 로그인 버튼)",
    },
    activeItem: {
      control: "text",
      description: "현재 활성화된 탭의 value",
    },
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  공통 items                                                           */
/* ------------------------------------------------------------------ */

const SAMPLE_ITEMS = [
  { value: "community", label: "커뮤니티" },
  { value: "qna", label: "Q&A" },
  { value: "jobs", label: "채용" },
  { value: "study", label: "스터디" },
];

/* ------------------------------------------------------------------ */
/*  Stories                                                             */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    items: SAMPLE_ITEMS,
    activeItem: "community",
    isLoggedIn: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 로그인 버튼이 보여야 한다
    const loginButton = canvas.getByRole("button", { name: "로그인" });
    await expect(loginButton).toBeInTheDocument();
    // 활성 탭이 aria-selected=true
    const activeTab = canvas.getByRole("tab", { name: "커뮤니티" });
    await expect(activeTab).toHaveAttribute("aria-selected", "true");
  },
};

export const Login: Story = {
  name: "로그인 상태",
  args: {
    items: SAMPLE_ITEMS,
    activeItem: "community",
    isLoggedIn: false,
  },
};

export const Logout: Story = {
  name: "로그아웃 상태",
  args: {
    items: SAMPLE_ITEMS,
    activeItem: "community",
    isLoggedIn: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const logoutButton = canvas.getByRole("button", { name: "로그아웃" });
    await expect(logoutButton).toBeInTheDocument();
  },
};

export const TabInteraction: Story = {
  name: "탭 클릭 인터랙션",
  args: {
    items: SAMPLE_ITEMS,
    activeItem: "community",
    isLoggedIn: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 초기 상태: '커뮤니티' 탭이 selected
    const communityTab = canvas.getByRole("tab", { name: "커뮤니티" });
    await expect(communityTab).toHaveAttribute("aria-selected", "true");

    // Q&A 탭 클릭
    const qnaTab = canvas.getByRole("tab", { name: "Q&A" });
    await expect(qnaTab).toBeInTheDocument();
    await userEvent.click(qnaTab);
  },
};

export const SingleItem: Story = {
  name: "단일 탭",
  args: {
    items: [{ value: "community", label: "커뮤니티" }],
    activeItem: "community",
    isLoggedIn: false,
  },
};

export const ManyItems: Story = {
  name: "탭 다수 (가로 스크롤)",
  args: {
    items: [
      { value: "community", label: "커뮤니티" },
      { value: "qna", label: "Q&A" },
      { value: "jobs", label: "채용" },
      { value: "study", label: "스터디" },
      { value: "event", label: "이벤트" },
      { value: "news", label: "뉴스" },
      { value: "tech", label: "기술블로그" },
    ],
    activeItem: "qna",
    isLoggedIn: true,
  },
};

export const NoActiveItem: Story = {
  name: "선택된 탭 없음",
  args: {
    items: SAMPLE_ITEMS,
    activeItem: undefined,
    isLoggedIn: false,
  },
};
