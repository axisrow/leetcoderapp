import React, { useCallback, useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useTheme } from './ThemeContext';
import { typography, spacing, borderRadius, shadows } from './styles';
import ThemedMarkdown from './components/ThemedMarkdown';
import LoadingSpinner from './components/LoadingSpinner';
import { generateWithFallback } from './utils/gemini';

const AIComponent = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const { questionx } = route.params;
  const [reslt, setReslt] = useState();
  const [isLoading, setIsLoading] = useState(false);


  const run = useCallback(async () => {
    setIsLoading(true);

    const prompt = `Write 3 different JavaScript solutions to the following problem, with explanations:

**Problem:**
${questionx}

Provide 3 different solutions, each with an explanation.`;

    try {
      await generateWithFallback(prompt, {
        temperature: 1.0,
        logPrefix: '[CheckAnswer]',
        onChunk: (fullText) => setReslt(fullText),
      });
      setIsLoading(false);
    } catch (error) {
      console.error('[CheckAnswer] ✗ All models failed:', error.message);
      setReslt('⚠️ Не удалось сгенерировать решение. Все модели недоступны (превышен лимит запросов). Попробуйте позже.');
      setIsLoading(false);
    }
  }, [questionx]);

  useEffect(() => {
    run();
  }, [run]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>✨ Optimal Solutions</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Multiple approaches to solve this problem
          </Text>
        </View>

        {reslt ? (
          <View style={[styles.card, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
            <ThemedMarkdown value={reslt} />
          </View>
        ) : (
          <LoadingSpinner text="Generating solutions..." />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
