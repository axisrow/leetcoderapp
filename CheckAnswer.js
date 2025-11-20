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

    setIsLoading(true);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 1.0,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

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


    const parts = [
      {
        text: `Write 3 different JavaScript solutions to the following problem, with explanations in English:

    **Problem:**
    
    ${questionx}
    
    **Output:**
    
    The AI should provide 3 different solutions to the problem, each with an explanation.
    
    **Additional:**
    
    * The AI may use different coding styles for each solution.
    * The AI may add comments to the code to make it more readable.`,
      },
    ];

    const result = await model.generateContentStream({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    let fullText = '';
    for await (const chunk of result.stream) {
      fullText += chunk.text();
      setReslt(fullText);
    }
    setIsLoading(false);
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
