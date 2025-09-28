import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors, Radius, Spacing, Typography, Shadows } from '@/constants/Colors';

export default function VerifyScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onPressVerify = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    if (!code) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/(tabs)');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        Alert.alert('Error', 'Verification failed. Please try again.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors?.[0]?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  }, [isLoaded, code, signUp, setActive, router]);

  const onResendCode = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      Alert.alert('Success', 'Verification code has been resent to your email');
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', 'Failed to resend code. Please try again.');
    }
  }, [isLoaded, signUp]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.foreground }]}>Verify Email</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          We&apos;ve sent a verification code to{'\n'}
          {email || 'your email'}
        </Text>

        <View style={styles.form}>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Enter verification code"
            placeholderTextColor={colors.mutedForeground}
            style={[
              styles.input,
              {
                backgroundColor: colors.input,
                color: colors.foreground,
                borderColor: colors.border,
              },
            ]}
            keyboardType="number-pad"
            maxLength={6}
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={onPressVerify}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Verify Email</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resendButton}
            onPress={onResendCode}
            disabled={loading}
          >
            <Text style={[styles.resendText, { color: colors.primary }]}>
              Didn&apos;t receive a code? Resend
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing[5],
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.sizes['4xl'],
    fontWeight: Typography.weights.bold,
    marginBottom: Spacing[2],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.sizes.lg,
    marginBottom: Spacing[8],
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    height: 52,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing[4],
    marginBottom: Spacing[4],
    fontSize: Typography.sizes.xl,
    textAlign: 'center',
    letterSpacing: 2,
    borderWidth: 1,
  },
  button: {
    height: 52,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing[2],
    ...Shadows.md,
  },
  buttonText: {
    color: 'white',
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
  resendButton: {
    marginTop: Spacing[6],
    alignItems: 'center',
  },
  resendText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
});