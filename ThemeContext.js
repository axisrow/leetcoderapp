import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

// Light theme colors
export const lightColors = {
    // Primary colors
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    primaryLight: '#818cf8',

    // Secondary colors
    secondary: '#8b5cf6',
    secondaryDark: '#7c3aed',
    secondaryLight: '#a78bfa',

    // Accent colors
    accent: '#06b6d4',
    accentDark: '#0891b2',
    accentLight: '#22d3ee',

    // Difficulty colors
    easy: '#10b981',
    medium: '#f59e0b',
    hard: '#ef4444',

    // Neutral colors
    background: '#ffffff',
    backgroundLight: '#f8fafc',
    backgroundLighter: '#f1f5f9',

    // Text colors
    text: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#64748b',

    // UI colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Borders
    border: '#e2e8f0',
    borderLight: '#cbd5e1',

    // Code block - высококонтрастные цвета
    codeBackground: '#1e293b',
    codeText: '#e2e8f0',
};

// Dark theme colors
export const darkColors = {
    // Primary colors
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    primaryLight: '#818cf8',

    // Secondary colors
    secondary: '#8b5cf6',
    secondaryDark: '#7c3aed',
    secondaryLight: '#a78bfa',

    // Accent colors
    accent: '#06b6d4',
    accentDark: '#0891b2',
    accentLight: '#22d3ee',

    // Difficulty colors
    easy: '#10b981',
    medium: '#f59e0b',
    hard: '#ef4444',

    // Neutral colors
    background: '#0f172a',
    backgroundLight: '#1e293b',
    backgroundLighter: '#334155',

    // Text colors
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',

    // UI colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Borders
    border: '#334155',
    borderLight: '#475569',

    // Code block
    codeBackground: '#334155',
    codeText: '#f1f5f9',
};

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [colors, setColors] = useState(darkColors);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme !== null) {
                const isDarkTheme = savedTheme === 'dark';
                setIsDark(isDarkTheme);
                setColors(isDarkTheme ? darkColors : lightColors);
            }
        } catch (error) {
            console.error('Error loading theme:', error);
        }
    };

    const toggleTheme = async () => {
        try {
            const newIsDark = !isDark;
            setIsDark(newIsDark);
            setColors(newIsDark ? darkColors : lightColors);
            await AsyncStorage.setItem('theme', newIsDark ? 'dark' : 'light');
        } catch (error) {
            console.error('Error saving theme:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
