import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>Login Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default Login;
