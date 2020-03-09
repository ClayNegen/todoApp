import React from "react";
import "./App.css";
import ItemList from "./components/itemList";
import Input from "./components/input";

function App() {
  return (
    <div className="App">
      <Input></Input>
      <ItemList></ItemList>
    </div>
  );
}

export default App;
