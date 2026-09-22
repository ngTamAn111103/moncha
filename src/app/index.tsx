import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import onboardingIllustration from "@/assets/images/onboarding/Variant=Gain_total_control_of_your_money.svg";
import { Button } from "@/components/ui/Button";

export default function WelcomeScreen() {
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

          {/* Nút Login — chuyển sang màn hình đăng nhập */}
          <Button
            label="Login"
            variant="secondary"
            onPress={() => router.push("/login")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
