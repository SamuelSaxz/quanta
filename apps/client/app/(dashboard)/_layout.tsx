import { View } from "@client/components/Themed";
import ButtonNavigation from "@client/components/ui/button-navigation";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useAuth } from "@client/context/auth-provider";
import { Stack, useRouter, useSegments } from "expo-router";
import { House, Plus, User } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { authenticated, onboarding } = useAuth();

  const useIsRoute = (route: string) => {
    return segments.join("/") === route;
  };

  React.useEffect(() => {
    if (!authenticated) {
      return router.navigate("/(auth)/login");
    }

    if (!onboarding) {
      return router.navigate("/(onboarding)");
    }
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.dark.background,
        paddingHorizontal: Sizes["p-3"],
        paddingVertical: Sizes["p-10"],
        gap: Sizes["m-2"],
      }}
    >
      <Stack screenOptions={{ headerShown: false }} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: Colors.dark["surface-variant"],
          padding: Sizes["p-2"],
          borderRadius: Sizes["rounded-full"],
        }}
      >
        <ButtonNavigation
          icon={House}
          selected={useIsRoute("(dashboard)/home") || useIsRoute("(dashboard)")}
          onPress={() => {
            if (useIsRoute("(dashboard)/home") || useIsRoute("(dashboard)"))
              return;

            router.navigate("/(dashboard)/home");
          }}
        />

        <View
          style={{
            width: Sizes["w-12"],
            height: Sizes["w-12"],
            backgroundColor: Colors.dark["surface-variant"],
            position: "relative",
          }}
        >
          <Pressable
            style={{
              flex: 1,
              width: Sizes["w-18"],
              height: Sizes["w-18"],
              justifyContent: "center",
              alignItems: "center",
              borderRadius: Sizes["rounded-full"],
              backgroundColor: Colors.dark.secondary,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [
                { translateX: -(Sizes["w-18"] / 2) },
                { translateY: -(Sizes["w-18"] / 2) },
              ],
              zIndex: 10,
            }}
            onPress={() => {
              router.navigate("/(habits)");
            }}
          >
            <Plus color={Colors.dark["on-surface-elevated"]} />
          </Pressable>
        </View>

        <ButtonNavigation
          icon={User}
          selected={useIsRoute("(dashboard)/profile")}
          onPress={() => {
            if (useIsRoute("(dashboard)/profile")) return;

            router.navigate("/(dashboard)/profile");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
