import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert, // Import Alert from react-native
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';

const Signup = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      // Check if email or password is empty
      Alert.alert('Fill the Form', 'Please provide email and password.');
      return;
    }
    try {
      setLoading(true);
    //   await auth().createUserWithEmailAndPassword(email, password);
      navigation.navigate('Splash');
    } catch (error) {
      console.error('Signup Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} disabled={loading} />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
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

export default Signup;
