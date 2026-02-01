import { spacing, borderRadius } from '../styles';

/**
 * Generate styles for react-native-render-html based on theme
 * @param {Object} colors - Theme colors
 * @param {boolean} isDark - Is dark mode enabled
 * @returns {Object} Styles object for tagsStyles
 */
export const getHtmlStyles = (colors, isDark) => ({
  // Body text
  body: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },

  // Paragraphs
  p: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.md,
  },

  // Headings
  h1: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: -0.5,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  h2: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.3,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.sm,
  },
  h3: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  h4: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
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

  // Code blocks
  pre: {
    backgroundColor: colors.codeBackground,
    color: colors.codeText,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginVertical: spacing.md,
    overflow: 'hidden',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.codeText,
    backgroundColor: colors.codeBackground,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  // Lists
  ul: {
    marginBottom: spacing.md,
    paddingLeft: spacing.md,
  },
  ol: {
    marginBottom: spacing.md,
    paddingLeft: spacing.md,
  },
  li: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.xs,
  },

  // Links
  a: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  // Blockquotes
  blockquote: {
    backgroundColor: isDark ? colors.backgroundLighter : colors.backgroundLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.sm,
  },

  // Tables
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
    color: colors.text,
    padding: spacing.sm,
    fontWeight: 'bold',
    backgroundColor: colors.backgroundLight,
  },
  td: {
    color: colors.text,
    padding: spacing.sm,
  },

  // Horizontal rule
  hr: {
    backgroundColor: colors.border,
    height: 1,
    marginVertical: spacing.md,
  },

  // Text formatting
  strong: {
    color: colors.text,
    fontWeight: 'bold',
  },
  b: {
    color: colors.text,
    fontWeight: 'bold',
  },
  em: {
    color: colors.text,
    fontStyle: 'italic',
  },
  i: {
    color: colors.text,
    fontStyle: 'italic',
  },
  s: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  del: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },

  // Images
  img: {
    marginVertical: spacing.md,
  },
});

/**
 * Get classesStyles for react-native-render-html
 * @param {Object} colors - Theme colors
 * @returns {Object} Classes styles object
 */
export const getClassesStyles = (colors) => ({
  // Language-specific code blocks (if needed)
  'language-javascript': {
    fontFamily: 'monospace',
  },
  'language-js': {
    fontFamily: 'monospace',
  },
  'language-python': {
    fontFamily: 'monospace',
  },
  'language-java': {
    fontFamily: 'monospace',
  },
});

export default getHtmlStyles;
