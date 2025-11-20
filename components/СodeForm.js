import CodeEditor, {
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";
import { SafeAreaView, View, ScrollView, TextBase, Alert } from "react-native";
import { Paragraph} from "react-native-paper";
import { Button,Text } from "@rneui/base";
import React, { useState } from "react";

export const Example = ({ navigation }) => {
  const [code, setCode] = useState("5+7");
  const [result, setResult] = useState("coding");

  const goTotask = () => {
    navigation.navigate("Daily");
  };

  // const executeCode = () => {
  //   try {
  //     const evaluatedResult = eval(code);
  //     setResult(evaluatedResult);
  //   } catch (error) {
  //     setResult("Error during code execution:", error.name);
  //   }
  // };

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
      setResult(evaluatedResult);
    } catch (error) {
      Alert.alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <ScrollView style={{ flex: 1 }}>
      <CodeEditor
        value={code}
        onChange={setCode}
        style={{
          flex: 1,
          width: "100%",
          height: "50%",
          fontSize: 18,
          inputLineHeight: 26,
          highlighterLineHeight: 26,
        }}
        language="javascript"
        syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
        showLineNumbers
      />
      <Button
        color={'secondary'}
        onPress={executeCode}
      >
        RUN
      </Button>
      <View>
        <Text h1 h1Style={{color:'red',backgroundColor:'lightgrey'}}>
          {result}
        </Text>
      </View>
    </ScrollView>
  );
};
