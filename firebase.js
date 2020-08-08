import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAIbJZWbezVX40mqN3ikCRvb5b4s4ZAgQc",
  authDomain: "stocks-1b665.firebaseapp.com",
  databaseURL: "https://stocks-1b665.firebaseio.com",
  projectId: "stocks-1b665",
  storageBucket: "stocks-1b665.appspot.com",
  messagingSenderId: "591063709398",
  appId: "1:591063709398:web:cefa80b343f90837e97b77",
  measurementId: "G-1LDZ93L33S",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.firestore();

export const getBalance = () => {};
