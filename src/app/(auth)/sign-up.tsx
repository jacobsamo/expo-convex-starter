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
  ScrollView,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter, Link } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors, Radius, Spacing, Typography, Shadows } from '@/constants/Colors';
import { OAuthButtons } from '@/components/OAuthButtons';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSignUpPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    if (!emailAddress || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      router.push({
        pathname: '/(auth)/verify',
        params: { email: emailAddress },
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors?.[0]?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }, [isLoaded, emailAddress, password, signUp, router]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
        <Text style={[styles.title, { color: colors.foreground }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Sign up to get started
        </Text>

        <View style={styles.form}>
          <TextInput
            value={emailAddress}
            onChangeText={setEmailAddress}
            placeholder="Email"
            placeholderTextColor={colors.mutedForeground}
            style={[
              styles.input,
              {
                backgroundColor: colors.input,
                color: colors.foreground,
                borderColor: colors.border,
              },
            ]}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password (min 8 characters)"
            placeholderTextColor={colors.mutedForeground}
            style={[
              styles.input,
              {
                backgroundColor: colors.input,
                color: colors.foreground,
                borderColor: colors.border,
              },
            ]}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={onSignUpPress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <OAuthButtons mode="sign-up" />

          <View style={styles.linkContainer}>
            <Text style={[styles.linkText, { color: colors.mutedForeground }]}>
              Already have an account?{' '}
            </Text>
            <Link href="/(auth)/sign-in" asChild>
              <TouchableOpacity disabled={loading}>
                <Text style={[styles.link, { color: colors.primary }]}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
    fontSize: Typography.sizes.base,
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
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing[6],
  },
  linkText: {
    fontSize: Typography.sizes.sm,
  },
  link: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
});