import React, { useCallback, useState, useRef } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  View,
  Image,
  Alert,
  Platform,
  Text
} from "react-native";
import { Input} from "@rneui/themed";
import { Button } from "@rneui/base";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import Markdown from "react-native-marked";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const AIPuzzle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const windowWidth = useWindowDimensions().width;
  const [reslt, setReslt] = useState();

  const answer = useRef("");


  const themes = [
    "Variables",
    "Data Types",
    "Operators",
    "Conditional Statements",
    "Loops",
    "Functions",
    "Arrays",
    "Objects",
    "DOM Manipulation",
    "Events",
    "Error Handling",
    "Asynchronous Programming",
  ];

  const difficulty = ["EASY", "MEDIUM", "HARD"];
  const types = ["TRUE/FALSE", "ONE-CHOICE", "MULTI-CHOICE", "MISSING CODE"];

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const randomTheme = random(themes);
  const randomDifficulty = random(difficulty);
  const randomType = random(types);
  const randomNum = Math.floor(Math.random() * 10);
  const [answers,setAnswers] = useState();


  

  const run = useCallback(async () => {
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContentStream({
        contents: [{
          role: "user",
          parts: [{
            text: `Write 1 quiz without answer for improving Javascript skills:
Topic: ${randomTheme}
Difficulty: ${randomDifficulty}
Format: ${randomType}
Number of questions: ${randomNum}`,
          }],
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
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

      let fullText = '';
      for await (const chunk of result.stream) {
        fullText += chunk.text();
        setReslt(fullText);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('[Puzzles] ❌ Ошибка (Quiz):', error.message);
      setIsLoading(false);
    }
  }, []);

  const runCheck = useCallback(async () => {
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContentStream({
        contents: [{
          role: "user",
          parts: [{
            text: `What is the right answer to this quiz, and why?\n\nQuiz:\n${reslt}`,
          }],
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
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

      let fullText = '';
      for await (const chunk of result.stream) {
        fullText += chunk.text();
        setAnswers(fullText);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setIsLoading(false);
    }
  }, [reslt]);

  

 

  return (
    <ScrollView testID="scroll-view">
      {isLoading && <Image
  source={require('../loading.gif')}
  style={{ width: '100%', height: '100%' }}
  testID="loading-image"
/>}
      <Button color={"primary"} onPress={run} title="Run AI">
        Generate New Quiz
      </Button>
      
      <Text >{randomTheme}</Text>
      <Text >{randomDifficulty}</Text>
      <Text >{randomType}</Text>
      
        {reslt && <Markdown value={reslt} />}
        <Text style={{color:'red'}}>Answer:</Text>
        {answers && <Markdown value={answers} />}
    
      <Button
        title={"Check"}
        color={"warning"}
        onPress={() => {reslt &&
          runCheck();
        }}
      />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,65,121,1) 35%, rgba(0,212,255,1) 100%)",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginLeft: 5,
  },
});

export default AIPuzzle;
