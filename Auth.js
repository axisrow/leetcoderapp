import React from "react";
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useTheme } from './ThemeContext';
import { typography, spacing, borderRadius, shadows } from './styles';
import ThemeToggle from './components/ThemeToggle';


export default function Auth({ navigation }) {
  const { colors } = useTheme();

  const register = () => {
    navigation.navigate("register");
  };

  const login = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.primary }]}>LeetCoderApp</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Improve your coding skills by solving logic tasks and puzzles
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary, { backgroundColor: colors.primary }]}
            onPress={login}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary, {
              backgroundColor: colors.backgroundLight,
              borderColor: colors.primary
            }]}
            onPress={register}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>Registration</Text>
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
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    maxWidth: 400,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: spacing.md,
  },
  button: {
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  buttonPrimary: {},
  buttonSecondary: {
    borderWidth: 2,
  },
  buttonText: {
    ...typography.body,
    fontWeight: '700',
    fontSize: 18,
  },
  footer: {
    ...typography.bodySecondary,
    marginTop: spacing.xxl,
  },
});