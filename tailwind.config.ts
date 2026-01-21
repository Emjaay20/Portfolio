import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "swiss-bg": "#F9F9F7",
                "swiss-charcoal": "#1A1A1A",
                "international-orange": "#FF4F00",
                "swiss-gray": "#E5E5E1",
                "swiss-gray-dark": "#D1D1CD",
            },
            fontFamily: {
                display: ["var(--font-inter)"],
                mono: ["var(--font-jetbrains-mono)", "monospace"], // Placeholder if we add mono font later
            },
            backgroundImage: {
                "grid-pattern": "linear-gradient(to right, #E5E5E1 1px, transparent 1px), linear-gradient(to bottom, #E5E5E1 1px, transparent 1px)",
            },
            keyframes: {
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "reveal": {
                    "0%": { width: "0%" },
                    "100%": { width: "100%" },
                }
            },
            animation: {
                "fade-in-up": "fade-in-up 0.5s ease-out forwards",
                "reveal": "reveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "spin-slow": "spin 3s linear infinite",
            },
        },
    },
    plugins: [],
};
export default config;
