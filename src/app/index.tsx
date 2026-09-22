import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { colors } from "@/constants/colors";

export default function SignUpScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSignUp = () => {};
  const handleGoogleSignUp = () => {};

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="grow px-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="h-16 flex-row items-center">
            <Pressable
              onPress={() => router.back()}
              hitSlop={8}
              className="h-8 w-8 items-center justify-center active:opacity-60"
            >
              <Ionicons name="arrow-back" size={24} color={colors.primary} />
            </Pressable>
            <Text className="flex-1 text-center text-lg font-semibold leading-6 text-black">
              Sign Up
            </Text>
            <View className="h-8 w-8" />
          </View>

          <View className="mt-14 gap-6">
            <TextInput
              placeholder="Name"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="words"
              className="h-14 w-full rounded-2xl border border-surface-muted bg-white px-4 text-base leading-4 text-black"
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              className="h-14 w-full rounded-2xl border border-surface-muted bg-white px-4 text-base leading-4 text-black"
            />
            <View className="h-14 w-full flex-row items-center rounded-2xl border border-surface-muted bg-white px-4">
              <TextInput
                placeholder="Password"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                className="h-full flex-1 text-base leading-4 text-black"
              />
              <Pressable
                onPress={() => setPasswordVisible((value) => !value)}
                hitSlop={8}
                className="active:opacity-60"
              >
                <Ionicons
                  name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color={colors.textSecondary}
                />
              </Pressable>
            </View>
          </View>

          <View className="mt-4 flex-row items-start">
            <Pressable
              onPress={() => setAgreed((value) => !value)}
              hitSlop={8}
              className="h-8 w-8 items-center justify-center active:opacity-60"
            >
              <View
                className={`h-6 w-6 items-center justify-center rounded-md border-2 ${
                  agreed ? "border-primary bg-primary" : "border-primary"
                }`}
              >
                {agreed ? (
                  <Ionicons name="checkmark" size={16} color={colors.white} />
                ) : null}
              </View>
            </Pressable>
            <Text className="ml-2.5 flex-1 text-sm font-medium leading-4 text-black">
              By signing up, you agree to the Terms of Service and Privacy Policy
            </Text>
          </View>

          <Pressable
            onPress={handleSignUp}
            className="mt-8 h-14 w-full items-center justify-center rounded-2xl bg-primary active:opacity-90"
          >
            <Text className="text-lg font-semibold leading-6 text-white">
              Sign Up
            </Text>
          </Pressable>

          <Text className="my-3 text-center text-sm font-bold leading-4 text-text-secondary">
            Or with
          </Text>

          <Pressable
            onPress={handleGoogleSignUp}
            className="h-14 w-full flex-row items-center justify-center gap-2.5 rounded-2xl border border-surface-muted bg-white active:opacity-90"
          >
            <AntDesign name="google" size={32} color={colors.textPrimary} />
            <Text className="text-lg font-semibold leading-6 text-black">
              Sign Up with Google
            </Text>
          </Pressable>

          <Text className="mt-5 text-center text-base font-medium leading-5 text-text-secondary">
            Already have an account? Login
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
