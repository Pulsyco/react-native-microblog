import { View, Text, TextInput, Image  } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Button, Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import {db,firebase} from '../../firebase'

const PLACEHOLDER_IMG='https://img.icons8.com/plasticine/100/image.png'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required(" a valid url is required "),
    caption: Yup.string().max(2200, 'Caption has reached the character limit')
})

const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl , setThumnailUrl ] = useState(PLACEHOLDER_IMG)
    const [currentLoggedUser, setCurrentLoggedUser] =useState(null)

const getUsername = () =>{

  const user = firebase.auth().currentUser
  const usnsubscribe = db.collection('users').where('owner_uid', '=', user.uid).limit(1).onSnapshot(
    snapshot => snapshot.docs.map(doc =>{
      setCurrentLoggedUser({
        username: doc.data().username,
        profilePicture: doc.data().profilePicture

      })
           
    })
  )
  return usnsubscribe
}

useEffect(()=>{
  getUsername() 
},[])

const uploadPosttoFirebase =(imageUrl ,caption)=>{
  const usnsubscribe = db.collection('users').doc(firebase.auth().currentUser.email)('post')
 .collection('post')
.add({
  imageUrl: imageUrl,
  user : currentLoggedUser.username,
  profilePicture: currentLoggedUser.profilePicture,
  owner_uid: firebase.auth().currentUser.uid,
  caption: caption,
  createAt: firebase.firebase.FieldValue.serverTimestamp(),
  likes: 0,
  like_by_user: [],
  comments: [],
}) 

}

  return (
    <Formik
        initialValues= {{caption : '', imageUrl:''}}
        onSubmit ={(values)=>{
          console.log(values)
          console.log('Your post was submitted successfully ')
          navigation.goBack()
        } }
        validationSchema= {uploadPostSchema}
        validateOnMount= {true}
        >
            {({handleBlur, handleChange, handleSubmit , values, errors, isValid })=>(
            <>
            <View style={{margin : 20, 
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>
            <Image source ={{uri : validUrl.isUri(thumbnailUrl)  ? thumbnailUrl : PLACEHOLDER_IMG }} style = {{width : 100, height : 100 }}/>
            <View style = {{flex: 1, marginLeft : 12 }}>
            <TextInput 
            style={{color: 'white',fontSize: 20 }}
            placeholder='Write a caption...'
            placeholderTextColor='gray'
            multiline={true}
            onChangeText={handleChange('caption')}
            onBlur={handleBlur('caption')}
            value={values.caption}
            />
            </View>
           
             </View>
             <Divider width={0.2} orientation='vertical'/>
             <TextInput 
             onChange={e => setThumnailUrl (e.nativeEvent.text)}
            style={{color: 'white',fontSize: 18 }}
            placeholder='Enter image url'
            placeholderTextColor='gray'
            onChangeText ={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}

             
             />
             {errors.imageUrl && (
                <Text style={{fontSize: 10 ,color: 'red'}}>
                    {errors.imageUrl}
                    </Text>

             )}
             <Button onPress ={handleSubmit} title ='Share' disabled ={!isValid}/>
            </>
            )}
    </Formik>
  )
}

export default FormikPostUploader