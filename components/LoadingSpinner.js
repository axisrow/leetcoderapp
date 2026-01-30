import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { typography, spacing } from '../styles';

const LoadingSpinner = ({ text = 'Loading...', size = 'large' }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ActivityIndicator size={size} color={colors.primary} />
            {text && <Text style={[styles.text, { color: colors.textSecondary }]}>{text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    text: {
        ...typography.body,
        marginTop: spacing.md,
    },
});

export default LoadingSpinner;
