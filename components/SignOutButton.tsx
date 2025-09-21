import React from 'react';
import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors, Radius, Spacing, Typography, Shadows } from '@/constants/Colors';

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(auth)/sign-in');
    } catch (err) {
      console.error('Sign out error:', JSON.stringify(err, null, 2));
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: colors.destructive }]} 
      onPress={handleSignOut}
    >
      <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[3],
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  buttonText: {
    color: 'white',
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
});