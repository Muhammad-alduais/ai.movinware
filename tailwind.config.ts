import type { Config } from "tailwindcss";

export default {
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pulse: {
          50: "hsl(245 83% 97%)",
          100: "hsl(245 83% 95%)",
          200: "hsl(245 83% 85%)",
          300: "hsl(245 83% 75%)",
          400: "hsl(245 83% 65%)",
          500: "hsl(245 83% 58%)",
          600: "hsl(245 83% 48%)",
          700: "hsl(245 83% 38%)",
          800: "hsl(245 83% 28%)",
          900: "hsl(245 83% 18%)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        brockmann: ["Brockmann", "Inter", "sans-serif"],
        glacial: ["Glacial Indifference", "Inter", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
        arabic: ["Tajawal", "Arial", "sans-serif"],
        "arabic-heading": ["Cairo", "Arial", "sans-serif"],
      },
      boxShadow: {
        elegant: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "elegant-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;
