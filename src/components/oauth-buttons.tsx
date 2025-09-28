import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

interface OAuthButtonsProps {
  mode: "sign-in" | "sign-up";
}

export const OAuthButtons: React.FC<OAuthButtonsProps> = ({ mode }) => {
  const router = useRouter();

  const { startOAuthFlow: startGoogleFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startMicrosoftFlow } = useOAuth({
    strategy: "oauth_microsoft",
  });

  const handleOAuthSignIn = React.useCallback(
    async (strategy: "google" | "microsoft") => {
      try {
        const startFlow =
          strategy === "google" ? startGoogleFlow : startMicrosoftFlow;
        const { createdSessionId, setActive } = await startFlow();

        if (createdSessionId) {
          await setActive!({ session: createdSessionId });
          router.replace("/(tabs)");
        } else {
          Alert.alert(
            "Error",
            `Unable to ${mode === "sign-in" ? "sign in" : "sign up"} with ${strategy}. Please try again.`
          );
        }
      } catch (err: any) {
        console.error("OAuth error:", JSON.stringify(err, null, 2));
        Alert.alert(
          "Error",
          err.errors?.[0]?.message ||
            `Failed to ${mode === "sign-in" ? "sign in" : "sign up"} with ${strategy}`
        );
      }
    },
    [mode, router, startGoogleFlow, startMicrosoftFlow]
  );

  return (
    <View className="mt-6">
      {/* Divider */}
      <View className="flex-row items-center my-5">
        <View className="flex-1 h-px bg-border" />
        <Text className="mx-3 text-xs font-semibold tracking-wide text-muted-foreground">
          OR CONTINUE WITH
        </Text>
        <View className="flex-1 h-px bg-border" />
      </View>

      {/* OAuth Buttons */}
      <View className="gap-3">
        {/* Google */}
        <TouchableOpacity
          className="h-[52px] rounded-md border border-border bg-card shadow-sm justify-center items-center"
          onPress={() => handleOAuthSignIn("google")}
        >
          <View className="flex-row items-center">
            <View className="w-6 h-6 mr-3 justify-center items-center">
              <Text className="text-[20px] font-bold text-[#4285F4]">G</Text>
            </View>
            <Text className="text-base font-medium text-foreground">
              {mode === "sign-in"
                ? "Sign in with Google"
                : "Sign up with Google"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Microsoft */}
        <TouchableOpacity
          className="h-[52px] rounded-md border border-border bg-card shadow-sm justify-center items-center"
          onPress={() => handleOAuthSignIn("microsoft")}
        >
          <View className="flex-row items-center">
            <View className="w-6 h-6 mr-3 p-0.5">
              <View className="w-5 h-5 flex-row flex-wrap">
                <View
                  className="w-2 h-2 mr-0.5 mb-0.5"
                  style={{ backgroundColor: "#f25022" }}
                />
                <View
                  className="w-2 h-2 mb-0.5"
                  style={{ backgroundColor: "#7fba00" }}
                />
                <View
                  className="w-2 h-2 mr-0.5"
                  style={{ backgroundColor: "#00a4ef" }}
                />
                <View
                  className="w-2 h-2"
                  style={{ backgroundColor: "#ffb900" }}
                />
              </View>
            </View>
            <Text className="text-base font-medium text-foreground">
              {mode === "sign-in"
                ? "Sign in with Microsoft"
                : "Sign up with Microsoft"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
