import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Divider } from "./Divider";

const meta = {
  title: "UI/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=781-5293",
    },
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "구분선 방향",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "400px",
          padding: "var(--spacing-16)",
          backgroundColor: "var(--background-default)",
        }}
      >
        <p
          style={{
            font: "var(--body-sm-regular)",
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          위 섹션 콘텐츠
        </p>
        <Story />
        <p
          style={{
            font: "var(--body-sm-regular)",
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          아래 섹션 콘텐츠
        </p>
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const divider = canvas.getByRole("separator");
    await expect(divider).toBeInTheDocument();
    await expect(divider).toHaveAttribute("aria-orientation", "horizontal");
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-16)",
          padding: "var(--spacing-16)",
          height: "48px",
          backgroundColor: "var(--background-default)",
        }}
      >
        <span
          style={{
            font: "var(--body-sm-regular)",
            color: "var(--text-primary)",
          }}
        >
          좌측 항목
        </span>
        <Story />
        <span
          style={{
            font: "var(--body-sm-regular)",
            color: "var(--text-primary)",
          }}
        >
          우측 항목
        </span>
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const divider = canvas.getByRole("separator");
    await expect(divider).toBeInTheDocument();
    await expect(divider).toHaveAttribute("aria-orientation", "vertical");
  },
};

export const WithContent: Story = {
  args: {
    orientation: "horizontal",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "400px",
          padding: "var(--spacing-16)",
          backgroundColor: "var(--background-default)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4)",
          }}
        >
          <p
            style={{
              font: "var(--body-lg-bold)",
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            섹션 제목
          </p>
          <p
            style={{
              font: "var(--body-sm-regular)",
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            첫 번째 섹션 내용입니다.
          </p>
        </div>
        <Story />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4)",
          }}
        >
          <p
            style={{
              font: "var(--body-lg-bold)",
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            다음 섹션 제목
          </p>
          <p
            style={{
              font: "var(--body-sm-regular)",
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            두 번째 섹션 내용입니다.
          </p>
        </div>
      </div>
    ),
  ],
};
