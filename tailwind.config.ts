// D:\tudulu\tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    // Add paths for apps/web
    "./apps/web/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/web/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/web/pages/**/*.{js,ts,jsx,tsx,mdx}",

    // Keep root fallbacks just in case
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        td: {
          primary: "var(--td-color-primary)",
          "primary-hover": "var(--td-color-primary-hover)",
          emerald: "var(--td-color-emerald)",
          amber: "var(--td-color-amber)",
          canvas: "var(--td-bg-canvas)",
          surface: "var(--td-bg-surface)",
          elevated: "var(--td-bg-surface-elevated)",
          border: "var(--td-border-subtle)",
          text: "var(--td-text-primary)",
          muted: "var(--td-text-muted)",
        },
      },
      borderRadius: {
        td: "var(--td-radius-lg)",
      },
    },
  },
  plugins: [],
};

export default config;
