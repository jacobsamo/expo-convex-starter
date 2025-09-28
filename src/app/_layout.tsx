import { useColorScheme } from "@/hooks/use-color-scheme";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "@/globals.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;

if (!publishableKey) {
  throw new Error(
    "Missing Clerk Publishable Key. Please add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file"
  );
}

if (!convexUrl) {
  throw new Error(
    "Missing Convex URL. Please add EXPO_PUBLIC_CONVEX_URL to your .env file"
  );
}

const convex = new ConvexReactClient(convexUrl);

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProvider client={convex}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
            <PortalHost />
          </ThemeProvider>
        </ConvexProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
