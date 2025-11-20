import React, { useState } from 'react';
import { StyleSheet, TextInput,View, Alert } from 'react-native';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';
import { Text } from '@rneui/base';
import axios from 'axios';

const RegisterForm = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://leetcoderx.onrender.com/register', { name, email, password });
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      alert('New account created');
      navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
      <Button title="Register" onPress={handleSubmit} />
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
  input: {
    width: 300,
    height: 40,
    borderColor: '#ccc',
    backgroundColor:'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default RegisterForm;
