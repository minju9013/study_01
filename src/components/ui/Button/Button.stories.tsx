import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=781-5374",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "버튼 크기",
    },
    variant: {
      control: "select",
      options: [
        "core",
        "core-light",
        "mono",
        "mono-light",
        "warning",
        "warning-light",
        "outline",
      ],
      description: "버튼 스타일 variant",
    },
    iconOnly: {
      control: "boolean",
      description: "아이콘만 표시 여부",
    },
    icon: {
      control: "select",
      options: [
        undefined,
        "search",
        "close",
        "arrow-left",
        "arrow-right",
        "user",
        "check",
        "pencil",
        "heart-fill",
        "notification",
        "message",
      ],
      description: "leading 아이콘 이름",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    children: {
      control: "text",
      description: "버튼 레이블",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  기본 / 인터랙션                                                       */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    variant: "core",
    size: "md",
    children: "Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Button" });
    await expect(button).toBeInTheDocument();
    await expect(button).not.toBeDisabled();
    await userEvent.click(button);
  },
};

export const Disabled: Story = {
  args: {
    variant: "core",
    size: "md",
    children: "Button",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Button" });
    await expect(button).toBeDisabled();
  },
};

/* ------------------------------------------------------------------ */
/*  Variant별 Story                                                     */
/* ------------------------------------------------------------------ */

export const Core: Story = {
  args: {
    variant: "core",
    size: "md",
    children: "Button",
  },
};

export const CoreLight: Story = {
  args: {
    variant: "core-light",
    size: "md",
    children: "Button",
  },
};

export const Mono: Story = {
  args: {
    variant: "mono",
    size: "md",
    children: "Button",
  },
};

export const MonoLight: Story = {
  args: {
    variant: "mono-light",
    size: "md",
    children: "Button",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    size: "md",
    children: "Button",
  },
};

export const WarningLight: Story = {
  args: {
    variant: "warning-light",
    size: "md",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "md",
    children: "Button",
  },
};

/* ------------------------------------------------------------------ */
/*  Size별 Story                                                        */
/* ------------------------------------------------------------------ */

export const SizeSm: Story = {
  args: {
    variant: "core",
    size: "sm",
    children: "Button",
  },
};

export const SizeMd: Story = {
  args: {
    variant: "core",
    size: "md",
    children: "Button",
  },
};

export const SizeLg: Story = {
  args: {
    variant: "core",
    size: "lg",
    children: "Button",
  },
};

/* ------------------------------------------------------------------ */
/*  아이콘 포함                                                           */
/* ------------------------------------------------------------------ */

export const WithIcon: Story = {
  args: {
    variant: "core",
    size: "md",
    icon: "search",
    children: "검색",
  },
};

export const IconOnly: Story = {
  args: {
    variant: "core",
    size: "md",
    icon: "search",
    iconOnly: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await expect(button).toBeInTheDocument();
    await expect(button).not.toBeDisabled();
  },
};

/* ------------------------------------------------------------------ */
/*  전체 variant 그리드                                                   */
/* ------------------------------------------------------------------ */

export const AllVariants: Story = {
  args: { size: "md", children: "Button" },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-16)",
        padding: "var(--spacing-24)",
        backgroundColor: "var(--background-muted)",
        borderRadius: "var(--radius-md)",
      }}
    >
      {/* 헤더 행 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-16)",
        }}
      >
        <span
          style={{
            font: "var(--caption-lg-regular)",
            color: "var(--text-tertiary)",
            minWidth: "120px",
          }}
        />
        <span
          style={{
            font: "var(--caption-lg-regular)",
            color: "var(--text-tertiary)",
            minWidth: "66px",
            textAlign: "center",
          }}
        >
          sm
        </span>
        <span
          style={{
            font: "var(--caption-lg-regular)",
            color: "var(--text-tertiary)",
            minWidth: "77px",
            textAlign: "center",
          }}
        >
          md
        </span>
        <span
          style={{
            font: "var(--caption-lg-regular)",
            color: "var(--text-tertiary)",
            minWidth: "91px",
            textAlign: "center",
          }}
        >
          lg
        </span>
        <span
          style={{
            font: "var(--caption-lg-regular)",
            color: "var(--text-tertiary)",
            minWidth: "77px",
            textAlign: "center",
          }}
        >
          disabled
        </span>
        <span
          style={{
            font: "var(--caption-lg-regular)",
            color: "var(--text-tertiary)",
            minWidth: "32px",
            textAlign: "center",
          }}
        >
          icon-sm
        </span>
        <span
          style={{
            font: "var(--caption-lg-regular)",
            color: "var(--text-tertiary)",
            minWidth: "44px",
            textAlign: "center",
          }}
        >
          icon-md
        </span>
        <span
          style={{
            font: "var(--caption-lg-regular)",
            color: "var(--text-tertiary)",
            minWidth: "56px",
            textAlign: "center",
          }}
        >
          icon-lg
        </span>
        <span
          style={{
            font: "var(--caption-lg-regular)",
            color: "var(--text-tertiary)",
            minWidth: "44px",
            textAlign: "center",
          }}
        >
          icon-dis
        </span>
      </div>
      {(
        [
          "core",
          "core-light",
          "mono",
          "mono-light",
          "warning",
          "warning-light",
          "outline",
        ] as const
      ).map((variant) => (
        <div
          key={variant}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-16)",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              font: "var(--caption-lg-regular)",
              color: "var(--text-secondary)",
              minWidth: "120px",
            }}
          >
            {variant}
          </span>
          {/* label 버튼 */}
          <Button {...args} variant={variant} size="sm" />
          <Button {...args} variant={variant} size="md" />
          <Button {...args} variant={variant} size="lg" />
          <Button {...args} variant={variant} size="md" disabled />
          {/* icon-only 버튼 */}
          <Button variant={variant} size="sm" iconOnly icon="iconview" />
          <Button variant={variant} size="md" iconOnly icon="iconview" />
          <Button variant={variant} size="lg" iconOnly icon="iconview" />
          <Button
            variant={variant}
            size="md"
            iconOnly
            icon="iconview"
            disabled
          />
        </div>
      ))}
    </div>
  ),
};

export const IconOnlyAllVariants: Story = {
  args: { iconOnly: true, icon: "iconview" },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-16)",
        padding: "var(--spacing-24)",
        backgroundColor: "var(--background-muted)",
        borderRadius: "var(--radius-md)",
      }}
    >
      {(
        [
          "core",
          "core-light",
          "mono",
          "mono-light",
          "warning",
          "warning-light",
          "outline",
        ] as const
      ).map((variant) => (
        <div
          key={variant}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-16)",
          }}
        >
          <span
            style={{
              font: "var(--caption-lg-regular)",
              color: "var(--text-secondary)",
              minWidth: "120px",
            }}
          >
            {variant}
          </span>
          <Button variant={variant} size="sm" iconOnly icon="iconview" />
          <Button variant={variant} size="md" iconOnly icon="iconview" />
          <Button variant={variant} size="lg" iconOnly icon="iconview" />
          <Button
            variant={variant}
            size="md"
            iconOnly
            icon="iconview"
            disabled
          />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");
    await expect(buttons.length).toBe(28); // 7 variants × 4 (sm, md, lg, disabled)
    for (const btn of buttons) {
      await expect(btn).toBeInTheDocument();
    }
  },
};
