import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyA3tfH4biJUFzkuu8pXepEy3bbDBHGSau8",
  authDomain: "receipes-da029.firebaseapp.com",
  databaseURL: "https://receipes-da029.firebaseio.com",
  projectId: "receipes-da029",
  storageBucket: "receipes-da029.appspot.com",
  messagingSenderId: "873638184989",
  appId: "1:873638184989:web:a3ea5ce3857cce543b5ef4",
  measurementId: "G-HYFLESXYHD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
let firebaseAuth = firebaseApp.auth();
let realTimeDb = firebaseApp.database();

export { firebaseApp, firebaseAuth,db,realTimeDb };
