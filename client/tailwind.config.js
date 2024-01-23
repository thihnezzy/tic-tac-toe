/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#65E9E4",
          200: "#31C3BD",
        },
        secondary: {
          100: "#FFC860",
          200: "#F2B137",
        },
        dark: {
          100: "#1F3641",
          200: "#1A2A33"
        },
        light: {
          100: "#DBE8ED",
          200: "#A8BFC9"
        }
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
}
