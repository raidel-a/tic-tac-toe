import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fullSpin: {
          '100%' : { transform: "rotate(-360deg)" }
        }
      },
      animation: {
        fullSpin: "fullSpin 3s linear infinite"
      },
      backgroundImage: {
        'gradient-radial': 'conic-gradient(grey 20deg, transparent 120deg)',
      },
      boxShadow: {
        'cust': '0 0 40px 25px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
};
export default config;
