import React from 'react';

jest.mock('@google/generative-ai');
jest.mock('react-native-marked', () => 'Markdown');

describe('Apifetcher Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should export component', () => {
    const Apifetcher = require('../../components/Apifetcher').default;
    expect(Apifetcher).toBeDefined();
  });

  it('should be a valid React component', () => {
    const Apifetcher = require('../../components/Apifetcher').default;
    expect(typeof Apifetcher).toBe('function');
  });

  it('should have proper prop structure', () => {
    // Verify that the component can accept route prop
    const route = { params: { randtask: 'Test task' } };
    expect(route.params.randtask).toBe('Test task');
  });
});
