import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { showAlert } from '../utils/alert';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import { typography, spacing, borderRadius, shadows } from '../styles';
import LoadingSpinner from './LoadingSpinner';
import ThemedMarkdown from './ThemedMarkdown';
import ThemeToggle from './ThemeToggle';
import { generateWithFallback } from '../utils/gemini';

const Apifetcher = ({ route }) => {
  const { colors } = useTheme();
  const { randtask } = route.params;
  const [reslt, setReslt] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [userSolution, setUserSolution] = useState("");
  const [feedback, setFeedback] = useState();
  const [showSolution, setShowSolution] = useState(false);
  const [solution, setSolution] = useState();

  const fetchSolution = async () => {
    setIsLoading(true);

    const prompt = `Write 3 different JavaScript solutions to the following problem, with explanations:

**Problem:**
${reslt}

Provide 3 different solutions, each with an explanation.`;

    try {
      await generateWithFallback(prompt, {
        temperature: 1.0,
        logPrefix: '[Apifetcher:Solution]',
        onChunk: (fullText) => setSolution(fullText),
      });
      setShowSolution(true);
      setIsLoading(false);
    } catch (error) {
      console.error('[Apifetcher] ✗ Error (Solution):', error.message);
      setSolution('⚠️ Не удалось получить решение. Попробуйте позже.');
      setShowSolution(true);
      setIsLoading(false);
    }
  };

  const submitSolution = async () => {
    if (!userSolution.trim()) {
      showAlert('Error', 'Please enter your solution');
      return;
    }

    setIsLoading(true);

    const prompt = `Analyze the user's solution to this coding problem and provide constructive feedback. Evaluate their approach, code quality, and logic. Be encouraging and educational.

**Problem:**
${reslt}

**User's Solution:**
\`\`\`javascript
${userSolution}
\`\`\`

Provide detailed feedback on:
1. Whether the approach is correct
2. Code quality and best practices
3. Potential improvements or edge cases
4. Time and space complexity if applicable

Do not reveal the optimal solution yet. Focus on helping them improve their thinking.`;

    try {
      await generateWithFallback(prompt, {
        temperature: 0.9,
        maxOutputTokens: 2048,
        logPrefix: '[Apifetcher:Feedback]',
        onChunk: (fullText) => setFeedback(fullText),
      });
      setIsLoading(false);
    } catch (error) {
      console.error('[Apifetcher] ✗ Error (Feedback):', error.message);
      setFeedback('⚠️ Не удалось получить обратную связь. Попробуйте позже.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      setIsLoading(true);

      const prompt = `Write description and question of this Leetcode problem without answer:

**Problem:**
${randtask}`;

      try {
        await generateWithFallback(prompt, {
          temperature: 0.9,
          maxOutputTokens: 2048,
          logPrefix: '[Apifetcher:Problem]',
          onChunk: (fullText) => {
            if (isMounted) setReslt(fullText);
          },
        });
        if (isMounted) setIsLoading(false);
      } catch (error) {
        console.error('[Apifetcher] ✗ Error (Problem):', error.message);
        if (isMounted) {
          setReslt('⚠️ Не удалось загрузить задачу. Попробуйте позже.');
          setIsLoading(false);
        }
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [randtask]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.scrollContent}>
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Coding Challenge</Text>
      </View>

      {reslt ? (
        <View style={styles.problemContainer}>
          <View style={[styles.card, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>📋 Problem Description:</Text>
            <ThemedMarkdown value={reslt} />
          </View>

          <View style={styles.solutionSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>💻 Your Solution:</Text>
            <Text style={[styles.hint, { color: colors.textSecondary }]}>Write your JavaScript solution below</Text>
            <TextInput
              style={[styles.codeEditor, { backgroundColor: colors.backgroundLighter, borderColor: colors.border, color: colors.text }]}
              placeholder="// Write your solution here
function solution() {
  // Your code
}"
              placeholderTextColor={colors.textMuted}
              value={userSolution}
              onChangeText={setUserSolution}
              multiline
              numberOfLines={12}
              textAlignVertical="top"
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
            />

            <TouchableOpacity
              style={[styles.button, styles.buttonSuccess, { backgroundColor: colors.success }]}
              onPress={submitSolution}
              activeOpacity={0.8}
              disabled={!userSolution.trim()}
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>✅ Submit My Solution</Text>
            </TouchableOpacity>
          </View>

          {feedback && (
            <View style={[styles.card, styles.feedbackCard, { backgroundColor: colors.backgroundLight, borderColor: colors.border, borderLeftColor: colors.info }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>💡 Feedback on Your Solution:</Text>
              <ThemedMarkdown value={feedback} />
            </View>
          )}

          {!showSolution && (
            <TouchableOpacity
              style={[styles.button, styles.buttonWarning, { backgroundColor: colors.warning }]}
              onPress={fetchSolution}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>🔍 Show Optimal Solutions</Text>
            </TouchableOpacity>
          )}

          {showSolution && solution && (
            <View style={[styles.card, styles.solutionCard, { backgroundColor: colors.backgroundLight, borderColor: colors.border, borderLeftColor: colors.success }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>✨ Optimal Solutions:</Text>
              <ThemedMarkdown value={solution} />
            </View>
          )}
        </View>
      ) : (
        <LoadingSpinner text="Loading..." />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggleContainer: {
    alignSelf: 'flex-end',
    marginBottom: spacing.md,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
  },
  problemContainer: {
    gap: spacing.lg,
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
  solutionCard: {
    borderLeftWidth: 4,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  solutionSection: {
    gap: spacing.md,
  },
  hint: {
    ...typography.caption,
    fontStyle: 'italic',
  },
  codeEditor: {
    borderWidth: 2,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 14,
    fontFamily: 'monospace',
    minHeight: 200,
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
  buttonSuccess: {},
  buttonWarning: {},
  buttonText: {
    ...typography.body,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default Apifetcher;
