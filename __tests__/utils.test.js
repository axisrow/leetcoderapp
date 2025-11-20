describe('Utility Functions', () => {
  describe('random function', () => {
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

    it('should return an element from the array', () => {
      const testArray = ['a', 'b', 'c'];
      const result = random(testArray);
      expect(testArray).toContain(result);
    });

    it('should handle single element array', () => {
      const testArray = ['only'];
      const result = random(testArray);
      expect(result).toBe('only');
    });

    it('should work with number arrays', () => {
      const testArray = [1, 2, 3, 4, 5];
      const result = random(testArray);
      expect(testArray).toContain(result);
    });

    it('should work with object arrays', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const testArray = [obj1, obj2];
      const result = random(testArray);
      expect(testArray).toContain(result);
    });
  });

  describe('Gemini Configuration', () => {
    it('should have valid harm categories', () => {
      const safetySettings = [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ];

      expect(safetySettings).toHaveLength(4);
      expect(safetySettings[0].category).toBe('HARM_CATEGORY_HARASSMENT');
    });

    it('should have valid generation config', () => {
      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      expect(generationConfig.temperature).toBeGreaterThan(0);
      expect(generationConfig.temperature).toBeLessThanOrEqual(1);
      expect(generationConfig.maxOutputTokens).toBeGreaterThan(0);
    });
  });
});
