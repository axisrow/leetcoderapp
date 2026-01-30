import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, Platform, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import { typography, spacing, borderRadius, shadows } from '../styles';
import LoadingSpinner from './LoadingSpinner';
import ThemeToggle from './ThemeToggle';

export default function LoginPage({ navigation }) {
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const showMessage = (title, message) => {
    if (Platform.OS === 'web') {
      alert(`${title ? `${title}: ` : ''}${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSubmit = async () => {
    setError('');

    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://leetcoderx.onrender.com/login', { email, password });
      const { token, message } = response.data || {};

      if (!token) {
        setError(message || 'Invalid credentials.');
        setIsLoading(false);
        return;
      }

      await AsyncStorage.setItem('token', token);
      navigation.navigate('Homepage');
      showMessage('Success', `Hello ${email}`);
    } catch (error) {
      const status = error.response?.status;
      const serverMessage = error.response?.data?.message;

      if (status === 401) {
        setError(serverMessage || 'Invalid credentials.');
      } else if (status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(serverMessage || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = () => {
    navigation.navigate("register");
  };

  if (isLoading) {
    return <LoadingSpinner text="Logging in..." />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Login</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sign in to continue learning
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.backgroundLight, borderColor: colors.border, color: colors.text }, emailFocused && { borderColor: colors.primary }]}
              placeholder="your@email.com"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.backgroundLight, borderColor: colors.border, color: colors.text }, passwordFocused && { borderColor: colors.primary }]}
              placeholder="••••••••"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              secureTextEntry
            />
          </View>

          {error ? (
            <View style={[styles.errorContainer, { backgroundColor: colors.backgroundLighter, borderColor: colors.error }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>⚠️ {error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>Login</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textMuted }]}>or</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary, { backgroundColor: colors.backgroundLight, borderColor: colors.primary }]}
            onPress={register}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>Register</Text>
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
    ...typography.bodySecondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.bodySecondary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 2,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    ...shadows.sm,
  },
  inputFocused: {},
  errorContainer: {
    borderLeftWidth: 4,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  errorText: {
    ...typography.bodySecondary,
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    ...typography.caption,
    marginHorizontal: spacing.md,
  },
});
