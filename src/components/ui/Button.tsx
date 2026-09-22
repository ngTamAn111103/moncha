import { Pressable, Text } from "react-native";

// Button — nút bấm dùng chung cho toàn ứng dụng.

/** Các biến thể giao diện của nút. */
type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  /** Nội dung chữ hiển thị trên nút. */
  label: string;
  /** Biến thể giao diện, mặc định là `primary`. */
  variant?: ButtonVariant;
  /** Hàm xử lý khi người dùng nhấn nút. */
  onPress?: () => void;
};

// Nền của nút theo từng biến thể
const containerByVariant: Record<ButtonVariant, string> = {
  primary: "bg-primary",
  secondary: "bg-primary-background",
};

// Màu chữ của nút theo từng biến thể
const labelByVariant: Record<ButtonVariant, string> = {
  primary: "text-text-inverse",
  secondary: "text-primary",
};

/**
 * Nút bấm dùng chung cho toàn ứng dụng.
 *
 * Hỗ trợ hai biến thể:
 * - `primary`: nền tím đậm, chữ trắng — dùng cho hành động chính (ví dụ: Sign Up).
 * - `secondary`: nền tím nhạt, chữ tím — dùng cho hành động phụ (ví dụ: Login).
 *
 * Kích thước và bo góc theo thiết kế: cao 56px (`h-14`), bo góc 16px (`rounded-2xl`).
 * Chữ 18px đậm (`text-lg font-semibold`). Mọi màu sắc lấy từ token trong
 * `tailwind.config.js`, không hard-code. Dùng `Pressable` để có phản hồi khi nhấn
 * (`active:opacity-90`) và hỗ trợ trợ năng (`accessibilityRole="button"`).
 */
export function Button({ label, variant = "primary", onPress }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`h-14 flex-row items-center justify-center rounded-2xl active:opacity-90 ${containerByVariant[variant]}`}
    >
      <Text className={`text-lg font-semibold ${labelByVariant[variant]}`}>
        {label}
      </Text>
    </Pressable>
  );
}
