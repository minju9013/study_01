import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

import { ColorPage, type ColorGroup } from "./colorSwatch";

const SEMANTIC_GROUPS: ColorGroup[] = [
  {
    name: "Brand",
    variables: [
      "--brand-primary",
      "--brand-google-red",
      "--brand-google-yellow",
      "--brand-google-blue",
      "--brand-google-green",
    ],
  },
  {
    name: "Text",
    variables: [
      "--text-primary",
      "--text-secondary",
      "--text-tertiary",
      "--text-disabled",
      "--text-onbrand",
      "--text-danger",
    ],
  },
  {
    name: "Background",
    variables: [
      "--background-default",
      "--background-subtle",
      "--background-muted",
      "--background-brand",
      "--background-brandsubtle",
      "--background-danger",
      "--background-dangersubtle",
    ],
  },
  {
    name: "Border",
    variables: [
      "--border-default",
      "--border-strong",
      "--border-brand",
      "--border-danger",
    ],
  },
  {
    name: "Interactive",
    variables: [
      "--interactive-primary",
      "--interactive-primaryhover",
      "--interactive-destructive",
      "--interactive-destructivehover",
    ],
  },
  {
    name: "Content",
    variables: ["--content-strong", "--content-default", "--content-muted"],
  },
];

function SemanticColors() {
  return <ColorPage title="Semantic" groups={SEMANTIC_GROUPS} />;
}

const meta = {
  title: "Foundation/Colors/Semantic",
  component: SemanticColors,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-실습자료--Part-2.-클로드-코드-Figma-MCP-조합으로-디자인-시스템-구축하기?node-id=4035-883",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SemanticColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSemanticColors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText("--brand-primary")).toBeInTheDocument();
    });

    const referenceLabels = canvas.getAllByText(/^→ --primitive-/);
    expect(referenceLabels.length).toBeGreaterThan(0);
  },
};
