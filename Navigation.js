import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ApiFetcher } from "./components/ApiLeetcode.js";
import { Example } from "./components/СodeForm";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Dropdown from "./Tasks.js";
import Main from "./Main.js";
import TaskList from "./Tasks.js";
import AIComponent from "./CheckAnswer.js";
import AIPuzzle from "./components/Puzzles.js";
import RegisterForm from "./components/RegisterForm.js";
import LoginForm from "./components/LoginPage.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "./components/LoadingSpinner";
import ThemeToggle from "./components/ThemeToggle";
import BurgerMenu from "./components/BurgerMenu";
import { useTheme } from "./ThemeContext";

const Stack = createStackNavigator();

const AuthStack = createStackNavigator();

export function AuthStackNavigate() {
  return (
    <AuthStack.Navigator
      screenOptions={{ presentation: "modal", headerShown: false }}
    >
      <AuthStack.Screen
        name="Login"
        component={LoginForm}
        options={{ title: "Login" }}
      />
      <AuthStack.Screen
        name="register"
        component={RegisterForm}
        options={{ title: "Registration" }}
      />
    </AuthStack.Navigator>
  );
}

function NavigationContent() {
  const { colors } = useTheme();
  const [initialRoute, setInitialRoute] = useState(null);
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setInitialRoute(token ? "Homepage" : "Auth");
      } catch (error) {
        console.warn("Failed to read token from storage", error);
        setInitialRoute("Auth");
      } finally {
        setCheckingToken(false);
      }
    };

    checkToken();
  }, []);

  if (checkingToken || !initialRoute) {
    return <LoadingSpinner text="Loading..." />;
  }

  const getScreenOptions = (navigation) => ({
    headerStyle: {
      backgroundColor: colors.backgroundLight,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: '600',
    },
    headerRight: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginRight: 16 }}>
        <ThemeToggle />
        <BurgerMenu navigation={navigation} />
      </View>
    ),
  });

  return (
    <Stack.Navigator initialRouteName={initialRoute}>

      <Stack.Screen
        name="Auth"
        component={AuthStackNavigate}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Homepage"
        component={Main}
        options={({ navigation }) => ({
          title: "ExerciseR",
          ...getScreenOptions(navigation),
        })}
      />

      <Stack.Screen
        name="Daily"
        component={ApiFetcher}
        options={({ navigation }) => ({
          title: "Leetcode Task",
          ...getScreenOptions(navigation),
        })}
      />

      <Stack.Screen
        name="coder"
        component={Example}
        options={({ navigation }) => ({
          title: "Code Room",
          ...getScreenOptions(navigation),
        })}
      />

      <Stack.Screen
        name="tasks"
        component={TaskList}
        options={({ navigation }) => ({
          title: "Tasks",
          ...getScreenOptions(navigation),
        })}
      />

      <Stack.Screen
        name="answer"
        component={AIComponent}
        options={({ navigation }) => ({
          title: "Answer",
          ...getScreenOptions(navigation),
        })}
      />

      <Stack.Screen
        name="puzzle"
        component={AIPuzzle}
        options={({ navigation }) => ({
          title: "Puzzle",
          ...getScreenOptions(navigation),
        })}
      />
    </Stack.Navigator>
  );
}

export default function Navigate() {
  return (
    <NavigationContainer>
      <NavigationContent />
    </NavigationContainer>
  );
}
