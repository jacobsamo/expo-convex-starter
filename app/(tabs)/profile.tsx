import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors, Radius, Spacing, Typography, Shadows } from '@/constants/Colors';

export default function ProfileTab() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(auth)/sign-in');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>
            {user?.emailAddresses[0]?.emailAddress?.charAt(0).toUpperCase()}
          </Text>
        </View>
        
        <Text style={[styles.email, { color: colors.foreground }]}>
          {user?.emailAddresses[0]?.emailAddress}
        </Text>
        
        <Text style={[styles.userId, { color: colors.mutedForeground }]}>
          User ID: {user?.id}
        </Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.accent }]}
          onPress={() => router.push('/(protected)/profile')}
        >
          <Text style={[styles.menuItemText, { color: colors.foreground }]}>View Full Profile</Text>
          <Text style={[styles.menuItemArrow, { color: colors.mutedForeground }]}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.accent }]}
          onPress={() => router.push('/(protected)/settings')}
        >
          <Text style={[styles.menuItemText, { color: colors.foreground }]}>Settings</Text>
          <Text style={[styles.menuItemArrow, { color: colors.mutedForeground }]}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.signOutButton, { backgroundColor: colors.destructive }]}
          onPress={handleSignOut}
        >
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: Spacing[5],
    paddingHorizontal: Spacing[5],
  },
  headerTitle: {
    fontSize: Typography.sizes['4xl'],
    fontWeight: Typography.weights.bold,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: Spacing[6],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing[4],
    ...Shadows.lg,
  },
  avatarText: {
    color: 'white',
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
  },
  email: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    marginBottom: Spacing[2],
  },
  userId: {
    fontSize: Typography.sizes.xs,
  },
  menuSection: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[3],
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[4],
    borderRadius: Radius.lg,
    marginBottom: Spacing[3],
    ...Shadows.sm,
  },
  menuItemText: {
    fontSize: Typography.sizes.base,
  },
  menuItemArrow: {
    fontSize: Typography.sizes['2xl'],
  },
  signOutButton: {
    height: 52,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing[3],
    ...Shadows.md,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
});