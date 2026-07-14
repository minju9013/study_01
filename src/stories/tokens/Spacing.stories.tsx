import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

const SPACING_TOKENS = [
  "--spacing-0",
  "--spacing-2",
  "--spacing-4",
  "--spacing-8",
  "--spacing-12",
  "--spacing-16",
  "--spacing-20",
  "--spacing-24",
  "--spacing-32",
  "--spacing-40",
  "--spacing-48",
  "--spacing-64",
];

function SpacingRow({ name }: { name: string }) {
  const [resolvedValue] = useState(() =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-16)",
        paddingBlock: "var(--spacing-12)",
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      <span
        style={{
          font: "var(--caption-sm-bold)",
          color: "var(--text-primary)",
          width: "var(--spacing-64)",
          flexShrink: 0,
        }}
      >
        {name}
      </span>
      <span
        style={{
          font: "var(--caption-sm-regular)",
          color: "var(--text-secondary)",
          width: "var(--spacing-48)",
          flexShrink: 0,
        }}
      >
        {resolvedValue}
      </span>
      <div
        style={{
          height: "var(--spacing-16)",
          width: resolvedValue,
          minWidth: resolvedValue === "0px" ? "1px" : resolvedValue,
          backgroundColor: "var(--interactive-primary)",
          borderRadius: "var(--radius-xs)",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

function SpacingPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-24)",
        padding: "var(--spacing-24)",
        fontFamily: "var(--font-family-base)",
        backgroundColor: "var(--background-default)",
      }}
    >
      <h1
        style={{
          font: "var(--display-sm-bold)",
          color: "var(--text-primary)",
          margin: 0,
        }}
      >
        Spacing
      </h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {SPACING_TOKENS.map((token) => (
          <SpacingRow key={token} name={token} />
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundation/Spacing",
  component: SpacingPage,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-실습자료--Part-2.-클로드-코드-Figma-MCP-조합으로-디자인-시스템-구축하기?node-id=4035-1334",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpacingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSpacing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText("--spacing-16")).toBeInTheDocument();
    });

    const tokenLabels = canvas.getAllByText(/^--spacing-/);
    expect(tokenLabels.length).toBe(SPACING_TOKENS.length);
  },
};
