import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { ApiFetcher } from "./components/Apifetcher.js";
import { Example } from "./components/СodeForm";
import MainStack from "./Navigation.js";
import MyComponent from "./CheckAnswer.js";
import TaskList from "./Tasks.js";
import { NavigationContainer } from "@react-navigation/native";
import AIPuzzle from "./components/Puzzles.js";
import LoginForm from "./components/LoginPage.js";
import Auth from "./Auth.js";
import { ThemeProvider } from "./ThemeContext.js";

export default function App() {
  return (
    <ThemeProvider>
      <MainStack />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
