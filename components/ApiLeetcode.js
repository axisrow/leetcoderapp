import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import { typography, spacing, borderRadius, shadows } from '../styles';
import LoadingSpinner from './LoadingSpinner';
import ThemeToggle from './ThemeToggle';

export const ApiFetcher = ({ route }) => {
  const { colors } = useTheme();
  const { randtask } = route.params;
  const [task, setTask] = useState(null);
  const [hint, setHint] = useState(0);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const hints = () => {
    if (hint <= task.hints.length && task.hints[hint] != undefined) {
      setHint(hint + 1);
      Alert.alert('Hint', `${task.hints[hint]}`);
    } else {
      Alert.alert('Info', 'Sorry, no more hints available');
    }
  };

  const fetchSolution = async () => {
    navigation.navigate('answer', { questionx: task.question });
  };

  const fetching = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://leetcdtasker.onrender.com/select?titleSlug=${randtask}`);
      setTask(response.data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", "We can't load this task correctly, try again please");
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
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {task && task.questionTitle}
          </Text>
        </View>

        {task && (
          <View style={[styles.card, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {task.question ? task.question.replace(/<[^>]*>/g, '') : 'Loading question...'}
            </Text>
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
