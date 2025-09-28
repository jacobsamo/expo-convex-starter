import { OAuthButtons } from "@/components/oauth-buttons";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Sign in failed. Please try again.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  }, [isLoaded, emailAddress, password, signIn, setActive, router]);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-5">
          {/* Title */}
          <Text className="text-4xl font-bold mb-2 text-center text-foreground">
            Welcome Back
          </Text>
          <Text className="text-lg mb-8 text-center text-muted-foreground">
            Sign in to your account
          </Text>

          {/* Form */}
          <View className="w-full">
            <TextInput
              value={emailAddress}
              onChangeText={setEmailAddress}
              placeholder="Email"
              placeholderTextColor="hsl(var(--muted-foreground))"
              className="h-[52px] rounded-md px-4 mb-4 text-base border border-border bg-input text-foreground"
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="hsl(var(--muted-foreground))"
              className="h-[52px] rounded-md px-4 mb-4 text-base border border-border bg-input text-foreground"
              secureTextEntry
              editable={!loading}
            />

            <TouchableOpacity
              className="h-[52px] rounded-md justify-center items-center mt-2 bg-primary shadow-md"
              onPress={onSignInPress}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-base font-semibold text-primary-foreground">
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            {/* OAuth */}
            <OAuthButtons mode="sign-in" />

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
              </Text>
              <Link href="/(auth)/sign-up" asChild>
                <TouchableOpacity disabled={loading}>
                  <Text className="text-sm font-semibold text-primary">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
