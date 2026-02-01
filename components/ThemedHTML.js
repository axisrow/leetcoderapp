import React, { useMemo } from 'react';
import { View, StyleSheet, useWindowDimensions, ScrollView, Text } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { parseMarkdown } from '../utils/markdownConfig';
import { getHtmlStyles, getClassesStyles } from '../utils/htmlStyles';
import { useTheme } from '../ThemeContext';
import { spacing, borderRadius } from '../styles';

/**
 * Unified content renderer that handles both HTML and Markdown
 * Converts Markdown to HTML and renders via react-native-render-html
 *
 * @param {Object} props
 * @param {string} props.value - Content to render (HTML or Markdown)
 * @param {'auto'|'html'|'markdown'} props.contentType - Content type
 *   - 'auto': Auto-detect based on content
 *   - 'html': Treat as HTML
 *   - 'markdown': Convert from Markdown to HTML
 */
const ThemedHTML = ({ value, contentType = 'auto' }) => {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();

  // Determine if content is HTML or Markdown and convert accordingly
  const html = useMemo(() => {
    if (!value) return '';

    if (contentType === 'html') {
      return value;
    }

    if (contentType === 'markdown') {
      return parseMarkdown(value);
    }

    // Auto-detect: check if content looks like HTML
    // Look for common HTML tags
    const htmlPattern = /<(?:p|div|span|ul|ol|li|h[1-6]|pre|code|strong|em|a|br|table|tr|td|th)\b[^>]*>/i;
    if (htmlPattern.test(value)) {
      return value;
    }

    // Treat as Markdown
    return parseMarkdown(value);
  }, [value, contentType]);

  // Generate styles based on current theme
  const tagsStyles = useMemo(() => getHtmlStyles(colors, isDark), [colors, isDark]);
  const classesStyles = useMemo(() => getClassesStyles(colors), [colors]);

  // Custom renderer for pre blocks with proper text styling
  const PreRenderer = useMemo(() => {
    return function PreComponent({ tnode, style }) {
      // Extract raw text from tnode
      const extractText = (node) => {
        if (node.type === 'text') {
          return node.data || '';
        }
        if (node.children) {
          return node.children.map(extractText).join('');
        }
        return '';
      };

      const textContent = extractText(tnode);

      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={styles.preContainer}
        >
          <View style={[
            styles.preBlock,
            { backgroundColor: colors.codeBackground }
          ]}>
            <Text style={[
              styles.preText,
              { color: colors.codeText }
            ]}>
              {textContent}
            </Text>
          </View>
        </ScrollView>
      );
    };
  }, [colors]);

  // Custom renderers for specific elements
  const renderers = useMemo(() => ({
    pre: PreRenderer,
  }), [PreRenderer]);

  if (!html) {
    return null;
  }

  return (
    <View style={styles.container}>
      <RenderHTML
        source={{ html }}
        contentWidth={width - 48} // Account for padding
        tagsStyles={tagsStyles}
        classesStyles={classesStyles}
        renderers={renderers}
        ignoredDomTags={['font']}
        defaultTextProps={{
          selectable: true,
        }}
        enableExperimentalMarginCollapsing={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preContainer: {
    marginVertical: spacing.md,
  },
  preBlock: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    minWidth: '100%',
  },
  preText: {
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ThemedHTML;
