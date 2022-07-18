// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// import {getFirestore} from "firebase/firestore"
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsen-U4M4eaXm5qos9cUjeAqLR1abU-K4",
  authDomain: "portfolio-monitor-ef4bf.firebaseapp.com",
  projectId: "portfolio-monitor-ef4bf",
  storageBucket: "portfolio-monitor-ef4bf.appspot.com",
  messagingSenderId: "1065896378631",
  appId: "1:1065896378631:web:a70de959aff22e76f305a2",
  databaseURL: 'https://portfolio-monitor-ef4bf-default-rtdb.europe-west1.firebasedatabase.app/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const database = getDatabase(app);



