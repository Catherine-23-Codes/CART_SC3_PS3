import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                eco: {
                    light: "#E1F2E5",
                    DEFAULT: "#22C55E",
                    dark: "#166534",
                }
            }
        },
    },
    plugins: [],
};
export default config;
