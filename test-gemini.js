const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function test() {
  console.log("🔑 API Key:", process.env.EXPO_PUBLIC_API_KEY ? "Загружен ✓" : "НЕ ЗАГРУЖЕН ❌");

  try {
    const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    console.log("✓ Модель инициализирована");

    console.log("\n📤 Отправляю простой запрос в streaming режиме...");
    const result = await model.generateContentStream({
      contents: [{
        role: "user",
        parts: [{ text: "Write a simple JavaScript function to add two numbers. Keep it very short." }]
      }]
    });

    console.log("✓ Поток получен, начинаю читать chunks...\n");

    let chunkCount = 0;
    let fullText = '';

    for await (const chunk of result.stream) {
      chunkCount++;
      const text = chunk.text();
      console.log(`[Chunk ${chunkCount}] ${text}`);
      fullText += text;
    }

    console.log(`\n✅ Завершено! Всего chunks: ${chunkCount}`);
    console.log(`📝 Всего символов: ${fullText.length}`);
  } catch (error) {
    console.error("❌ Ошибка:", error.message);
    console.error("Стек:", error.stack);
  }
}

test();
