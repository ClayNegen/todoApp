import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBp0DGok_TkfuAykIx94zT2uyY8FbpI9Qs",
  authDomain: "todo-app-dfdbd.firebaseapp.com",
  databaseURL: "https://todo-app-dfdbd.firebaseio.com",
  projectId: "todo-app-dfdbd",
  storageBucket: "todo-app-dfdbd.appspot.com",
  messagingSenderId: "105697886920",
  appId: "1:105697886920:web:75e943c847571e24df5bfd",
  measurementId: "G-E9LWL8L7KR"
};

firebase.initializeApp(config);

export default firebase;
