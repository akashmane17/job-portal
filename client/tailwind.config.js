/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F509A",
        dark: "#0A3981",
        light: "#EEF5FF",
        error: "#ff2f2f",
        transparent: "transparent",
        white: "#FFFFFF",
        black: "#1C2434",
        success: "#219653",
        danger: "#D34053",
        warning: "#FFA70B",
      },
    },
  },
  plugins: [],
};
