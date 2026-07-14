import { useState } from "react";

export interface ColorGroup {
  name: string;
  variables: string[];
}

function getRawTokenValue(name: string): string {
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
        const value = rule.style.getPropertyValue(name).trim();
        if (value) return value;
      }
    }
  }
  return "";
}

function ColorSwatch({ name }: { name: string }) {
  const [rawValue] = useState(() => getRawTokenValue(name));
  const [resolvedValue] = useState(() =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
  );
  const referenceName = rawValue.match(/^var\((--[\w-]+)\)$/)?.[1];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
        width: "var(--spacing-64)",
      }}
    >
      <div
        style={{
          width: "var(--spacing-64)",
          height: "var(--spacing-64)",
          backgroundColor: `var(${name})`,
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-md)",
        }}
      />
      <span
        style={{
          font: "var(--caption-sm-bold)",
          color: "var(--text-primary)",
          wordBreak: "break-all",
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
        {resolvedValue}
      </span>
      {referenceName && (
        <span
          style={{
            font: "var(--caption-sm-regular)",
            color: "var(--interactive-primary)",
            wordBreak: "break-all",
          }}
        >
          → {referenceName}
        </span>
      )}
    </div>
  );
}

function ColorGroupSection({ name, variables }: ColorGroup) {
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--spacing-16)",
        }}
      >
        {variables.map((variable) => (
          <ColorSwatch key={variable} name={variable} />
        ))}
      </div>
    </div>
  );
}

export function ColorPage({
  title,
  groups,
}: {
  title: string;
  groups: ColorGroup[];
}) {
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
        {title}
      </h1>
      {groups.map((group) => (
        <ColorGroupSection key={group.name} {...group} />
      ))}
    </div>
  );
}
