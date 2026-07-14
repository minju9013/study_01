import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { PostCardImage } from "./PostCardImage";

const meta = {
  title: "UI/PostCardImage",
  component: PostCardImage,
  tags: ["autodocs"],
  parameters: {
    design: {
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-%EC%8B%A4%EC%8A%B5%EC%9E%90%EB%A3%8C--Part-2.-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BD%94%EB%93%9C-Figma-MCP-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0?node-id=783-7868",
    },
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["1", "2", "3", "4", "5", "6"],
      description: "이미지 타입 (1~6)",
    },
    alt: {
      control: "text",
      description: "이미지 대체 텍스트",
    },
  },
} satisfies Meta<typeof PostCardImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "1",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole("img");
    await expect(img).toBeInTheDocument();
  },
};

export const Type1: Story = {
  args: { type: "1" },
};

export const Type2: Story = {
  args: { type: "2" },
};

export const Type3: Story = {
  args: { type: "3" },
};

export const Type4: Story = {
  args: { type: "4" },
};

export const Type5: Story = {
  args: { type: "5" },
};

export const Type6: Story = {
  args: { type: "6" },
};

export const AllTypes: Story = {
  render: () => (
    <div
      style={{ display: "flex", gap: "var(--spacing-12)", flexWrap: "wrap" }}
    >
      {(["1", "2", "3", "4", "5", "6"] as const).map((type) => (
        <PostCardImage key={type} type={type} alt={`type ${type}`} />
      ))}
    </div>
  ),
};
