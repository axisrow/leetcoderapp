import { marked } from 'marked';

// Escape HTML entities to prevent XSS
const escapeHtml = (text) => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Custom renderer for code blocks
const renderer = new marked.Renderer();

renderer.code = ({ text, lang }) => {
  const escaped = escapeHtml(text);
  const langClass = lang ? ` class="language-${lang}"` : '';
  return `<pre><code${langClass}>${escaped}</code></pre>`;
};

renderer.codespan = ({ text }) => {
  return `<code>${escapeHtml(text)}</code>`;
};

// Configure marked options
marked.setOptions({
  renderer,
  breaks: true,
  gfm: true,
});

/**
 * Parse Markdown text to HTML
 * @param {string} text - Markdown text
 * @returns {string} HTML string
 */
export const parseMarkdown = (text) => {
  if (!text) return '';
  return marked.parse(text);
};

export default parseMarkdown;
