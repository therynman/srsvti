// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // Keep mdx if you use it
        "./components/**/*.{js,ts,jsx,tsx,mdx}", // Keep mdx if you use it
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)"],
                display: ["var(--font-display)"],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
} satisfies Config;

export default config;
