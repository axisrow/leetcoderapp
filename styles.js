import { StyleSheet } from 'react-native';

// Modern color palette
export const colors = {
    // Primary colors
    primary: '#6366f1',      // Indigo
    primaryDark: '#4f46e5',
    primaryLight: '#818cf8',

    // Secondary colors
    secondary: '#8b5cf6',    // Purple
    secondaryDark: '#7c3aed',
    secondaryLight: '#a78bfa',

    // Accent colors
    accent: '#06b6d4',       // Cyan
    accentDark: '#0891b2',
    accentLight: '#22d3ee',

    // Difficulty colors
    easy: '#10b981',         // Green
    medium: '#f59e0b',       // Amber
    hard: '#ef4444',         // Red

    // Neutral colors
    background: '#0f172a',   // Dark blue-gray
    backgroundLight: '#1e293b',
    backgroundLighter: '#334155',

    // Text colors
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',

    // UI colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Borders
    border: '#334155',
    borderLight: '#475569',
};

// Typography
export const typography = {
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.text,
        letterSpacing: -0.5,
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        letterSpacing: -0.3,
    },
    h3: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.text,
    },
    body: {
        fontSize: 16,
        color: colors.text,
        lineHeight: 24,
    },
    bodySecondary: {
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    caption: {
        fontSize: 12,
        color: colors.textMuted,
        lineHeight: 16,
    },
};

// Spacing scale
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

// Border radius
export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
};

// Shadows
export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 12,
    },
};

// Common styles
export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centeredContainer: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
    },
    card: {
        backgroundColor: colors.backgroundLight,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
        ...shadows.md,
    },
    button: {
        borderRadius: borderRadius.md,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.sm,
    },
    buttonPrimary: {
        backgroundColor: colors.primary,
    },
    buttonSecondary: {
        backgroundColor: colors.secondary,
    },
    buttonSuccess: {
        backgroundColor: colors.success,
    },
    buttonWarning: {
        backgroundColor: colors.warning,
    },
    buttonError: {
        backgroundColor: colors.error,
    },
    buttonText: {
        ...typography.body,
        fontWeight: '600',
        color: colors.text,
    },
    input: {
        backgroundColor: colors.backgroundLight,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        color: colors.text,
        fontSize: 16,
    },
    inputFocused: {
        borderColor: colors.primary,
        ...shadows.sm,
    },
    label: {
        ...typography.bodySecondary,
        marginBottom: spacing.sm,
        fontWeight: '600',
    },
    errorText: {
        ...typography.caption,
        color: colors.error,
        marginTop: spacing.xs,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.md,
    },
});

export default {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    commonStyles,
};
