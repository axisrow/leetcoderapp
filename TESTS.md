# Unit Tests Setup

## Overview

This project now includes unit tests for utility functions, components, and API integrations using Jest and React Native Testing Library.

## Test Structure

```
__tests__/
├── utils.test.js                    # Utility functions tests
├── integration.test.js              # Gemini API integration tests
└── components/
    ├── CheckAnswer.test.js          # CheckAnswer component tests
    ├── Puzzles.test.js              # Puzzles component tests
    └── Apifetcher.test.js           # Apifetcher component tests

__mocks__/
├── env.js                           # Environment variables mock
└── @google/generative-ai.js         # Gemini API mock
```

## Running Tests

### Install dependencies first:
```bash
npm install
```

### Run all tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm test -- --watch
```

### Run specific test file:
```bash
npm test CheckAnswer.test.js
```

### Run tests with coverage:
```bash
npm test -- --coverage
```

## Test Coverage

The tests cover:

### 1. **Utils Tests** (`__tests__/utils.test.js`)
- Random element selection from arrays
- Gemini configuration validation
- Safety settings validation

### 2. **Component Tests**
- **CheckAnswer.test.js**: Tests solution generation with streaming
- **Puzzles.test.js**: Tests quiz generation and answer validation
- **Apifetcher.test.js**: Tests problem description generation

### 3. **Integration Tests** (`__tests__/integration.test.js`)
- Gemini API initialization
- Streaming response handling
- Safety settings configuration
- Error handling in API calls

## Mocks

### Gemini API Mock (`__mocks__/@google/generative-ai.js`)
- Mocks `GoogleGenerativeAI` class
- Simulates `generateContent()` method
- Simulates `generateContentStream()` method with async generator
- Provides mock harm categories and thresholds

### Environment Mock (`__mocks__/env.js`)
- Provides test API key

## Key Testing Patterns

### Component Testing
Components are tested for:
- Rendering without errors
- Button presence and clickability
- API call execution
- State updates
- Navigation behavior

### Streaming API Testing
Tests verify:
- Async generator iteration
- Chunk-by-chunk content streaming
- UI updates with streamed data
- Error handling

### Example: Testing Streaming
```javascript
const result = await model.generateContentStream({...});
const chunks = [];
for await (const chunk of result.stream) {
  chunks.push(chunk.text());
}
expect(chunks.length).toBeGreaterThan(0);
```

## Jest Configuration

The project uses `jest.config.js` with:
- `jest-expo` preset for React Native/Expo compatibility
- Module name mapping for mocks
- Test environment setup via `jest.setup.js`

## Continuous Integration

To add to your CI/CD pipeline:
```bash
npm test -- --coverage --watchAll=false
```

This will:
- Run all tests once
- Generate coverage report
- Exit with appropriate code

## Troubleshooting

### Tests not running
- Make sure dependencies are installed: `npm install`
- Clear Jest cache: `npx jest --clearCache`

### Module not found errors
- Check mock paths in `jest.config.js`
- Verify `jest.setup.js` is in root directory

### Async tests timing out
- Increase timeout in test: `jest.setTimeout(10000)`
- Check that all promises are properly awaited

## Future Enhancements

- Add E2E tests with Detox
- Increase coverage to >80%
- Add performance benchmarks
- Add snapshot tests for components
