import React from "react";
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useTheme } from './ThemeContext';
import { typography, spacing, borderRadius, shadows } from './styles';


export default function Main({ navigation }) {
  const { colors } = useTheme();

  const loadTask = () => {
    navigation.navigate("Daily");
  };

  const coder = () => {
    navigation.navigate("coder");
  };

  const tasks = () => {
    navigation.navigate("tasks");
  };

  const answer = () => {
    navigation.navigate("answer");
  };

  const puzzle = () => {
    navigation.navigate("puzzle");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.primary }]}>LeetCoderApp</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Improve your coding skills by solving logic tasks and puzzles
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[styles.card, styles.cardPrimary, {
              backgroundColor: colors.backgroundLight,
              borderColor: colors.primary
            }]}
            onPress={tasks}
            activeOpacity={0.8}
          >
            <Text style={styles.cardIcon}>📚</Text>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Long Tasks</Text>
            <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
              Solve LeetCode-style problems
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.cardSecondary, {
              backgroundColor: colors.backgroundLight,
              borderColor: colors.secondary
            }]}
            onPress={puzzle}
            activeOpacity={0.8}
          >
            <Text style={styles.cardIcon}>🧩</Text>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Puzzles</Text>
            <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
              Quick JavaScript quizzes
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.footer, { color: colors.textMuted }]}>Happy Hacking! 🚀</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    maxWidth: 400,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 600,
    gap: spacing.lg,
  },
  card: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.lg,
  },
  cardPrimary: {
    borderWidth: 2,
  },
  cardSecondary: {
    borderWidth: 2,
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    ...typography.bodySecondary,
    textAlign: 'center',
  },
  footer: {
    ...typography.bodySecondary,
    marginTop: spacing.xxl,
  },
});