import { useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function VerifyScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onPressVerify = React.useCallback(async () => {
    if (!isLoaded) return;

    if (!code) {
      Alert.alert("Error", "Please enter the verification code");
      return;
    }

    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/(tabs)");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        Alert.alert("Error", "Verification failed. Please try again.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }, [isLoaded, code, signUp, setActive, router]);

  const onResendCode = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      Alert.alert("Success", "Verification code has been resent to your email");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", "Failed to resend code. Please try again.");
    }
  }, [isLoaded, signUp]);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 justify-center px-5">
        <Text className="text-4xl font-bold mb-2 text-center text-foreground">
          Verify Email
        </Text>

        <Text className="text-lg mb-8 text-center text-muted-foreground">
          We&apos;ve sent a verification code to{"\n"}
          <Text className="font-semibold text-foreground">
            {email ?? "your email"}
          </Text>
        </Text>

        <View className="w-full">
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Enter verification code"
            placeholderTextColor="hsl(var(--muted-foreground))"
            className="h-[52px] rounded-md px-4 mb-4 text-xl text-center tracking-widest border border-border bg-input text-foreground"
            keyboardType="number-pad"
            maxLength={6}
            editable={!loading}
          />

          <TouchableOpacity
            className="h-[52px] rounded-md justify-center items-center mt-2 bg-primary shadow-md"
            onPress={onPressVerify}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-base font-semibold text-primary-foreground">
                Verify Email
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-6 items-center"
            onPress={onResendCode}
            disabled={loading}
          >
            <Text className="text-sm font-semibold text-primary">
              Didn&apos;t receive a code? Resend
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
