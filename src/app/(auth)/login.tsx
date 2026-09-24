import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { colors } from "@/constants/colors";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Thanh điều hướng trên: nút quay lại + tiêu đề */}
      <View className="h-16 flex-row items-center justify-between px-4">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          onPress={() => router.back()}
          className="h-8 w-8 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>

        <Text className="text-lg font-semibold text-text-primary">Login</Text>

        {/* Khoảng trống đối xứng để tiêu đề căn giữa */}
        <View className="h-8 w-8" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8"
        keyboardShouldPersistTaps="handled"
      >
        {/* Các ô nhập liệu Email / Password */}
        <View className="mt-14 gap-6">
          {/* Ô nhập Email */}
          <TextField
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Ô nhập Password (kèm nút hiện/ẩn mật khẩu) */}
          <TextField placeholder="Password" secureTextEntry />
        </View>

        {/* Nút Login */}
        <View className="mt-10">
          <Button
            label="Login"
            variant="primary"
            onPress={() => console.log("Nhấn Login")}
          />
        </View>

        {/* Quên mật khẩu */}
        <Pressable
          accessibilityRole="button"
          onPress={() => console.log("Chuyển sang màn hình Forgot Password")}
          className="mt-8 items-center"
        >
          <Text className="text-lg font-semibold text-primary">
            Forgot Password?
          </Text>
        </Pressable>

        {/* Chưa có tài khoản? Chuyển sang Sign Up (replace để không tích luỹ history) */}
        <Text className="mt-9 text-center text-base font-medium text-text-secondary">
          Don&apos;t have an account yet?{" "}
          <Text
            className="text-primary"
            onPress={() => router.replace("/sign-up")}
          >
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
