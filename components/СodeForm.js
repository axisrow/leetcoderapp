import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Alert, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { useTheme } from '../ThemeContext';
import { typography, spacing, borderRadius, shadows } from '../styles';

export const Example = ({ navigation }) => {
  const { colors } = useTheme();
  const [code, setCode] = useState("5+7");
  const [result, setResult] = useState("");

  const goToTask = () => {
    navigation.navigate("Daily");
  };

  function safeEval(code) {
    try {
      return eval(code);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const executeCode = () => {
    try {
      const evaluatedResult = safeEval(code);
      setResult(String(evaluatedResult));
    } catch (error) {
      Alert.alert('Error', `${error.message}`);
      setResult('Error');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Code Playground</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Test your JavaScript code
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>JavaScript Code:</Text>
          <TextInput
            style={[styles.codeEditor, { backgroundColor: colors.backgroundLighter, borderColor: colors.border, color: colors.text }]}
            value={code}
            onChangeText={setCode}
            multiline
            placeholder="// Write your code here"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.success }]}
          onPress={executeCode}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: colors.text }]}>▶️ RUN</Text>
        </TouchableOpacity>

        {result !== "" && (
          <View style={[styles.resultCard, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
            <Text style={[styles.resultLabel, { color: colors.textSecondary }]}>Result:</Text>
            <Text style={[styles.resultText, { color: colors.text }]}>{result}</Text>
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
    marginBottom: spacing.lg,
    borderWidth: 1,
    ...shadows.md,
  },
  label: {
    ...typography.bodySecondary,
    fontWeight: '600',
    marginBottom: spacing.sm,
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
    marginBottom: spacing.lg,
  },
  buttonText: {
    ...typography.body,
    fontWeight: '700',
    fontSize: 16,
  },
  resultCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    ...shadows.md,
  },
  resultLabel: {
    ...typography.caption,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  resultText: {
    ...typography.h2,
    fontFamily: 'monospace',
  },
});
