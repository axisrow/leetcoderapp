// Mock for marked library

class MockRenderer {
  code({ text }) {
    return `<pre><code>${text}</code></pre>`;
  }
  codespan({ text }) {
    return `<code>${text}</code>`;
  }
}

const marked = {
  parse: jest.fn((text) => `<p>${text}</p>`),
  setOptions: jest.fn(),
  Renderer: MockRenderer,
};

module.exports = { marked };
