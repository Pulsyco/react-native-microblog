// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbRu8bmm6TA8zmJ1JWCM_Rk19ep2fcpV4",
  authDomain: "react-native-microblog.firebaseapp.com",
  projectId: "react-native-microblog",
  storageBucket: "react-native-microblog.appspot.com",
  messagingSenderId: "852593052121",
  appId: "1:852593052121:web:e9a7c63bce76c0b1b571c8"
};

// Initialize Firebase
!firebase.apps.length ? 
firebase.initializeApp(firebaseConfig) : 
firebase.app()

const db = firebase.firestore();

export { firebase, db };