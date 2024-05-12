import React from 'react';
import { View, Button, TextInput, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { Text } from 'react-native';
import Validator from 'email-validator';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {firebase} from '../../firebase'

const LoginForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string().required().min(6, 'Your password has to have at least 6 characters'),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password); // Use auth() method to access authentication functions
      console.log('Firebase login Successful', email, password);
    } catch (error) {
      Alert.alert(
        'Invalid credentials',
        error.message + '\n\n... What would you like to do next',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
            style: 'cancel', // 'cancel' instead of 'Cancel'
          },
          {
            text: 'Sign Up',
            onPress: () => navigation.push('SignupScreen'),
          },
        ]
      );
      
    }
  };
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          onLogin(values.email, values.password)
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red',
                },
              ]}
            >
              <TextInput
                style={styles.inputText}
                placeholderTextColor="#444"
                placeholder="Phone number, username or email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                { borderColor: values.password.length < 1 || values.password.length >= 6 ? '#ccc' : 'red' },
              ]}
            >
              <TextInput
                style={styles.inputText}
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
              <Text style={{ color: '#6BB0F5' }}>Forgot password ?</Text>
            </View>
            <Button title="log in" style={{ borderRadius: 4 }} onPress={handleSubmit} />
            <View style={styles.signUpContainer}>
              <Text style={{ color: 'black' }}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                <Text style={{ color: '#6BB0F5' }}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 6,
    backgroundColor: '#FAFAFA', // Corrected spelling
    marginBottom: 10,
    borderWidth: 1,
    justifyContent: 'center',
  },
  inputText: {
    color: 'black', // Moved text color styling to here
  },
  signUpContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default LoginForm;