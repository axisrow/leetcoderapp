import React, { useState } from "react";
import { ScrollView, Button, StyleSheet } from "react-native";
import { Text } from "@rneui/base";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const TestStream = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [chunkCount, setChunkCount] = useState(0);

  const run = async () => {
    console.log('[TestStream] 🔵 Start');
    setLoading(true);
    setText("");
    setChunkCount(0);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      console.log('[TestStream] ✓ Model initialized');

      const result = await model.generateContentStream({
        contents: [
          {
            role: "user",
            parts: [{ text: "Say hello in 5 languages. Keep it very short." }],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 200,
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });

      console.log('[TestStream] 📤 Request sent, waiting for stream...');

      let full = "";
      let count = 0;
      for await (const chunk of result.stream) {
        count++;
        const chunkText = chunk.text();
        console.log(`[TestStream] 📥 Chunk ${count}: ${chunkText.substring(0, 30)}...`);
        full += chunkText;
        setText(full);
        setChunkCount(count);
      }

      console.log('[TestStream] ✅ Complete! Total chunks:', count);
      setLoading(false);
    } catch (error) {
      console.error('[TestStream] ❌ Error:', error.message);
      setText("Error: " + error.message);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Stream Test (Minimal UI)</Text>

      <Button
        title={loading ? "Loading..." : "Generate"}
        onPress={run}
        disabled={loading}
      />

      {chunkCount > 0 && (
        <Text style={styles.info}>Chunks received: {chunkCount}</Text>
      )}

      {text && <Text style={styles.result}>{text}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    marginTop: 15,
    color: "#666",
    fontSize: 12,
  },
  result: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default TestStream;
