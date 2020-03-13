import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";
import db from "../firebase";

import Input from "./input";

export default function SimpleList() {
  const [checkBox, setCheckBox] = React.useState({});
  const [items, setItems] = React.useState([]);
  const [updateItem, setUpdateItem] = React.useState("");

  const handleChange = (id, title, done) => event => {
    if (!done) {
      setCheckBox({ ...checkBox, [id]: event.target.checked });
      db.collection("items")
        .doc(id)
        .set({ title: title, done: true });
      let ok = document.getElementById(id + "text");
      console.log("Ok: ", ok);
      ok.style.textDecoration = "line-through";
    }
    if (done) {
      setCheckBox({ ...checkBox, [id]: event.target.checked });
      db.collection("items")
        .doc(id)
        .set({ title: title, done: false });
      let ok = document.getElementById(id + "text");
      console.log("Ok: ", ok);
      ok.style.textDecoration = "";
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("items").onSnapshot(function(data) {
        console.log("Data: ", data);
        setItems(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
    };

    fetchData();
  }, []);

  function onDelete(id, done) {
    if (done) {
      document.getElementById(id + "text").style.textDecoration = "";
    }
    console.log("Delete Called: ", id);
    db.collection("items")
      .doc(id)
      .delete();
  }

  const onUpdate = (id, title) => {
    db.collection("items")
      .doc(id)
      .set({ title: title, done: false });
    this.editForm = <Input></Input>;
    this.setState({ showEdit: true });
  };
  /*
  const checkComplete = (items) => {
    for (item in items){
      if (item.done = false){

      }
    }
  }
  */

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        {items.map(item => (
          <ListItem
            button
            id={item.id}
            style={{
              width: "100%",
              backgroundColor: "",
              marginBottom: "0.5rem"
            }}
          >
            <Checkbox
              checked={item.done}
              onChange={handleChange(item.id, item.title, item.done)}
              color="primary"
            />
            <ListItemText id={item.id + "text"} primary={item.title} />
            <IconButton onClick={() => onUpdate(updateItem)}>
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            </IconButton>
            <IconButton onClick={() => onDelete(item.id, item.done)}>
              <Tooltip title="Delete">
                <DeleteIcon />
              </Tooltip>
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
