import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import db from "../firebase";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();

  const [items, setItems] = React.useState([]);
  const [updateItem, setUpdateItem] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("items").onSnapshot(function(data) {
        console.log("Data: ", data);
        setItems(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
    };

    fetchData();
  }, []);

  function onDelete(id) {
    console.log("Delete Called: ", id);
    db.collection("items")
      .doc(id)
      .delete();
  }

  const onUpdate = id => {
    db.collection("items")
      .doc(id)
      .set({ title: updateItem });
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {items.map(item => (
          <ListItem id={item.id}>
            <ListItemText primary={item.title} />
            <IconButton onClick={() => onDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => onUpdate(item.id)}>
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
}
