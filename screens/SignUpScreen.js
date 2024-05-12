import { View, Text, StyleSheet ,Image} from 'react-native'
import React from 'react'
import SignUpForm from '../components/signupScreen/SignUpForm'


const INSTAGRAM_LOGO='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4cqbxxyfaz1E_aQqhiRcIETnCqVSEjGz5TEMksdQc7w&s'
const SignUpScreen = ({navigation }) => 
 (
    <View style ={styles.container}>
    <View style={styles.logoContainer}>
        <Image source ={{uri : INSTAGRAM_LOGO, height: 100 , width : 200}}/>
    </View>
    <SignUpForm navigation={navigation} />
    </View>
  )

  const styles= StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingHorizontal:12,
    },
    logoContainer:{
        alignItems: 'center',
        marginTop: 60,

    }
  })


export default SignUpScreen