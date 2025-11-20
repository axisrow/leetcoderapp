const HarmCategory = {
  HARM_CATEGORY_HARASSMENT: 'HARASSMENT',
  HARM_CATEGORY_HATE_SPEECH: 'HATE_SPEECH',
  HARM_CATEGORY_SEXUALLY_EXPLICIT: 'SEXUALLY_EXPLICIT',
  HARM_CATEGORY_DANGEROUS_CONTENT: 'DANGEROUS_CONTENT',
};

const HarmBlockThreshold = {
  BLOCK_MEDIUM_AND_ABOVE: 'BLOCK_MEDIUM_AND_ABOVE',
};

class GoogleGenerativeAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  getGenerativeModel(config) {
    const mockGenerateContent = jest.fn().mockResolvedValue({
      response: {
        text: () => 'Mock response from Gemini',
      },
    });

    const mockGenerateContentStream = jest.fn(async () => {
      return {
        stream: (async function* () {
          yield { text: () => 'Mock ' };
          yield { text: () => 'streaming ' };
          yield { text: () => 'response' };
        })(),
      };
    });

    return {
      generateContent: mockGenerateContent,
      generateContentStream: mockGenerateContentStream,
    };
  }
}

module.exports = {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
};
