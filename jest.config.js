module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@env$': '<rootDir>/__mocks__/env.js',
    '^@google/generative-ai$': '<rootDir>/__mocks__/@google/generative-ai.js',
    '^@rneui/themed$': '<rootDir>/__mocks__/@rneui/themed.js',
    '^@rneui/base$': '<rootDir>/__mocks__/@rneui/base.js',
    '\\.gif$': '<rootDir>/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.expo/'],
  collectCoverageFrom: [
    'components/**/*.js',
    '*.js',
    '!node_modules/**',
    '!jest.config.js',
  ],
};
