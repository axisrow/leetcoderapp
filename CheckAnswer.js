import React, { useCallback, useState, useRef, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import Markdown from "react-native-marked";
import { useRoute } from '@react-navigation/native';

const MODEL_NAME = "gemini-2.5-flash";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const AIComponent = () => {
  const route = useRoute();
  const { questionx } = route.params;
  const [reslt, setReslt] = useState();
  const [isLoading, setIsLoading] = useState(false);


  const run = useCallback(async () => {
    localStorage.setItem('debug_questionx', questionx || 'undefined');
    console.log('Saved to localStorage. Run in console: copy(localStorage.getItem("debug_questionx"))');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      console.log('Sending request...');

      const result = await model.generateContentStream({
        contents: [{
          role: "user",
          parts: [{
            text: `Write 3 different JavaScript solutions to the following problem, with explanations:

**Problem:**
${questionx}

Provide 3 different solutions, each with an explanation.`,
          }],
        }],
        generationConfig: {
          temperature: 1.0,
          topK: 1,
          topP: 1,
        },
        safetySettings: [
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
        ],
      });

      console.log('Result:', result);
      console.log('Result.stream:', result.stream);
      console.log('Result.response:', result.response);
      console.log('Got stream, reading chunks...');

      let fullText = '';
      for await (const chunk of result.stream) {
        console.log('Chunk received');
        fullText += chunk.text();
        setReslt(fullText);
      }
      console.log('Done, total length:', fullText.length);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    run();
  }, []);

  return (
    <ScrollView testID="scroll-view">
      {isLoading && <Image
        source={require('./loading.gif')}
        style={{ width: '100%', height: '100%' }}
        testID="loading-image"
      />}

      {reslt && <Markdown value={reslt} />}

    </ScrollView>
  );
};

export default AIComponent;
