import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

// Fallback models in priority order (flash → pro, newest → oldest)
const MODELS = [
  // Gemini 2.5
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.5-flash-lite',
  // Gemini 3 (preview)
  'gemini-3-flash-preview',
  'gemini-3-pro-preview',
  // Gemini 2.0
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
];

const DEFAULT_SAFETY_SETTINGS = [
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

/**
 * Generate content with automatic fallback to other models on rate limit (429)
 * @param {string} prompt - The prompt text
 * @param {Object} options - Generation options
 * @param {number} options.temperature - Temperature (default: 0.9)
 * @param {number} options.maxOutputTokens - Max output tokens (optional)
 * @param {function} options.onChunk - Callback for each chunk (fullText) => void
 * @param {string} options.logPrefix - Log prefix for debugging
 * @returns {Promise<string>} - Full generated text
 */
export const generateWithFallback = async (prompt, options = {}) => {
  const {
    temperature = 0.9,
    maxOutputTokens,
    onChunk,
    logPrefix = '[Gemini]',
  } = options;

  console.log(`${logPrefix} Starting generation...`);
  console.log(`${logPrefix} API_KEY exists:`, !!API_KEY);
  console.log(`${logPrefix} Prompt length:`, prompt?.length);
  console.log(`${logPrefix} Available models:`, MODELS.join(', '));

  if (!API_KEY) {
    throw new Error('API_KEY is not configured');
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  let lastError = null;

  for (const modelName of MODELS) {
    try {
      console.log(`${logPrefix} Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const generationConfig = {
        temperature,
        topK: 1,
        topP: 1,
      };
      if (maxOutputTokens) {
        generationConfig.maxOutputTokens = maxOutputTokens;
      }

      const result = await model.generateContentStream({
        contents: [{
          role: "user",
          parts: [{ text: prompt }],
        }],
        generationConfig,
        safetySettings: DEFAULT_SAFETY_SETTINGS,
      });

      console.log(`${logPrefix} ✓ Model ${modelName} responded, reading stream...`);

      let fullText = '';
      let chunkCount = 0;
      for await (const chunk of result.stream) {
        chunkCount++;
        const chunkText = chunk.text();
        fullText += chunkText;

        if (chunkCount % 5 === 0 || chunkCount === 1) {
          console.log(`${logPrefix} Chunk #${chunkCount}, total: ${fullText.length}`);
        }

        if (onChunk) {
          onChunk(fullText);
        }
      }

      console.log(`${logPrefix} ✓ Done! Model: ${modelName}, Chunks: ${chunkCount}, Length: ${fullText.length}`);
      return fullText;

    } catch (error) {
      lastError = error;
      const is429 = error.message?.includes('429') || error.message?.includes('quota');
      console.warn(`${logPrefix} ✗ Model ${modelName} failed:`, error.message?.slice(0, 150));

      if (is429) {
        console.log(`${logPrefix} Rate limited, trying next model...`);
        continue;
      } else {
        // Non-rate-limit error, stop trying
        break;
      }
    }
  }

  // All models failed
  console.error(`${logPrefix} ✗ All models failed. Last error:`, lastError?.message);
  throw lastError || new Error('All models failed');
};

export { MODELS, API_KEY };
