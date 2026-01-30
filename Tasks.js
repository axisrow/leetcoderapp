import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from './ThemeContext';
import { typography, spacing, borderRadius, shadows } from './styles';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';

const TaskList = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(true);
  const [randomTask, setRandomTask] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState({
    easy: [],
    medium: [],
    hard: [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const easyTasks = await axios.get("https://leetcoderx.onrender.com/easy");
        const mediumTasks = await axios.get("https://leetcoderx.onrender.com/medium");
        const hardTasks = await axios.get("https://leetcoderx.onrender.com/hard");

        setTasks({
          easy: easyTasks.data,
          medium: mediumTasks.data,
          hard: hardTasks.data,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Tasks fetching error:", error);
        Alert.alert('Error', 'Failed to load tasks. Please try again.');
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const selectRandomTask = (cat) => {
    if (!cat || cat.length === 0) {
      alert('Tasks are loading... Please wait');
      return;
    }
    const randomTask = cat[Math.floor(Math.random() * cat.length)];
    navigation.navigate("Daily", { randtask: randomTask.titleslug });
  };

  const handlePress = () => setExpanded(!expanded);

  if (isLoading) {
    return <LoadingSpinner text="Loading tasks..." />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Choose Difficulty</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Select your skill level to get a random task
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonEasy, { backgroundColor: colors.backgroundLight, borderColor: colors.easy }]}
            onPress={() => selectRandomTask(tasks.easy)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>✅</Text>
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonTitle, { color: colors.text }]}>Easy Task</Text>
              <Text style={[styles.buttonSubtitle, { color: colors.textSecondary }]}>
                {tasks.easy.length} problems available
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonMedium, { backgroundColor: colors.backgroundLight, borderColor: colors.medium }]}
            onPress={() => selectRandomTask(tasks.medium)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>⚡</Text>
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonTitle, { color: colors.text }]}>Medium Task</Text>
              <Text style={[styles.buttonSubtitle, { color: colors.textSecondary }]}>
                {tasks.medium.length} problems available
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonHard, { backgroundColor: colors.backgroundLight, borderColor: colors.hard }]}
            onPress={() => selectRandomTask(tasks.hard)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>🔥</Text>
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonTitle, { color: colors.text }]}>Hard Task</Text>
              <Text style={[styles.buttonSubtitle, { color: colors.textSecondary }]}>
                {tasks.hard.length} problems available
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
  buttonContainer: {
    width: '100%',
    maxWidth: 500,
    gap: spacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  buttonEasy: {
    borderWidth: 2,
  },
  buttonMedium: {
    borderWidth: 2,
  },
  buttonHard: {
    borderWidth: 2,
  },
  buttonIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  buttonContent: {
    flex: 1,
  },
  buttonTitle: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  buttonSubtitle: {
    ...typography.caption,
  },
});

export default TaskList;
