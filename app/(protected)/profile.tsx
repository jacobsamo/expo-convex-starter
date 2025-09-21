import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
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
      <View style={styles.profileSection}>
        <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
          <Text style={styles.avatarText}>
            {user?.emailAddresses[0]?.emailAddress?.charAt(0).toUpperCase()}
          </Text>
        </View>
        
        <Text style={[styles.email, { color: colors.text }]}>
          {user?.emailAddresses[0]?.emailAddress}
        </Text>
        
        <Text style={[styles.userId, { color: colors.tabIconDefault }]}>
          User ID: {user?.id}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account Information</Text>
        
        <View style={[styles.infoCard, { backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#f2f2f7' }]}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.tabIconDefault }]}>Created</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.tabIconDefault }]}>Last Updated</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.tabIconDefault }]}>Email Verified</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {user?.emailAddresses[0]?.verification?.status === 'verified' ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={[styles.settingsButton, { borderColor: colors.tint }]}
          onPress={() => router.push('/(protected)/settings')}
        >
          <Text style={[styles.settingsButtonText, { color: colors.tint }]}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.signOutButton, { backgroundColor: '#FF3B30' }]}
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  userId: {
    fontSize: 12,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  settingsButton: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  signOutButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});