const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBkjp89u6Owpg0qg206WwKp-4Eub-KtUy8",
  authDomain: "todo-app-c9360.firebaseapp.com",
  databaseURL: "https://todo-app-c9360.firebaseio.com",
  projectId: "todo-app-c9360",
  storageBucket: "todo-app-c9360.appspot.com",
  messagingSenderId: "767002154946",
  appId: "1:767002154946:web:c976f0027c19a35469685b"
};

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default db;
