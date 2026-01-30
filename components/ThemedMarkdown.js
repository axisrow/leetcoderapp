import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Markdown from 'react-native-marked';
import { useTheme } from '../ThemeContext';
import { typography, spacing, borderRadius } from '../styles';

const ThemedMarkdown = ({ value }) => {
    const { colors } = useTheme();

    const markdownStyles = {
        body: {
            color: colors.text,
            ...typography.body,
        },
        heading1: {
            color: colors.text,
            ...typography.h1,
            marginBottom: spacing.md,
        },
        heading2: {
            color: colors.text,
            ...typography.h2,
            marginBottom: spacing.md,
        },
        heading3: {
            color: colors.text,
            ...typography.h3,
            marginBottom: spacing.sm,
        },
        paragraph: {
            color: colors.text,
            ...typography.body,
            marginBottom: spacing.md,
        },
        code_inline: {
            backgroundColor: colors.codeBackground,
            color: colors.codeText,
            fontFamily: 'monospace',
            paddingHorizontal: spacing.xs,
            paddingVertical: 2,
            borderRadius: borderRadius.sm,
            fontSize: 14,
        },
        code_block: {
            backgroundColor: colors.codeBackground,
            color: colors.codeText,
            fontFamily: 'monospace',
            padding: spacing.md,
            borderRadius: borderRadius.md,
            marginBottom: spacing.md,
            fontSize: 14,
        },
        fence: {
            backgroundColor: colors.codeBackground,
            color: colors.codeText,
            fontFamily: 'monospace',
            padding: spacing.md,
            borderRadius: borderRadius.md,
            marginBottom: spacing.md,
            fontSize: 14,
        },
        list_item: {
            color: colors.text,
            ...typography.body,
            marginBottom: spacing.xs,
        },
        bullet_list: {
            marginBottom: spacing.md,
        },
        ordered_list: {
            marginBottom: spacing.md,
        },
        link: {
            color: colors.primary,
            textDecorationLine: 'underline',
        },
        blockquote: {
            backgroundColor: colors.backgroundLight,
            borderLeftWidth: 4,
            borderLeftColor: colors.primary,
            padding: spacing.md,
            marginBottom: spacing.md,
            borderRadius: borderRadius.sm,
        },
        table: {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: borderRadius.md,
            marginBottom: spacing.md,
        },
        tr: {
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        th: {
            backgroundColor: colors.backgroundLight,
            color: colors.text,
            fontWeight: 'bold',
            padding: spacing.sm,
        },
        td: {
            color: colors.text,
            padding: spacing.sm,
        },
        hr: {
            backgroundColor: colors.border,
            height: 1,
            marginVertical: spacing.md,
        },
        strong: {
            color: colors.text,
            fontWeight: 'bold',
        },
        em: {
            color: colors.text,
            fontStyle: 'italic',
        },
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Markdown
                value={value}
                flatListProps={{
                    initialNumToRender: 8,
                }}
                theme={{
                    colors: {
                        text: colors.text,
                        background: colors.background,
                        border: colors.border,
                        code: colors.codeText,
                        codeBackground: colors.codeBackground,
                        link: colors.primary,
                    },
                }}
                styles={markdownStyles}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ThemedMarkdown;
