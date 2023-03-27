import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "../styles/Chat.module.css";
import Layout from "../components/Layout";
import SendIcon from "../components/SendIcon";
import Messages from "../components/Messages";
import { MessageTypes } from "../utils/types";
import { motion } from "framer-motion";
import { RouteVariant } from "./Home";
import { Store } from "../components/StoreProvider";
import { useNavigate } from "react-router-dom";
import socket from "../utils/socket";

function Chat() {
  const navigate = useNavigate();
  const [room, setRoom] = useState("General");
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [message, setmessage] = useState("");
  const messagesEndRef = useRef(null);

  const {
    state: { isConnected, userInfo },
    dispatch,
  } = useContext(Store);
  const { token, email, username, userId, image } = userInfo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _message: MessageTypes = { sender: username, userId, image, content: message, to: room, createdAt: Date.now() };
    setMessages([...messages, _message]);
    socket.emit("send_message", _message);
    setmessage("");
  };

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }

    const onConnet = () => {
      dispatch({ type: "CONNECTED", payload: true });
    };

    const onDisconnet = () => {
      dispatch({ type: "CONNECTED", payload: false });
    };

    if (!isConnected) {
      if (token) {
        socket.auth = { token };
      }
      socket.connect();
    }

    socket.on("connect_error", (err) => {
      if (err.message === "Invalid Token") {
        localStorage.removeItem("userInfo");
        dispatch({ type: "SIGNIN", payload: {} });
        navigate("/", { replace: true });
      }
      console.log(err.message);
    });

    socket.on("connect", onConnet);

    socket.on("disconnect", onDisconnet);

    socket.on("alert", (data) => {
      dispatch({ type: "ALERT", payload: data });
    });

    return () => {
      socket.off("alert", () => {
        dispatch({ type: "ALERT", payload: { message: "" } });
      });
      socket.off("connect", onConnet);
      socket.off("connect_error");
      socket.off("disconnect", onDisconnet);
    };
  }, [dispatch, isConnected, token, navigate]);

  useEffect(() => {
    socket.emit("join_room", { username: username, roomName: room });

    socket.on("recieve_message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off("recieve_message", () => {
        setMessages([]);
      });
    };
  }, [username, email, messages, room]);

  return (
    <Layout>
      <div className={styles.chat}>
        <div className={styles.messages}>
          <Messages messages={messages} />
        </div>
        <form onSubmit={handleSubmit} className={styles.inputWrapper}>
          <input className={styles.messageInput} autoFocus={true} onChange={handleChange} type="text" placeholder="Message" value={message} name="message" />
          <button id={styles.sendBtn} disabled={!isConnected} type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Chat;
