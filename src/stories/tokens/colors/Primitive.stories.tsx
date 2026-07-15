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
      "--primitive-gray-100",
      "--primitive-gray-200",
      "--primitive-gray-300",
      "--primitive-gray-305",
      "--primitive-gray-340",
      "--primitive-gray-360",
      "--primitive-gray-400",
      "--primitive-gray-490",
      "--primitive-gray-500",
      "--primitive-gray-540",
      "--primitive-gray-600",
      "--primitive-gray-610",
      "--primitive-gray-700",
      "--primitive-gray-800",
      "--primitive-gray-850",
      "--primitive-gray-900",
      "--primitive-gray-1000",
      "--primitive-gray-1050",
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
