import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Markdown, { Renderer } from 'react-native-marked';
import { useTheme } from '../ThemeContext';
import { spacing, borderRadius } from '../styles';

// Кастомный renderer для правильных цветов и размеров
class CustomRenderer extends Renderer {
    constructor(colors) {
        super();
        this.colors = colors;
    }

    // Кастомный renderer для code блоков
    code(text, _language, containerStyle, _textStyle) {
        const customTextStyle = {
            color: this.colors.codeText,
            fontFamily: 'monospace',
            fontSize: 14,
        };

        return (
            <ScrollView
                key={this.getKey()}
                horizontal
                contentContainerStyle={containerStyle}
            >
                <View>
                    <Text style={customTextStyle}>{text}</Text>
                </View>
            </ScrollView>
        );
    }

    // Кастомный renderer для inline code (codespan)
    // Это гарантирует фиксированный размер шрифта независимо от родителя
    codespan(text, styles) {
        const customStyles = {
            ...styles,
            fontSize: 14,
            lineHeight: 20,
            color: this.colors.codeText,
            backgroundColor: this.colors.codeBackground,
            fontFamily: 'monospace',
            fontWeight: '500',
        };

        return (
            <Text key={this.getKey()} style={customStyles}>
                {text}
            </Text>
        );
    }

    // Кастомные renderers для заголовков с принудительным цветом
    heading(text, styles, level) {
        const headingStyles = {
            1: { fontSize: 32, fontWeight: 'bold', letterSpacing: -0.5, marginBottom: spacing.md },
            2: { fontSize: 24, fontWeight: '600', letterSpacing: -0.3, marginBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: this.colors.border, paddingBottom: spacing.sm },
            3: { fontSize: 20, fontWeight: '600', marginBottom: spacing.sm },
            4: { fontSize: 16, fontWeight: 'bold', marginBottom: spacing.sm },
            5: { fontSize: 14, fontWeight: 'bold', marginBottom: spacing.sm },
            6: { fontSize: 13, fontWeight: 'bold', marginBottom: spacing.sm },
        };

        const customStyles = {
            ...styles,
            ...headingStyles[level],
            color: this.colors.text,
        };

        return (
            <Text key={this.getKey()} style={customStyles}>
                {text}
            </Text>
        );
    }
}

const ThemedMarkdown = ({ value }) => {
    const { colors, isDark } = useTheme();

    // Кастомный renderer с правильными цветами
    const customRenderer = useMemo(
        () => new CustomRenderer(colors),
        [colors]
    );

    // Тема для react-native-marked (только поддерживаемые цвета)
    // ВАЖНО: theme.colors.code используется как BACKGROUND COLOR, не как цвет текста!
    const theme = {
        colors: {
            text: colors.text,
            border: colors.border,
            code: colors.codeBackground,  // Фон для code блоков
            link: colors.primary,
        },
    };

    // Стили согласно API react-native-marked (MarkedStyles)
    const markdownStyles = {
        // Основной текст
        text: {
            color: colors.text,
        },
        // Параграфы
        paragraph: {
            marginBottom: spacing.md,
        },
        // Заголовки (h1-h6) - стили применяются через кастомный renderer
        // Здесь дублируем для fallback
        h1: {
            color: colors.text,
            fontSize: 32,
            fontWeight: 'bold',
            letterSpacing: -0.5,
            marginBottom: spacing.md,
        },
        h2: {
            color: colors.text,
            fontSize: 24,
            fontWeight: '600',
            letterSpacing: -0.3,
            marginBottom: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            paddingBottom: spacing.sm,
        },
        h3: {
            color: colors.text,
            fontSize: 20,
            fontWeight: '600',
            marginBottom: spacing.sm,
        },
        h4: {
            color: colors.text,
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: spacing.sm,
        },
        h5: {
            color: colors.text,
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: spacing.sm,
        },
        h6: {
            color: colors.text,
            fontSize: 13,
            fontWeight: 'bold',
            marginBottom: spacing.sm,
        },
        // Inline code (codespan) - TextStyle
        codespan: {
            backgroundColor: colors.codeBackground,
            color: colors.codeText,
            fontFamily: 'monospace',
            paddingHorizontal: 6,
            paddingVertical: 3,
            borderRadius: 4,
            fontSize: 14,
            fontWeight: '500',
        },
        // Code блоки - ViewStyle
        code: {
            backgroundColor: colors.codeBackground,
            padding: spacing.md,
            borderRadius: borderRadius.md,
            marginVertical: spacing.md,
        },
        // Списки
        list: {
            marginBottom: spacing.md,
        },
        li: {
            color: colors.text,
            fontSize: 16,
            lineHeight: 24,
            marginBottom: spacing.xs,
        },
        // Ссылки
        link: {
            color: colors.primary,
            textDecorationLine: 'underline',
        },
        // Цитаты
        blockquote: {
            backgroundColor: isDark ? colors.backgroundLighter : colors.backgroundLight,
            borderLeftWidth: 4,
            borderLeftColor: colors.primary,
            padding: spacing.md,
            marginBottom: spacing.md,
            borderRadius: borderRadius.sm,
        },
        // Таблицы
        table: {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: borderRadius.md,
            marginBottom: spacing.md,
        },
        tableRow: {
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        tableCell: {
            color: colors.text,
            padding: spacing.sm,
        },
        // Разделители
        hr: {
            backgroundColor: colors.border,
            height: 1,
            marginVertical: spacing.md,
        },
        // Форматирование текста
        strong: {
            color: colors.text,
            fontWeight: 'bold',
        },
        em: {
            color: colors.text,
            fontStyle: 'italic',
        },
        strikethrough: {
            color: colors.textMuted,
            textDecorationLine: 'line-through',
        },
        // Изображения
        image: {
            marginVertical: spacing.md,
        },
    };

    return (
        <View style={styles.container}>
            <Markdown
                value={value}
                flatListProps={{
                    initialNumToRender: 8,
                    style: { backgroundColor: 'transparent' },
                }}
                colorScheme={isDark ? 'dark' : 'light'}
                theme={theme}
                styles={markdownStyles}
                renderer={customRenderer}
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
