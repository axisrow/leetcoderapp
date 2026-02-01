import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { showAlert } from '../utils/alert';
import axios from "axios";
import { useRoute, useNavigation } from '@react-navigation/native';
import { LEETCODE_API_URL } from '../config/api';
import { useTheme } from '../ThemeContext';
import { typography, spacing, borderRadius, shadows } from '../styles';
import LoadingSpinner from './LoadingSpinner';
import ThemedHTML from './ThemedHTML';


export const ApiFetcher = ({ route }) => {
  const { colors } = useTheme();
  const { randtask } = route.params;
  const [task, setTask] = useState(null);
  const [hint, setHint] = useState(0);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const hints = () => {
    if (task.hints && hint < task.hints.length && task.hints[hint] != undefined) {
      setHint(hint + 1);
      showAlert('Hint', `${task.hints[hint]}`);
    } else {
      showAlert('Info', 'Sorry, no more hints available');
    }
  };

  const fetchSolution = async () => {
    navigation.navigate('answer', { questionx: task.question });
  };

  const fetching = async () => {
    try {
      setIsLoading(true);
      console.log('[ApiLeetcode] Fetching task:', randtask);
      console.log('[ApiLeetcode] URL:', `${LEETCODE_API_URL}/select?titleSlug=${randtask}`);

      const response = await axios.get(`${LEETCODE_API_URL}/select?titleSlug=${randtask}`, {
        timeout: 15000, // 15 секунд таймаут
      });

      console.log('[ApiLeetcode] Response status:', response.status);
      console.log('[ApiLeetcode] Response data:', JSON.stringify(response.data).slice(0, 200));
      console.log('[ApiLeetcode] Has question:', !!response.data?.question);

      setTask(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('[ApiLeetcode] Error:', error.message);
      console.error('[ApiLeetcode] Error code:', error.code);
      showAlert("Error", "We can't load this task correctly, try again please");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetching();
  }, [randtask]);

  if (isLoading) {
    return <LoadingSpinner text="Loading task..." />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {task && task.questionTitle}
          </Text>
        </View>

        {task && (
          <View style={[styles.card, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
            {task.question ? (
              <ThemedHTML value={task.question} contentType="html" />
            ) : (
              <Text style={[styles.questionText, { color: colors.text }]}>Loading question...</Text>
            )}
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.warning }]}
            onPress={hints}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>💡 Hint</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={fetchSolution}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>🔍 Show Answer</Text>
          </TouchableOpacity>
        </View>
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
    ...typography.h2,
    textAlign: 'center',
  },
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    ...shadows.md,
  },
  questionText: {
    ...typography.body,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  button: {
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  buttonText: {
    ...typography.body,
    fontWeight: '700',
    fontSize: 16,
  },
});
