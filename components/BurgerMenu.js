import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { showAlert } from '../utils/alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';
import { spacing, borderRadius, shadows } from '../styles';

const BurgerMenu = ({ navigation }) => {
    const { colors } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleProfile = () => {
        closeMenu();
        showAlert('Profile', 'Profile page coming soon!');
    };

    const handleLogout = async () => {
        closeMenu();
        try {
            await AsyncStorage.removeItem('token');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
            });
        } catch (error) {
            console.error('Logout error:', error);
            showAlert('Error', 'Failed to logout. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.burgerButton, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}
                onPress={toggleMenu}
                activeOpacity={0.8}
            >
                <Text style={[styles.burgerIcon, { color: colors.text }]}>☰</Text>
            </TouchableOpacity>

            {isOpen && (
                <>
                    <TouchableOpacity
                        style={styles.backdrop}
                        onPress={closeMenu}
                        activeOpacity={1}
                    />
                    <View style={[styles.dropdown, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
                        <TouchableOpacity
                            style={[styles.menuItem, { borderBottomColor: colors.border }]}
                            onPress={handleProfile}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.menuIcon]}>👤</Text>
                            <Text style={[styles.menuText, { color: colors.text }]}>Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={handleLogout}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.menuIcon]}>🚪</Text>
                            <Text style={[styles.menuText, { color: colors.error }]}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    burgerButton: {
        padding: spacing.sm,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        ...shadows.sm,
    },
    burgerIcon: {
        fontSize: 20,
    },
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        right: 0,
        marginTop: spacing.xs,
        minWidth: 150,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        zIndex: 1000,
        ...shadows.lg,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
    },
    menuIcon: {
        fontSize: 18,
        marginRight: spacing.sm,
    },
    menuText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default BurgerMenu;
