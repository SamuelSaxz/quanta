import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useAuth } from "@client/context/auth-provider";
import { Stack, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  const router = useRouter();
  const { authenticated } = useAuth();

  React.useEffect(() => {
    if (authenticated) {
      router.navigate("/(onboarding)");
    }
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.dark.surface,
        paddingHorizontal: Sizes["p-3"],
        paddingVertical: Sizes["p-10"],
      }}
    >
      <Pressable
        style={{
          width: 48,
          height: 48,
          borderRadius: Sizes["rounded-md"],
          padding: Sizes["p-3"],
          backgroundColor: Colors["dark"]["surface-elevated"],
          marginBottom: Sizes["m-6"],
        }}
        onPress={() => {
          router.navigate("/(home)/motivation");
        }}
      >
        <ArrowLeft color={Colors.dark["on-surface-elevated"]} />
      </Pressable>

      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
