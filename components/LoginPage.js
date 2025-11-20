import React, { useState } from 'react';
import { StyleSheet,View,TextInput, Alert } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';
import { Text } from '@rneui/base';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";







const LoginForm = () => {
  const navigation = useNavigation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://leetcoderx.onrender.com/login', { email, password });
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      navigation.navigate('Homepage');
      alert(`Hello ${email}`);
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Member not found');
      } else {
        alert(error.message);
      }
    }
  };

  const register =() =>{
    navigation.navigate("register")
  };

  return (
    <View style={styles.container}>
       <Text h2 
        style={{ backgroundColor: "black", color: "lightblue"}}
      >
        This application can help you with coding by solving logic tasks and puzzles, Happy Hacking
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleSubmit} />
      <Button
        style={styles.button}
        color={"error"}
        size="lg"
        onPress={register}
      >
        Registration
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,65,121,1) 35%, rgba(0,212,255,1) 100%)',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color:'white',
  },
  button:{paddingTop:10},
  input: {
    width: 300,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingTop:10,
    marginBottom: 10,
    marginTop:5,
    backgroundColor:'white',
  },
});

export default LoginForm;
