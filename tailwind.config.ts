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
        // Base canvas — deep space blacks
        ink: {
          DEFAULT: "#030014",
          800: "#070028",
          700: "#0c0136",
        },
        // Structural borders / dividers
        edge: {
          DEFAULT: "#2A0E61",
          bright: "#3f1a8f",
          soft: "#1b0940",
        },
        // Neon accents
        neon: {
          cyan: "#22d3ee",
          magenta: "#e935c1",
          violet: "#8b5cf6",
          lime: "#a3e635",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // Signature neon sweep for headings and CTAs
        "neon-sweep":
          "linear-gradient(90deg, #22d3ee 0%, #8b5cf6 50%, #e935c1 100%)",
        "grid-fade":
          "linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 24px -4px rgba(34, 211, 238, 0.35)",
        "glow-violet": "0 0 28px -6px rgba(139, 92, 246, 0.45)",
        "glow-magenta": "0 0 28px -6px rgba(233, 53, 193, 0.4)",
        card: "0 10px 40px -12px rgba(0, 0, 0, 0.8)",
        "card-hover": "0 18px 60px -12px rgba(34, 211, 238, 0.25)",
      },
      keyframes: {
        slowspin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        slowspin: "slowspin 8s linear infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
