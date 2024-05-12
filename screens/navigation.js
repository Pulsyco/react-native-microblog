import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Homescreen from './Homescreen'
import NewsPostScreen from './NewsPostScreen'
import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'

const Stack = createStackNavigator()

const screenOptions ={
    headerShown : false,
}

 export const SignedInStack = () => (
    <NavigationContainer> 
        <Stack.Navigator 
        initialRouteName ='Homescreen' 
        screenOptions={screenOptions}>
            <Stack.Screen name= 'Homescreen' component={Homescreen} />
            <Stack.Screen name= 'NewPostScreen' component={NewsPostScreen} />        
        </Stack.Navigator>
    </NavigationContainer>
)

export const SignedOutStack =() => (
    <NavigationContainer> 
        <Stack.Navigator 
        initialRouteName ='LoginScreen' 
        screenOptions={screenOptions}>
            <Stack.Screen name= 'LoginScreen' component={LoginScreen} />
            <Stack.Screen name= 'SignupScreen' component={SignUpScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)



