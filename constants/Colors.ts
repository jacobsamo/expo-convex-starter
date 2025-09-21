/**
 * Modern theme based on Mobius design system
 * Colors converted from oklch to RGB for React Native
 */

export const Colors = {
  light: {
    // Core colors
    background: '#FFFFFF',
    foreground: '#0A0A0A',
    
    // Card
    card: '#FFFFFF',
    cardForeground: '#0A0A0A',
    
    // Popover
    popover: '#FFFFFF',
    popoverForeground: '#050505',
    
    // Primary - Blue/Teal
    primary: '#4A9EFF',
    primaryForeground: '#FAFAFA',
    
    // Secondary
    secondary: '#F8F8F8',
    secondaryForeground: '#0F0F0F',
    
    // Muted
    muted: '#F5F5F5',
    mutedForeground: '#737373',
    
    // Accent
    accent: '#F5F5F5',
    accentForeground: '#0F0F0F',
    
    // Destructive - Red
    destructive: '#FF4444',
    destructiveForeground: '#FFFFFF',
    
    // Success - Green
    success: '#22C55E',
    successForeground: '#FFFFFF',
    
    // Warning - Yellow/Orange
    warning: '#F59E0B',
    warningForeground: '#FFFFFF',
    
    // Info - Blue
    info: '#3B82F6',
    infoForeground: '#FFFFFF',
    
    // UI Elements
    border: '#E5E5E5',
    input: '#F7F7F7',
    ring: '#E4D4FF',
    
    // Legacy (for compatibility)
    text: '#0A0A0A',
    tint: '#4A9EFF',
    tabIconDefault: '#737373',
    tabIconSelected: '#4A9EFF',
    icon: '#737373',
  },
  dark: {
    // Core colors
    background: '#0A0A0A',
    foreground: '#FAFAFA',
    
    // Card
    card: '#141414',
    cardForeground: '#FAFAFA',
    
    // Popover
    popover: '#0F0F0F',
    popoverForeground: '#FAFAFA',
    
    // Primary - Blue/Teal (darker)
    primary: '#3B82F6',
    primaryForeground: '#0F0F0F',
    
    // Secondary
    secondary: '#0A0A0A',
    secondaryForeground: '#FAFAFA',
    
    // Muted
    muted: '#1A1A1A',
    mutedForeground: '#A3A3A3',
    
    // Accent
    accent: '#262626',
    accentForeground: '#FAFAFA',
    
    // Destructive - Red
    destructive: '#EF4444',
    destructiveForeground: '#FFFFFF',
    
    // Success - Green
    success: '#10B981',
    successForeground: '#FFFFFF',
    
    // Warning - Yellow/Orange
    warning: '#F59E0B',
    warningForeground: '#FFFFFF',
    
    // Info - Blue
    info: '#6366F1',
    infoForeground: '#FFFFFF',
    
    // UI Elements
    border: 'rgba(255, 255, 255, 0.05)',
    input: '#1F1F1F',
    ring: '#6366F1',
    
    // Legacy (for compatibility)
    text: '#FAFAFA',
    tint: '#3B82F6',
    tabIconDefault: '#A3A3A3',
    tabIconSelected: '#3B82F6',
    icon: '#A3A3A3',
  },
};

// Radius values converted to numbers for React Native
export const Radius = {
  xs: 6,    // 0.375rem
  sm: 8,    // 0.5rem
  md: 10,   // 0.625rem (default)
  lg: 16,   // 1rem
  xl: 24,   // 1.5rem
  '2xl': 28,  // 1.75rem
  '3xl': 34,  // 2.125rem
  '4xl': 42,  // 2.625rem
  '5xl': 52,  // 3.25rem
  full: 999,
};

// Shadow configurations for React Native
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 10,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
  },
};

// Typography scale
export const Typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing scale
export const Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
};
