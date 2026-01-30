import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from '../ThemeContext';
import { spacing, borderRadius, shadows } from '../styles';

const ThemeToggle = () => {
    const { colors, isDark, toggleTheme } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}
            onPress={toggleTheme}
            activeOpacity={0.8}
        >
            <Text style={[styles.icon, { color: colors.text }]}>
                {isDark ? '☀️' : '🌙'}
            </Text>
            <Text style={[styles.text, { color: colors.textSecondary }]}>
                {isDark ? 'Light' : 'Dark'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        gap: spacing.xs,
        ...shadows.sm,
    },
    icon: {
        fontSize: 20,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default ThemeToggle;
