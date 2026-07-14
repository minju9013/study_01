import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

const RADIUS_TOKENS = [
  "--radius-none",
  "--radius-xs",
  "--radius-sm",
  "--radius-md",
  "--radius-lg",
  "--radius-xl",
  "--radius-2xl",
  "--radius-3xl",
  "--radius-circle",
];

function RadiusRow({ name }: { name: string }) {
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
          height: "var(--spacing-64)",
          width: "var(--spacing-64)",
          backgroundColor: "var(--interactive-primary)",
          borderRadius: resolvedValue,
          flexShrink: 0,
        }}
      />
    </div>
  );
}

function RadiusPage() {
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
        Radius
      </h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {RADIUS_TOKENS.map((token) => (
          <RadiusRow key={token} name={token} />
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundation/Radius",
  component: RadiusPage,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-실습자료--Part-2.-클로드-코드-Figma-MCP-조합으로-디자인-시스템-구축하기?node-id=4035-1334",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadiusPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllRadius: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText("--radius-md")).toBeInTheDocument();
    });

    const tokenLabels = canvas.getAllByText(/^--radius-/);
    expect(tokenLabels.length).toBe(RADIUS_TOKENS.length);
  },
};
