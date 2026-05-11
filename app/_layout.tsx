import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme as NavigationDarkTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { Redirect, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { MD3DarkTheme, PaperProvider } from "react-native-paper";

import { useAuthStore } from "../src/store/auth.store";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

const theme = {
  ...MD3DarkTheme,

  colors: {
    ...MD3DarkTheme.colors,

    primary: "#5DBB63",
    secondary: "#7BC47F",

    background: "#0F1A14",
    surface: "#17241C",
    surfaceVariant: "#203126",

    onSurface: "#F5F7F5",
    onBackground: "#F5F7F5",

    outline: "#2D4635",

    error: "#D96C6C",

    elevation: {
      level0: "transparent",
      level1: "#17241C",
      level2: "#1B2A21",
      level3: "#203126",
      level4: "#263B2D",
      level5: "#2B4433",
    },
  },

  roundness: 5,
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

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
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const segments = useSegments();

  const inAuthGroup = segments[0] === "(tabs)";
  const inProtectedRoute =
    segments[0] === "encrypt" || segments[0] === "decrypt";

  if (!isAuthenticated && inProtectedRoute) {
    return <Redirect href="/(tabs)" />;
  }

  if (isAuthenticated && inAuthGroup) {
    return <Redirect href="/encrypt" />;
  }

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={NavigationDarkTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#17241C",
            },

            headerTintColor: "#F5F7F5",

            headerTitleStyle: {
              fontWeight: "700",
            },

            contentStyle: {
              backgroundColor: "#0F1A14",
            },

            animation: "fade",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="encrypt"
            options={{ title: "Criptografar", headerBackVisible: false }}
          />

          <Stack.Screen name="decrypt" options={{ title: "Descriptografar" }} />

          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
              title: "CypherApp",
            }}
          />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
