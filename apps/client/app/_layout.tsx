import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@client/components/useColorScheme";
import Colors from "@client/constants/Colors";
import { AuthProvider } from "@client/context/auth-provider";
import { StepProvider } from "@client/context/step-provider";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(home)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme(); // dark | light | null | undefined

  return (
    <ThemeProvider value={DarkTheme}>
      <StepProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView>
              <Stack>
                <Stack.Screen name="(home)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(onboarding)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(dashboard)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(habits)"
                  options={{ headerShown: false }}
                />
              </Stack>
              <StatusBar
                barStyle={"light-content"}
                hidden
                backgroundColor={Colors["dark"].background}
              />

              <Toaster />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </AuthProvider>
      </StepProvider>
    </ThemeProvider>
  );
}
