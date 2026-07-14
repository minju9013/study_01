import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

interface TypeGroup {
  name: string;
  tokens: string[];
}

const TYPE_GROUPS: TypeGroup[] = [
  {
    name: "Display",
    tokens: [
      "--display-lg-bold",
      "--display-lg-regular",
      "--display-sm-bold",
      "--display-sm-regular",
    ],
  },
  {
    name: "Title",
    tokens: [
      "--title-lg-bold",
      "--title-lg-regular",
      "--title-sm-bold",
      "--title-sm-regular",
    ],
  },
  {
    name: "Body",
    tokens: [
      "--body-lg-bold",
      "--body-lg-regular",
      "--body-sm-bold",
      "--body-sm-regular",
    ],
  },
  {
    name: "Caption",
    tokens: [
      "--caption-lg-bold",
      "--caption-lg-medium",
      "--caption-lg-regular",
      "--caption-sm-bold",
      "--caption-sm-medium",
      "--caption-sm-regular",
    ],
  },
];

const SAMPLE_TEXT = "디자인 시스템 타이포그래피 Aa 123";

function TypeSample({ name }: { name: string }) {
  const [resolvedFont] = useState(() =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
  );
  const match = resolvedFont.match(
    /^(\d+)\s+(\d+(?:\.\d+)?px)\s*\/\s*(\d+(?:\.\d+)?px)/,
  );
  const weight = match?.[1] ?? "";
  const size = match?.[2] ?? "";
  const lineHeight = match?.[3] ?? "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
        paddingBlock: "var(--spacing-16)",
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      <div style={{ font: `var(${name})`, color: "var(--text-primary)" }}>
        {SAMPLE_TEXT}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--spacing-16)",
        }}
      >
        <span
          style={{
            font: "var(--caption-sm-bold)",
            color: "var(--text-primary)",
          }}
        >
          {name}
        </span>
        <span
          style={{
            font: "var(--caption-sm-regular)",
            color: "var(--text-secondary)",
          }}
        >
          size {size}
        </span>
        <span
          style={{
            font: "var(--caption-sm-regular)",
            color: "var(--text-secondary)",
          }}
        >
          weight {weight}
        </span>
        <span
          style={{
            font: "var(--caption-sm-regular)",
            color: "var(--text-secondary)",
          }}
        >
          line-height {lineHeight}
        </span>
      </div>
    </div>
  );
}

function TypeGroupSection({ name, tokens }: TypeGroup) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-12)",
      }}
    >
      <h3
        style={{
          font: "var(--title-sm-bold)",
          color: "var(--text-primary)",
          margin: 0,
        }}
      >
        {name}
      </h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {tokens.map((token) => (
          <TypeSample key={token} name={token} />
        ))}
      </div>
    </div>
  );
}

function TypographyPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-32)",
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
        Typography
      </h1>
      {TYPE_GROUPS.map((group) => (
        <TypeGroupSection key={group.name} {...group} />
      ))}
    </div>
  );
}

const meta = {
  title: "Foundation/Typography",
  component: TypographyPage,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/3i6GHDeSBITVpdPtoNtTh3/-실습자료--Part-2.-클로드-코드-Figma-MCP-조합으로-디자인-시스템-구축하기?node-id=4035-1050",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TypographyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTypography: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText("--display-lg-bold")).toBeInTheDocument();
    });

    const tokenLabels = canvas.getAllByText(/^--/);
    expect(tokenLabels.length).toBeGreaterThan(0);
  },
};
