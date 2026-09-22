import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, TextInput, View, type TextInputProps } from "react-native";

import { colors } from "@/constants/colors";

/**
 * Ô nhập liệu (Text Input Field) dùng chung cho các form (Sign Up, Login...).
 *
 * Giao diện theo thiết kế: cao 56px, bo góc 16px, viền `surface.muted`,
 * placeholder màu `text.secondary`.
 *
 * Khi truyền `secureTextEntry`, ô nhập sẽ tự hiện nút con mắt để bật/tắt
 * việc hiển thị nội dung (dùng cho ô mật khẩu).
 */
export function TextField({
  secureTextEntry = false,
  ...props
}: TextInputProps) {
  // Trạng thái ẩn/hiện nội dung, chỉ có ý nghĩa khi là ô mật khẩu
  const [isHidden, setIsHidden] = useState(secureTextEntry);

  return (
    <View className="h-14 flex-row items-center rounded-2xl border border-surface-muted bg-background px-4">
      <TextInput
        className="flex-1 text-base text-text-primary"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={isHidden}
        {...props}
      />

      {/* Nút con mắt bật/tắt hiển thị mật khẩu */}
      {secureTextEntry ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isHidden ? "Hiện mật khẩu" : "Ẩn mật khẩu"}
          onPress={() => setIsHidden((value) => !value)}
        >
          <Ionicons
            name={isHidden ? "eye-off-outline" : "eye-outline"}
            size={24}
            color={colors.textSecondary}
          />
        </Pressable>
      ) : null}
    </View>
  );
}
