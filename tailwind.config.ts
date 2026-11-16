import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#06122B",
          900: "#0A1F44",
          800: "#122B59",
        },
        snow: {
          50: "#F8FAFC",
        },
        sand: {
          100: "#F3EDE2",
        },
        ink: {
          950: "#050B18",
          900: "#0A1426",
          800: "#101D36",
          700: "#1A2A4A",
        },
        gold: {
          200: "#EAD9B0",
          400: "#D4AF6A",
        },
        emerald: {
          500: "#10B981",
          600: "#059669",
        },
        rose: {
          500: "#F43F5E",
          600: "#E11D48",
        },
        amber: {
          400: "#FBBF24",
        },
        "text-primary": "#F1F5F9",
        "text-muted": "#8A99B5",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        "ink-card":
          "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 30px rgba(2, 6, 18, 0.45)",
        "ink-card-hover":
          "inset 0 1px 0 rgba(212, 175, 106, 0.25), 0 18px 40px rgba(2, 6, 18, 0.65), 0 0 24px rgba(212, 175, 106, 0.08)",
        "gold-glow": "0 0 20px rgba(212, 175, 106, 0.2)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.8" },
          "70%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
      },
      animation: {
        shimmer: "shimmer 2.6s infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-ring":
          "pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
