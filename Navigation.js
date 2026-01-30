import React, { useEffect, useState } from "react";
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

export default function Navigate() {
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
    return <LoadingSpinner text="Загрузка..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>

        <Stack.Screen
          name="Auth"
          component={AuthStackNavigate}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Homepage"
          component={Main}
          options={{ title: "ExerciseR" }}
        />

        <Stack.Screen
          name="Daily"
          component={ApiFetcher}
          options={{ title: "Leetcode Task" }}
        />

        <Stack.Screen
          name="coder"
          component={Example}
          options={{ title: "Code Room" }}
        />

        <Stack.Screen
          name="tasks"
          component={TaskList}
          options={{ title: "Tasks" }}
        />

        <Stack.Screen
          name="answer"
          component={AIComponent}
          options={{ title: "Answer" }}
        />

        <Stack.Screen
          name="puzzle"
          component={AIPuzzle}
          options={{ title: "Puzzle" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
