// NGUỒN DUY NHẤT (single source of truth) cho toàn bộ design token màu của
// Montra — Expense Tracker UI Kit.
//
// Cả hai nơi tiêu thụ đều đọc từ file này:
//   - tailwind.config.js  (build-time, Node/CommonJS) → map sang token className
//   - code React Native   (runtime, import { colors }) → prop color, placeholder...
//
// Dùng JS thuần (CommonJS) vì tailwind.config.js chạy trong Node và không nạp
// được file .ts. Không khai báo mã màu ở bất kỳ file nào khác.

const colors = {
  // Thương hiệu (Brand)
  primary: "#7F3DFF",
  primaryBackground: "#EEE5FF",

  // Ngữ nghĩa (Semantic)
  income: "#00A86B",
  incomeBackground: "#CFFAEA",

  expense: "#FD3C4A",
  expenseBackground: "#FDD5D7",

  transfer: "#0077FF",
  transferBackground: "#BDDCFF",

  warning: "#FCAC12",
  warningBackground: "#FCEED4",

  // Nền (Background)
  background: "#FFFFFF",
  backgroundSecondary: "#FCFCFC",
  surface: "#FFFFFF",
  surfaceMuted: "#F1F1FA",

  // Chữ (Text)
  textPrimary: "#292B2D",
  textSecondary: "#91919F",
  textInverse: "#FFFFFF",

  // Viền (Border)
  border: "#E3E5E5",

  // Cơ bản (Base)
  black: "#0D0E0F",
  white: "#FFFFFF",
};

module.exports = { colors };
