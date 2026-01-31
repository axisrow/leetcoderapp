import React, { useCallback, useState, useRef } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  View,
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useTheme } from '../ThemeContext';
import { typography, spacing, borderRadius, shadows } from '../styles';
import LoadingSpinner from './LoadingSpinner';
import ThemedMarkdown from './ThemedMarkdown';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const AIPuzzle = () => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const windowWidth = useWindowDimensions().width;
  const [reslt, setReslt] = useState();
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState();
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [answers, setAnswers] = useState();

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

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const [randomTheme] = useState(() => random(themes));
  const [randomDifficulty] = useState(() => random(difficulty));
  const [randomType] = useState(() => random(types));
  const [randomNum] = useState(() => Math.floor(Math.random() * 10));

  const run = useCallback(async () => {
    setIsLoading(true);
    setUserAnswer("");
    setFeedback(null);
    setShowCorrectAnswer(false);
    setAnswers(null);

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

  const submitAnswer = useCallback(async () => {
    if (!userAnswer.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите ваш ответ');
      return;
    }

    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContentStream({
        contents: [{
          role: "user",
          parts: [{
            text: `Analyze the user's answer to this quiz and provide constructive feedback. Tell them if they're on the right track and explain why their answer is correct or incorrect. Be encouraging and educational.

Quiz:
${reslt}

User's Answer:
${userAnswer}

Provide feedback without revealing the correct answer yet. Focus on their thinking process.`,
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
        setFeedback(fullText);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setIsLoading(false);
    }
  }, [reslt, userAnswer]);

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
      setShowCorrectAnswer(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setIsLoading(false);
    }
  }, [reslt]);

  if (isLoading) {
    return <LoadingSpinner text="Загрузка..." />;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>JavaScript Puzzles</Text>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary, { backgroundColor: colors.primary }]}
          onPress={run}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: colors.text }]}>🎲 Generate New Quiz</Text>
        </TouchableOpacity>
      </View>

      {reslt && (
        <View style={styles.quizContainer}>
          <View style={styles.quizInfo}>
            <View style={[styles.badge, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
              <Text style={[styles.badgeText, { color: colors.textSecondary }]}>📚 {randomTheme}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
              <Text style={[styles.badgeText, { color: colors.textSecondary }]}>⚡ {randomDifficulty}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
              <Text style={[styles.badgeText, { color: colors.textSecondary }]}>📝 {randomType}</Text>
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Question:</Text>
            <ThemedMarkdown value={reslt} />
          </View>

          <View style={styles.answerSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Answer:</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.backgroundLight, borderColor: colors.border, color: colors.text }]}
              placeholder="Enter your answer here..."
              placeholderTextColor={colors.textMuted}
              value={userAnswer}
              onChangeText={setUserAnswer}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.button, styles.buttonSuccess, { backgroundColor: colors.success }]}
              onPress={submitAnswer}
              activeOpacity={0.8}
              disabled={!userAnswer.trim()}
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>✅ Submit Answer</Text>
            </TouchableOpacity>
          </View>

          {feedback && (
            <View style={[styles.card, styles.feedbackCard, { backgroundColor: colors.backgroundLight, borderColor: colors.border, borderLeftColor: colors.info }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>💡 Feedback:</Text>
              <ThemedMarkdown value={feedback} />
            </View>
          )}

          {!showCorrectAnswer && (
            <TouchableOpacity
              style={[styles.button, styles.buttonWarning, { backgroundColor: colors.warning }]}
              onPress={runCheck}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>🔍 Show Correct Answer</Text>
            </TouchableOpacity>
          )}

          {showCorrectAnswer && answers && (
            <View style={[styles.card, styles.answerCard, { backgroundColor: colors.backgroundLight, borderColor: colors.border, borderLeftColor: colors.success }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>✨ Correct Answer:</Text>
              <ThemedMarkdown value={answers} />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  quizContainer: {
    gap: spacing.lg,
  },
  quizInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  badge: {
    borderRadius: borderRadius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '600',
  },
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    ...shadows.md,
  },
  feedbackCard: {
    borderLeftWidth: 4,
  },
  answerCard: {
    borderLeftWidth: 4,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  answerSection: {
    gap: spacing.md,
  },
  textArea: {
    borderWidth: 2,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    minHeight: 120,
    ...shadows.sm,
  },
  button: {
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  buttonPrimary: {},
  buttonSuccess: {},
  buttonWarning: {},
  buttonText: {
    ...typography.body,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default AIPuzzle;
