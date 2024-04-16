import type { Config } from "tailwindcss";
import Colors from "tailwindcss/colors";

const config: Config = {
  darkMode: ["selector"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        p: Colors.blue,
        m: Colors.zinc,
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          foreground: "var(--primary-foreground)",
          DEFAULT: "var(--primary)",
        },
        muted: {
          foreground: "var(--muted-foreground)",
          DEFAULT: "var(--muted)",
        },
        border: "var(--border)",
        ring: "var(--ring)",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        slideIn: "slideIn 0.3s ease-in",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
