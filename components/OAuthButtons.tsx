import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors, Radius, Spacing, Typography, Shadows } from '@/constants/Colors';

WebBrowser.maybeCompleteAuthSession();

interface OAuthButtonsProps {
  mode: 'sign-in' | 'sign-up';
}

export const OAuthButtons: React.FC<OAuthButtonsProps> = ({ mode }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const { startOAuthFlow: startGoogleFlow } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: startMicrosoftFlow } = useOAuth({ strategy: 'oauth_microsoft' });

  const handleOAuthSignIn = React.useCallback(
    async (strategy: 'google' | 'microsoft') => {
      try {
        const startFlow = strategy === 'google' ? startGoogleFlow : startMicrosoftFlow;
        const { createdSessionId, setActive } = await startFlow();

        if (createdSessionId) {
          await setActive!({ session: createdSessionId });
          router.replace('/(tabs)');
        } else {
          Alert.alert(
            'Error',
            `Unable to ${mode === 'sign-in' ? 'sign in' : 'sign up'} with ${strategy}. Please try again.`
          );
        }
      } catch (err: any) {
        console.error('OAuth error:', JSON.stringify(err, null, 2));
        Alert.alert(
          'Error',
          err.errors?.[0]?.message || `Failed to ${mode === 'sign-in' ? 'sign in' : 'sign up'} with ${strategy}`
        );
      }
    },
    [mode, router, startGoogleFlow, startMicrosoftFlow]
  );

  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, { color: colors.mutedForeground }]}>
          OR CONTINUE WITH
        </Text>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.oauthButton,
            { 
              backgroundColor: colors.card,
              borderColor: colors.border
            }
          ]}
          onPress={() => handleOAuthSignIn('google')}
        >
          <View style={styles.buttonContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.googleIcon}>G</Text>
            </View>
            <Text style={[styles.buttonText, { color: colors.foreground }]}>
              {mode === 'sign-in' ? 'Sign in with Google' : 'Sign up with Google'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.oauthButton,
            { 
              backgroundColor: colors.card,
              borderColor: colors.border
            }
          ]}
          onPress={() => handleOAuthSignIn('microsoft')}
        >
          <View style={styles.buttonContent}>
            <View style={[styles.iconContainer, styles.microsoftIcon]}>
              <View style={styles.microsoftGrid}>
                <View style={[styles.microsoftSquare, { backgroundColor: '#f25022' }]} />
                <View style={[styles.microsoftSquare, { backgroundColor: '#7fba00' }]} />
                <View style={[styles.microsoftSquare, { backgroundColor: '#00a4ef' }]} />
                <View style={[styles.microsoftSquare, { backgroundColor: '#ffb900' }]} />
              </View>
            </View>
            <Text style={[styles.buttonText, { color: colors.foreground }]}>
              {mode === 'sign-in' ? 'Sign in with Microsoft' : 'Sign up with Microsoft'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing[6],
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing[5],
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: Spacing[3],
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    letterSpacing: 0.5,
  },
  buttonsContainer: {
    gap: Spacing[3],
  },
  oauthButton: {
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: Spacing[3],
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  microsoftIcon: {
    padding: 2,
  },
  microsoftGrid: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  microsoftSquare: {
    width: 8,
    height: 8,
  },
  buttonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
});