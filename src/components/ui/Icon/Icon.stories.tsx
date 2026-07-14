import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Icon, type IconName } from "./Icon";

const ALL_ICONS: IconName[] = [
  "iconview",
  "arrow-left",
  "arrow-right",
  "user",
  "ai",
  "dog",
  "eye-on",
  "eye-off",
  "design",
  "menu",
  "notification",
  "close",
  "search",
  "message",
  "heart-empty",
  "heart-fill",
  "bookmark-empty",
  "bookmark-fill",
  "check",
  "pencil",
  "google",
];

const meta = {
  title: "UI/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%A1%9C%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=781-5290",
    },
  },
  argTypes: {
    name: {
      control: "select",
      options: ALL_ICONS,
      description: "렌더링할 아이콘 이름",
    },
    size: {
      control: { type: "number", min: 8, max: 64, step: 4 },
      description: "아이콘 크기 (px)",
    },
    color: {
      control: "text",
      description: "아이콘 색상 — currentColor 또는 CSS 변수",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
    "aria-label": {
      control: "text",
      description: "접근성 레이블",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "search",
    size: 24,
    color: "var(--text-primary)",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const svg = canvas.getByRole("img", { hidden: true });
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute("width", "24");
    await expect(svg).toHaveAttribute("height", "24");
  },
};

export const WithAriaLabel: Story = {
  args: {
    name: "close",
    size: 24,
    color: "var(--text-primary)",
    "aria-label": "닫기",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const svg = canvas.getByRole("img", { name: "닫기" });
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute("aria-label", "닫기");
  },
};

export const Sizes: Story = {
  args: { name: "search", color: "var(--text-primary)" },
  render: (args) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-16)",
        flexWrap: "wrap",
      }}
    >
      {[12, 16, 20, 24, 32, 40, 48].map((s) => (
        <div
          key={s}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--spacing-4)",
          }}
        >
          <Icon {...args} size={s} />
          <span
            style={{
              font: "var(--caption-sm-regular)",
              color: "var(--text-tertiary)",
            }}
          >
            {s}px
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  args: { name: "heart-fill", size: 24 },
  render: (args) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-16)",
        flexWrap: "wrap",
      }}
    >
      {[
        { label: "primary", token: "var(--text-primary)" },
        { label: "secondary", token: "var(--text-secondary)" },
        { label: "tertiary", token: "var(--text-tertiary)" },
        { label: "brand", token: "var(--brand-primary)" },
        { label: "danger", token: "var(--text-danger)" },
        { label: "disabled", token: "var(--text-disabled)" },
      ].map(({ label, token }) => (
        <div
          key={label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--spacing-4)",
          }}
        >
          <Icon {...args} color={token} />
          <span
            style={{
              font: "var(--caption-sm-regular)",
              color: "var(--text-tertiary)",
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const AllIcons: Story = {
  args: { name: "search", size: 24, color: "var(--text-primary)" },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--spacing-16)",
        padding: "var(--spacing-16)",
        backgroundColor: "var(--background-muted)",
        borderRadius: "var(--radius-md)",
      }}
    >
      {ALL_ICONS.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--spacing-8)",
            padding: "var(--spacing-12)",
            backgroundColor: "var(--background-default)",
            borderRadius: "var(--radius-sm)",
            minWidth: "var(--spacing-64)",
          }}
        >
          <Icon {...args} name={name} />
          <span
            style={{
              font: "var(--caption-sm-regular)",
              color: "var(--text-tertiary)",
              textAlign: "center",
              wordBreak: "break-all",
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const ArrowLeft: Story = {
  args: { name: "arrow-left", size: 24, color: "var(--text-primary)" },
};

export const ArrowRight: Story = {
  args: { name: "arrow-right", size: 24, color: "var(--text-primary)" },
};

export const User: Story = {
  args: { name: "user", size: 24, color: "var(--text-primary)" },
};

export const Ai: Story = {
  args: { name: "ai", size: 24, color: "var(--text-primary)" },
};

export const Dog: Story = {
  args: { name: "dog", size: 24, color: "var(--text-primary)" },
};

export const EyeOn: Story = {
  args: { name: "eye-on", size: 24, color: "var(--text-primary)" },
};

export const EyeOff: Story = {
  args: { name: "eye-off", size: 24, color: "var(--text-primary)" },
};

export const Design: Story = {
  args: { name: "design", size: 24, color: "var(--text-primary)" },
};

export const Menu: Story = {
  args: { name: "menu", size: 24, color: "var(--text-primary)" },
};

export const Notification: Story = {
  args: { name: "notification", size: 24, color: "var(--text-primary)" },
};

export const Close: Story = {
  args: { name: "close", size: 24, color: "var(--text-primary)" },
};

export const Search: Story = {
  args: { name: "search", size: 24, color: "var(--text-primary)" },
};

export const Message: Story = {
  args: { name: "message", size: 24, color: "var(--text-primary)" },
};

export const HeartEmpty: Story = {
  args: { name: "heart-empty", size: 24, color: "var(--text-primary)" },
};

export const HeartFill: Story = {
  args: { name: "heart-fill", size: 24, color: "var(--text-danger)" },
};

export const Check: Story = {
  args: { name: "check", size: 24, color: "var(--brand-primary)" },
};

export const Pencil: Story = {
  args: { name: "pencil", size: 24, color: "var(--text-primary)" },
};

export const Google: Story = {
  args: { name: "google", size: 24 },
};
