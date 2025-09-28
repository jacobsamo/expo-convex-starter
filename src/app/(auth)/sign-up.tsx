import { OAuthButtons } from "@/components/oauth-buttons";
import { useSignUp } from "@clerk/clerk-expo";
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

export default function SignUpScreen() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSignUpPress = React.useCallback(async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push({
        pathname: "/(auth)/verify",
        params: { email: emailAddress },
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  }, [isLoaded, emailAddress, password, signUp, router]);

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
            Create Account
          </Text>
          <Text className="text-lg mb-8 text-center text-muted-foreground">
            Sign up to get started
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
              placeholder="Password (min 8 characters)"
              placeholderTextColor="hsl(var(--muted-foreground))"
              className="h-[52px] rounded-md px-4 mb-4 text-base border border-border bg-input text-foreground"
              secureTextEntry
              editable={!loading}
            />

            <TouchableOpacity
              className="h-[52px] rounded-md justify-center items-center mt-2 bg-primary shadow-md"
              onPress={onSignUpPress}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-base font-semibold text-primary-foreground">
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>

            {/* OAuth */}
            <OAuthButtons mode="sign-up" />

            {/* Sign In Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-sm text-muted-foreground">
                Already have an account?{" "}
              </Text>
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity disabled={loading}>
                  <Text className="text-sm font-semibold text-primary">
                    Sign In
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
