import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "@material-ui/core";

import { Button } from "../Button";

export const ChatList = ({ chats }) => {
  return (
    <List>
      {chats.map((chat) => (
        <ListItem key={chat.id}>
          <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
        </ListItem>
      ))}
      <Button>
        {() => <span style={{ fontWeight: "bold" }}>Add chat</span>}
      </Button>
    </List>
  );
};
