import { StyleSheet } from 'react-native';
import { Colors, Radius, Shadows, Typography, Spacing } from './Colors';

/**
 * Common theme styles for consistent UI across the app
 */

export const createThemeStyles = (colorScheme: 'light' | 'dark') => {
  const colors = Colors[colorScheme ?? 'light'];
  
  return StyleSheet.create({
    // Containers
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: Radius.lg,
      padding: Spacing[4],
      ...Shadows.md,
    },
    
    // Typography
    h1: {
      fontSize: Typography.sizes['4xl'],
      fontWeight: Typography.weights.bold,
      color: colors.foreground,
      marginBottom: Spacing[2],
    },
    h2: {
      fontSize: Typography.sizes['3xl'],
      fontWeight: Typography.weights.bold,
      color: colors.foreground,
      marginBottom: Spacing[2],
    },
    h3: {
      fontSize: Typography.sizes['2xl'],
      fontWeight: Typography.weights.semibold,
      color: colors.foreground,
      marginBottom: Spacing[2],
    },
    h4: {
      fontSize: Typography.sizes.xl,
      fontWeight: Typography.weights.semibold,
      color: colors.foreground,
      marginBottom: Spacing[1],
    },
    body: {
      fontSize: Typography.sizes.base,
      fontWeight: Typography.weights.normal,
      color: colors.foreground,
      lineHeight: Typography.sizes.base * Typography.lineHeights.normal,
    },
    bodySmall: {
      fontSize: Typography.sizes.sm,
      fontWeight: Typography.weights.normal,
      color: colors.mutedForeground,
      lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
    },
    
    // Buttons
    button: {
      height: 48,
      borderRadius: Radius.md,
      paddingHorizontal: Spacing[6],
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    buttonPrimary: {
      backgroundColor: colors.primary,
    },
    buttonSecondary: {
      backgroundColor: colors.secondary,
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonDestructive: {
      backgroundColor: colors.destructive,
    },
    buttonGhost: {
      backgroundColor: 'transparent',
    },
    buttonText: {
      fontSize: Typography.sizes.base,
      fontWeight: Typography.weights.semibold,
    },
    buttonTextPrimary: {
      color: colors.primaryForeground,
    },
    buttonTextSecondary: {
      color: colors.secondaryForeground,
    },
    buttonTextDestructive: {
      color: colors.destructiveForeground,
    },
    
    // Inputs
    input: {
      height: 48,
      backgroundColor: colors.input,
      borderRadius: Radius.md,
      paddingHorizontal: Spacing[4],
      fontSize: Typography.sizes.base,
      color: colors.foreground,
      borderWidth: 1,
      borderColor: colors.border,
    },
    inputFocused: {
      borderColor: colors.ring,
      borderWidth: 2,
    },
    inputError: {
      borderColor: colors.destructive,
    },
    label: {
      fontSize: Typography.sizes.sm,
      fontWeight: Typography.weights.medium,
      color: colors.foreground,
      marginBottom: Spacing[1],
    },
    
    // Lists
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing[3],
      paddingHorizontal: Spacing[4],
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    listItemText: {
      fontSize: Typography.sizes.base,
      color: colors.foreground,
      flex: 1,
    },
    
    // Dividers
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: Spacing[4],
    },
    
    // Badges
    badge: {
      paddingHorizontal: Spacing[2],
      paddingVertical: Spacing[1],
      borderRadius: Radius.full,
      alignSelf: 'flex-start',
    },
    badgePrimary: {
      backgroundColor: colors.primary,
    },
    badgeSecondary: {
      backgroundColor: colors.secondary,
    },
    badgeSuccess: {
      backgroundColor: colors.success,
    },
    badgeWarning: {
      backgroundColor: colors.warning,
    },
    badgeDestructive: {
      backgroundColor: colors.destructive,
    },
    badgeText: {
      fontSize: Typography.sizes.xs,
      fontWeight: Typography.weights.semibold,
    },
    
    // Modals/Sheets
    modal: {
      backgroundColor: colors.popover,
      borderTopLeftRadius: Radius['2xl'],
      borderTopRightRadius: Radius['2xl'],
      padding: Spacing[6],
      ...Shadows['2xl'],
    },
    modalHandle: {
      width: 40,
      height: 4,
      backgroundColor: colors.mutedForeground,
      borderRadius: Radius.full,
      alignSelf: 'center',
      marginBottom: Spacing[4],
    },
    
    // Utility classes
    shadow: Shadows.md,
    shadowLg: Shadows.lg,
    shadowXl: Shadows.xl,
    rounded: {
      borderRadius: Radius.md,
    },
    roundedLg: {
      borderRadius: Radius.lg,
    },
    roundedFull: {
      borderRadius: Radius.full,
    },
  });
};

// Export a hook-like function to get theme styles
export const useThemeStyles = (colorScheme: 'light' | 'dark') => {
  return createThemeStyles(colorScheme);
};