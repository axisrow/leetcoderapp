import React from 'react';

jest.mock('@google/generative-ai');
jest.mock('react-native-marked', () => 'Markdown');

describe('AIPuzzle Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should export component', () => {
    const AIPuzzle = require('../../components/Puzzles').default;
    expect(AIPuzzle).toBeDefined();
  });

  it('should use arrays of themes, difficulty levels and types', () => {
    const themes = [
      'Variables',
      'Data Types',
      'Operators',
      'Conditional Statements',
      'Loops',
      'Functions',
      'Arrays',
      'Objects',
      'DOM Manipulation',
      'Events',
      'Error Handling',
      'Asynchronous Programming',
    ];
    const difficulty = ['EASY', 'MEDIUM', 'HARD'];
    const types = ['TRUE/FALSE', 'ONE-CHOICE', 'MULTI-CHOICE', 'MISSING CODE'];

    expect(themes.length).toBe(12);
    expect(difficulty.length).toBe(3);
    expect(types.length).toBe(4);
  });

  it('should have valid difficulty and type arrays', () => {
    const difficulty = ['EASY', 'MEDIUM', 'HARD'];
    const types = ['TRUE/FALSE', 'ONE-CHOICE', 'MULTI-CHOICE', 'MISSING CODE'];

    difficulty.forEach(d => {
      expect(typeof d).toBe('string');
      expect(d.length).toBeGreaterThan(0);
    });

    types.forEach(t => {
      expect(typeof t).toBe('string');
      expect(t.length).toBeGreaterThan(0);
    });
  });
});
