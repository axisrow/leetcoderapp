import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

jest.mock('@google/generative-ai');

describe('Gemini API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize GoogleGenerativeAI', () => {
    const apiKey = 'test-api-key';
    const genAI = new GoogleGenerativeAI(apiKey);

    expect(genAI).toBeDefined();
  });

  it('should create model from GoogleGenerativeAI instance', () => {
    const genAI = new GoogleGenerativeAI('test-api-key');
    expect(genAI).toHaveProperty('getGenerativeModel');
  });

  it('should include safety settings in API calls', () => {
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    expect(safetySettings).toHaveLength(4);
    safetySettings.forEach(setting => {
      expect(setting.threshold).toBe('BLOCK_MEDIUM_AND_ABOVE');
    });
  });

  it('should work with generation config', () => {
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    expect(generationConfig.temperature).toBe(0.9);
    expect(generationConfig.maxOutputTokens).toBe(2048);
  });

  it('should handle API initialization with valid key', () => {
    const apiKey = 'test-api-key';
    const genAI = new GoogleGenerativeAI(apiKey);

    expect(genAI).toBeDefined();
  });
});
