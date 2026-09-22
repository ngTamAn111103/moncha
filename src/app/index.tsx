import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { apiFetch } from "@/api/client";
import onboardingIllustration from "@/assets/images/onboarding/Variant=Gain_total_control_of_your_money.svg";
import { Button } from "@/components/ui/Button";

export default function WelcomeScreen() {
  // Nút Login: tạm thời gọi thử API backend để kiểm tra kết nối.
  // Khi bấm sẽ gọi GET /api/hello và in kết quả (hoặc lỗi) ra console.
  const handleLogin = async () => {
    try {
      const data = await apiFetch<{ message: string }>("/api/hello");
      console.log("Gọi API thành công:", data.message);
    } catch (error) {
      console.log("Gọi API thất bại:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-5 pb-8">
        {/* Ảnh minh hoạ onboarding */}
        <View className="flex-1 items-center justify-center pt-6">
          <Image
            source={onboardingIllustration}
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
          />
        </View>

        {/* Tiêu đề và mô tả */}
        <View className="items-center">
          <Text className="text-center text-3xl font-bold leading-10 text-text-primary">
            Gain total control of your money
          </Text>
          <Text className="mt-4 text-center text-base font-medium leading-5 text-text-secondary">
            Become your own money manager and make every cent count
          </Text>
        </View>

        <View className="mt-10 gap-4">
          {/* Nút Sign Up — chuyển sang màn hình đăng ký */}
          <Button
            label="Sign Up"
            variant="primary"
            onPress={() => router.push("/sign-up")}
          />

          {/* Nút Login — tạm thời gọi thử API backend (chưa mở màn hình đăng nhập) */}
          <Button label="Login" variant="secondary" onPress={handleLogin} />
        </View>
      </View>
    </SafeAreaView>
  );
}
