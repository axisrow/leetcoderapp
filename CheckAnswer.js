import React, { useCallback, useState, useRef, useEffect } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useRoute } from '@react-navigation/native';
import { useTheme } from './ThemeContext';
import { typography, spacing, borderRadius, shadows } from './styles';
import ThemedMarkdown from './components/ThemedMarkdown';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const AIComponent = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const { questionx } = route.params;
  const [reslt, setReslt] = useState();
  const [isLoading, setIsLoading] = useState(false);


  const run = useCallback(async () => {
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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
  }, [questionx]);

  useEffect(() => {
    run();
  }, [run]);

  if (isLoading) {
    return <LoadingSpinner text="Generating solutions..." />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>✨ Optimal Solutions</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Multiple approaches to solve this problem
          </Text>
        </View>

        {reslt && (
          <View style={[styles.card, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
            <ThemedMarkdown value={reslt} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggleContainer: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
  },
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    ...shadows.md,
  },
});

export default AIComponent;
