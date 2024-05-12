import React from 'react';
import { View, Button, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'; // Added Alert import
import { Text } from 'react-native';
import Validator from 'email-validator';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {firebase, db} from '../../firebase';

const SignUpForm = ({ navigation }) => {

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, 'A username is required'), // Corrected validation for username
        password: Yup.string()
            .required()
            .min(6, 'Your password has to have at least 6 characters')
    });

    const getRandomProfilePicture = async () => {
      try {
          const response = await fetch('https://randomuser.me/api');
          const data = await response.json();
          
          // Check if data.result[0] exists and has the property 'picture' and 'large'
          if (data && data.results && data.results[0] && data.results[0].picture && data.results[0].picture.large) {
              return data.results[0].picture.large;
          } else {
              // Handle the case where the expected data is not available
              throw new Error("Profile picture data is not available");
          }
      } catch (error) {
          // Handle fetch or JSON parsing errors
          console.error("Error fetching profile picture:", error);
          throw error;
      }
  }

    const onSignup = async (email, password,username) => {
        try {
          const authuser =  await firebase.auth().createUserWithEmailAndPassword(email, password);
            console.log('Firebase user created successfully', email, password);

            db.collection('users').add({
              owner_uid : authuser.user.uid,
              username: username,
              email: authuser.user.email,
              profile_picture: await getRandomProfilePicture(),
            })
        } catch (error) {
            Alert.alert('Invalid credentials', error.message);
        }
    };

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={values => {
                    onSignup(values.email, values.password,values.username);
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
                    <>
                        <View style={[styles.inputField,
                        { borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red' },
                        ]}>
                            <TextInput style={{ color: 'black' }}
                                placeholderTextColor='#444'
                                placeholder='Phone number or email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View style={[styles.inputField,
                        { borderColor: values.username.length < 1 || values.username.length >= 2 ? '#ccc' : 'red' },
                        ]}>

                            <TextInput style={{ color: 'black' }}
                                placeholderTextColor='#444'
                                placeholder='Username'
                                autoCapitalize='none'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>
                        <View style={[styles.inputField,
                        { borderColor: values.password.length < 1 || values.password.length >= 6 ? '#ccc' : 'red' },
                        ]}>

                            <TextInput style={{ color: 'black' }}
                                placeholderTextColor='#444'
                                placeholder='Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View >
                        <View style={{ paddingTop: 10 }}>
                            <Button title='Sign UP'
                                onPress={handleSubmit} />
                        </View>
                        <View style={styles.signUpContainer}>
                            <Text style={{ color: 'black' }}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.goBack('LoginScreen')}>
                                <Text style={{ color: '#6BB0F5' }} > Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80
    },
    inputField: {
        borderRadius: 4,
        padding: 6,
        backgroundColor: '#FAFAFA', // Corrected backgroundColor spelling
        marginBottom: 10,
        borderWidth: 1,
        justifyContent: 'center',
    },
    signUpContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50,
    }

})

export default SignUpForm;