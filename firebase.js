// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_Tum8MtvAEPkr0FJbpE_LnzNdGXwmk30",
  authDomain: "rn-shop-41c20.firebaseapp.com",
  databaseURL: "https://rn-shop-41c20-default-rtdb.firebaseio.com",
  projectId: "rn-shop-41c20",
  storageBucket: "rn-shop-41c20.appspot.com",
  messagingSenderId: "814447266952",
  appId: "1:814447266952:web:648ef77a56691f75de633d",
  measurementId: "G-25VZK4KKB3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
