// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs9M8ucD7rXKrTHhMX9a9K4YcY9tiIIm0",
  authDomain: "simple-note-c36da.firebaseapp.com",
  projectId: "simple-note-c36da",
  storageBucket: "simple-note-c36da.appspot.com",
  messagingSenderId: "327818804928",
  appId: "1:327818804928:web:1455947bf24e067e747725",
  measurementId: "G-94B19S507J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
