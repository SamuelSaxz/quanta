import Steps from "@client/components/ui/steps";
import Colors from "@client/constants/Colors";
import { useAuth } from "@client/context/auth-provider";
import OnboardingProvider from "@client/context/onboarding-provider";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingLayout() {
  const router = useRouter();
  const { authenticated, onboarding } = useAuth();

  React.useEffect(() => {
    if (!authenticated) {
      router.navigate("/(auth)/login");
    }

    if (onboarding) {
      router.navigate("/(dashboard)/home");
    }
  });

  return (
    <OnboardingProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.dark.surface,
        }}
      >
        <Steps />

        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </OnboardingProvider>
  );
}
