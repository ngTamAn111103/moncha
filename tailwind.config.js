const { colors } = require("./src/constants/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Token className được suy ra từ nguồn duy nhất `src/constants/colors.js`.
      // (Tailwind cần cấu trúc lồng nhau, nên chỉ ánh xạ tên — không chứa mã màu.)
      colors: {
        // Brand
        primary: {
          DEFAULT: colors.primary,
          background: colors.primaryBackground,
        },

        // Semantic
        income: {
          DEFAULT: colors.income,
          background: colors.incomeBackground,
        },
        expense: {
          DEFAULT: colors.expense,
          background: colors.expenseBackground,
        },
        transfer: {
          DEFAULT: colors.transfer,
          background: colors.transferBackground,
        },
        warning: {
          DEFAULT: colors.warning,
          background: colors.warningBackground,
        },

        // Background
        background: {
          DEFAULT: colors.background,
          secondary: colors.backgroundSecondary,
        },
        surface: {
          DEFAULT: colors.surface,
          muted: colors.surfaceMuted,
        },

        // Text
        text: {
          primary: colors.textPrimary,
          secondary: colors.textSecondary,
          inverse: colors.textInverse,
        },

        // Border
        border: colors.border,

        // Base
        black: colors.black,
        white: colors.white,
      },
    },
  },
  plugins: [],
};
