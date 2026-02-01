// Мок для react-native-marked

function MockMarkdown() {
  return null;
}

// Мок для Renderer базового класса
function MockRenderer() {}
MockRenderer.prototype.getKey = function() {
  return Math.random().toString();
};

// ES Module compatible exports
MockMarkdown.default = MockMarkdown;
MockMarkdown.Renderer = MockRenderer;

module.exports = MockMarkdown;
