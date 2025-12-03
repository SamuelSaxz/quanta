import Steps from "@client/components/ui/steps";
import Colors from "@client/constants/Colors";
import HabitsProvider from "@client/context/habits-provider";
import { useStep } from "@client/context/step-provider";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HabitsLayout() {
  const { setMaxLength, resetStep } = useStep();

  React.useEffect(() => {
    resetStep();
    setMaxLength(6);
  }, []);

  return (
    <HabitsProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.dark.surface,
        }}
      >
        <Steps />

        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </HabitsProvider>
  );
}
