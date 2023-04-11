import React, { useState, useEffect, useRef, useContext } from "react"
import styles from "../styles/Chat.module.css"
import Layout from "../components/Layout"
import SendIcon from "../components/SendIcon"
import Messages from "../components/Messages"
import { MessageTypes } from "../utils/types"
import { Store } from "../components/StoreProvider"
import { useNavigate } from "react-router-dom"
import socket from "../utils/socket"

function Chat() {
  const navigate = useNavigate()
  const [room, setRoom] = useState("General")
  const [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState<MessageTypes[]>([])
  const [usersInRoom, setUsersInRoom] = useState([])
  const [message, setmessage] = useState("")
  const messagesEndRef = useRef(null)

  const {
    state: { isConnected, userInfo },
    dispatch,
  } = useContext(Store)
  const { token, username, userId, image } = userInfo

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmessage(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const _message: MessageTypes = { sender: username, userId, image, content: message, to: room, createdAt: Date.now() }
    setMessages([...messages, _message])
    socket.emit("send_message", _message)
    setmessage("")
  }

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true })
    }

    if (!isConnected && token) {
      socket.auth = { token, userId }
      socket.connect()
    }
    const onConnet = () => {
      dispatch({ type: "CONNECTED", payload: true })
    }

    const onDisconnet = () => {
      dispatch({ type: "CONNECTED", payload: false })
    }

    socket.on("connect_error", (err) => {
      if (err.message === "Invalid Token" || err.message === "Please Sign Up") {
        localStorage.removeItem("userInfo")
        dispatch({ type: "SIGNIN", payload: {} })
      }
      console.log(err.message)
    })
    socket.emit("join_room", { username, userId, image, roomName: room })

    socket.on("connect", onConnet)
    socket.on("initial_room_messages", (messages) => {
      setMessages(messages)
    })

    socket.on("disconnect", onDisconnet)

    return () => {
      socket.off("connect", onConnet)
      socket.off("connect_error")
      socket.off("disconnect", onDisconnet)
    }
  }, [dispatch, isConnected, token, navigate, userId, image, username, room])

  useEffect(() => {
    socket.on("recieve_message", (message) => {
      setMessages([...messages, message])
    })

    return () => {
      socket.off("recieve_message", () => {
        setMessages([])
      })
    }
  }, [messages])

  // Layout Componnent Events
  useEffect(() => {
    socket.on("alert", (data) => {
      dispatch({ type: "ALERT", payload: data })
    })
    socket.on("all_users", (users) => {
      dispatch({ type: "ALL_USERS", payload: users })
    })

    socket.on("online_users", (users) => {
      dispatch({ type: "ONLINE_USERS", payload: users })
    })
    socket.on("all_rooms", (rooms) => {
      dispatch({ type: "ALL_ROOMS", payload: rooms })
    })

    socket.on("rooms_connected", (rooms) => {
      console.log(rooms)
      dispatch({ type: "ROOMS_CONNECTED", payload: rooms })
    })

    return () => {
      socket.off("alert", () => {
        dispatch({ type: "ALERT", payload: { message: "" } })
      })
      socket.off("all_users")
      socket.off("online_users")
      socket.off("all_rooms")
      socket.off("rooms_connected")
    }
  }, [dispatch])

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
  )
}

export default Chat
