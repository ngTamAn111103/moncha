import { Stack } from "expo-router";
import "../../global.css"

export default function RootLayout() {
  // Ẩn header mặc định của Stack trên mọi màn hình
  return <Stack screenOptions={{ headerShown: false }} />;
}
