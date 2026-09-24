import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import googleIcon from "@/assets/images/onboarding/flat-color-icons_google.svg";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { colors } from "@/constants/colors";

export default function SignUpScreen() {
  // Trạng thái đã đồng ý điều khoản hay chưa
  const [agreed, setAgreed] = useState(false);

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

        <Text className="text-lg font-semibold text-text-primary">Sign Up</Text>

        {/* Khoảng trống đối xứng để tiêu đề căn giữa */}
        <View className="h-8 w-8" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8"
        keyboardShouldPersistTaps="handled"
      >
        {/* Các ô nhập liệu Name / Email / Password */}
        <View className="mt-14 gap-6">
          {/* Ô nhập Name */}
          <TextField placeholder="Name" autoCapitalize="words" />

          {/* Ô nhập Email */}
          <TextField
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Ô nhập Password (kèm nút hiện/ẩn mật khẩu) */}
          <TextField placeholder="Password" secureTextEntry />
        </View>

        {/* Đồng ý với điều khoản */}
        <View className="mt-4 flex-row items-start gap-3">
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreed }}
            onPress={() => setAgreed((value) => !value)}
            className="h-8 w-8 items-center justify-center"
          >
            <Ionicons
              name={agreed ? "checkbox" : "square-outline"}
              size={24}
              color={colors.primary}
            />
          </Pressable>

          {/* "Terms of Service" và "Privacy Policy" bấm được, màu primary */}
          <Text className="flex-1 text-sm font-medium leading-5 text-black">
            By signing up, you agree to the{" "}
            <Text
              className="text-primary"
              onPress={() => console.log("Nhấn Terms of Service")}
            >
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text
              className="text-primary"
              onPress={() => console.log("Nhấn Privacy Policy")}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>

        {/* Nút Sign Up */}
        <View className="mt-7">
          <Button
            label="Sign Up"
            variant="primary"
            onPress={() => console.log("Nhấn Sign Up")}
          />
        </View>

        {/* Dải phân cách "Or with" */}
        <Text className="mt-3 text-center text-sm font-bold text-text-secondary">
          Or with
        </Text>

        {/* Nút Sign Up with Google */}
        <Pressable
          accessibilityRole="button"
          onPress={() => console.log("Nhấn Sign Up with Google")}
          className="mt-3 h-14 flex-row items-center justify-center gap-3 rounded-2xl border border-surface-muted bg-background active:opacity-90"
        >
          {/* Biểu tượng Google nhiều màu */}
          <View className="h-8 w-8">
            <Image
              source={googleIcon}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </View>
          <Text className="text-lg font-semibold text-text-primary">
            Sign Up with Google
          </Text>
        </Pressable>

        {/* Đã có tài khoản? Chuyển sang Login (replace để không tích luỹ history) */}
        <Text className="mt-5 text-center text-base font-medium text-text-secondary">
          Already have an account?{" "}
          <Text
            className="text-primary"
            onPress={() => router.replace("/login")}
          >
            Login
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
