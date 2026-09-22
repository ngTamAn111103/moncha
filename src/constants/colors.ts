// Bảng màu thương hiệu Montra — dùng cho code không phải className
// (react-native-svg, chart, navigation theme, StatusBar...).
export const colors = {
  // Brand
  primary: "#7F3DFF",
  primaryBackground: "#EEE5FF",

  // Semantic
  income: "#00A86B",
  incomeBackground: "#CFFAEA",

  expense: "#FD3C4A",
  expenseBackground: "#FDD5D7",

  transfer: "#0077FF",
  transferBackground: "#BDDCFF",

  warning: "#FCAC12",
  warningBackground: "#FCEED4",

  // Background
  background: "#FFFFFF",
  backgroundSecondary: "#FCFCFC",
  surface: "#FFFFFF",
  surfaceMuted: "#F1F1FA",

  // Text
  textPrimary: "#292B2D",
  textSecondary: "#91919F",
  textInverse: "#FFFFFF",

  // Border
  border: "#E3E5E5",

  // Base
  black: "#0D0E0F",
  white: "#FFFFFF",
} as const;

export type ColorName = keyof typeof colors;
