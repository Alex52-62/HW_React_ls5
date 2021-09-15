import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Message } from "../Message";
import { AUTHORS } from "../../utils/constants";
import { Form } from "../Form";
import { ChatList } from "../ChatList";

const initialMessages = {
  "chat-1": [
    { text: "nnnn", author: "HUMAN", id: "mess-2" },
    { text: "nnnn", author: "HUMAN", id: "mess-1" },
  ],
  "chat-2": [],
};

const initialChats = [
  { name: "chat1", id: "chat-1" },
  { name: "Chat 2", id: "chat-2" },
];

function Chats() {
  const { chatId } = useParams();

  const [messages, setMessages] = useState(initialMessages);
  const [chats] = useState(initialChats);

  const sendMessage = useCallback(
    (message) => {
      setMessages((prevMess) => ({
        ...prevMess,
        [chatId]: [...prevMess[chatId], message],
      }));
    },
    [chatId]
  );

  useEffect(() => {
    let timeout;
    const curMess = messages[chatId];

    if (!!chatId && curMess?.[curMess.length - 1]?.author === AUTHORS.HUMAN) {
      timeout = setTimeout(() => {
        sendMessage({
          text: "I am bot",
          author: AUTHORS.bot,
          id: `mess-${Date.now()}`,
        });
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [messages, chatId, sendMessage]);

  const handleAddMessage = useCallback(
    (text) => {
      sendMessage({
        text,
        author: AUTHORS.HUMAN,
        id: `mess-${Date.now()}`,
      });
    },
    [sendMessage]
  );

  const checker = chats.map((key) => key.id === chatId);
  const checking = checker.indexOf(true) !== -1;

  return (
    <div className="App">
      <ChatList chats={chats} onAddChat />
      {!!chatId && checking && (
        <>
          {messages[chatId].map((message) => (
            <Message key={message.id} text={message.text} id={message.id} />
          ))}
          <Form onSubmit={handleAddMessage} />
        </>
      )}
    </div>
  );
}

export default Chats;
