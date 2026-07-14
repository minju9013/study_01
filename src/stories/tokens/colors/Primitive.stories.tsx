import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

import { ColorPage, type ColorGroup } from "./colorSwatch";

const PRIMITIVE_GROUPS: ColorGroup[] = [
  {
    name: "Blue",
    variables: [
      "--primitive-blue-20",
      "--primitive-blue-50",
      "--primitive-blue-100",
      "--primitive-blue-120",
      "--primitive-blue-200",
      "--primitive-blue-280",
      "--primitive-blue-300",
      "--primitive-blue-400",
      "--primitive-blue-440",
      "--primitive-blue-500",
      "--primitive-blue-540",
      "--primitive-blue-600",
      "--primitive-blue-680",
      "--primitive-blue-700",
      "--primitive-blue-800",
      "--primitive-blue-900",
      "--primitive-blue-1000",
    ],
  },
  {
    name: "Gray",
    variables: [
      "--primitive-Gray-100",
      "--primitive-Gray-200",
      "--primitive-Gray-300",
      "--primitive-Gray-305",
      "--primitive-Gray-340",
      "--primitive-Gray-360",
      "--primitive-Gray-400",
      "--primitive-Gray-490",
      "--primitive-Gray-500",
      "--primitive-Gray-540",
      "--primitive-Gray-600",
      "--primitive-Gray-610",
      "--primitive-Gray-700",
      "--primitive-Gray-800",
      "--primitive-Gray-850",
      "--primitive-Gray-900",
      "--primitive-Gray-1000",
      "--primitive-Gray-1050",
    ],
  },
  {
    name: "Red",
    variables: [
      "--primitive-red-100",
      "--primitive-red-200",
      "--primitive-red-300",
      "--primitive-red-400",
      "--primitive-red-500",
      "--primitive-red-600",
      "--primitive-red-700",
      "--primitive-red-800",
      "--primitive-red-900",
      "--primitive-red-1000",
    ],
  },
  {
    name: "Google",
    variables: [
      "--primitive-google-red",
      "--primitive-google-yellow",
      "--primitive-google-blue",
      "--primitive-google-green",
    ],
  },
];

function PrimitiveColors() {
  return <ColorPage title="Primitive" groups={PRIMITIVE_GROUPS} />;
}

const meta = {
  title: "Foundation/Colors/Primitive",
  component: PrimitiveColors,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-실습자료--Part-2.-클로드-코드-Figma-MCP-조합으로-디자인-시스템-구축하기?node-id=4035-751",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PrimitiveColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPrimitiveColors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText("--primitive-blue-600")).toBeInTheDocument();
    });

    const swatchLabels = canvas.getAllByText(/^--/);
    expect(swatchLabels.length).toBeGreaterThan(0);
  },
};
