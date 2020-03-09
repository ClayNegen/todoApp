import React from "react";
import { Component } from "react";
import "./App.css";

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

//Add Data
db.collection("items")
  .add({
    title: "Finally"
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });

//Read Data
db.collection("items")
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data().title}`);
    });
  });

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Hello"
    };
  }

  componentDidMount() {
    /*
    const rootRef = db
      .database()
      .ref()
      .child("list");
    console.log("DB Ref: ", rootRef);
    const titleRef = rootRef.child("title");
    console.log("Title: ", titleRef);
    titleRef.on("value", data => {
      this.setState({
        title: data.val()
      });
    });
    */
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
      </div>
    );
  }
}

export default App;
