import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';
import { typography, spacing, borderRadius, shadows } from '../styles';
import ThemeToggle from './ThemeToggle';

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.emoji]}>🏴‍☠️</Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Ahoy! Welcome to the treasure cove!
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.error }]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: colors.text }]}>
            ⚓ Abandon Ship (Logout)
          </Text>
        </TouchableOpacity>
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
  emoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
  },
  button: {
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
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

export default HomeScreen;