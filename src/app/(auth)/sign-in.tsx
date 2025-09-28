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
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter, Link } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors, Radius, Spacing, Typography, Shadows } from '@/constants/Colors';
import { OAuthButtons } from '@/components/OAuthButtons';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    if (!emailAddress || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(tabs)');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert('Error', 'Sign in failed. Please try again.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors?.[0]?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  }, [isLoaded, emailAddress, password, signIn, setActive, router]);

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
        <Text style={[styles.title, { color: colors.foreground }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Sign in to your account
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
            placeholder="Password"
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
            onPress={onSignInPress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <OAuthButtons mode="sign-in" />

          <View style={styles.linkContainer}>
            <Text style={[styles.linkText, { color: colors.mutedForeground }]}>
              Don&apos;t have an account?{' '}
            </Text>
            <Link href="/(auth)/sign-up" asChild>
              <TouchableOpacity disabled={loading}>
                <Text style={[styles.link, { color: colors.primary }]}>Sign Up</Text>
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