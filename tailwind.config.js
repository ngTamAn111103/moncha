/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: {
          DEFAULT: "#7F3DFF",
          background: "#EEE5FF",
        },

        // Semantic
        income: {
          DEFAULT: "#00A86B",
          background: "#CFFAEA",
        },
        expense: {
          DEFAULT: "#FD3C4A",
          background: "#FDD5D7",
        },
        transfer: {
          DEFAULT: "#0077FF",
          background: "#BDDCFF",
        },
        warning: {
          DEFAULT: "#FCAC12",
          background: "#FCEED4",
        },

        // Background
        background: {
          DEFAULT: "#FFFFFF",
          secondary: "#FCFCFC",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F1F1FA",
        },

        // Text
        text: {
          primary: "#292B2D",
          secondary: "#91919F",
          inverse: "#FFFFFF",
        },

        // Border
        border: "#E3E5E5",

        // Base
        black: "#0D0E0F",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
}