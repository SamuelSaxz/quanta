import Colors from "@client/constants/Colors";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.dark.background,
        // paddingHorizontal: Sizes["p-3"],
        // paddingVertical: Sizes["p-10"],
      }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
