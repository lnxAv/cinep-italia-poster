import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-rubik)"],
      },
      colors: {
        accent: "#FDF75E",
      },
      zIndex: {
        auto: "auto",
        negative: "-1",
      },
    },
  },
  plugins: [],
};
export default config;
