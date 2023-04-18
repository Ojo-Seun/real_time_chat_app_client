import React, { useState, useEffect, useRef, useContext } from "react"
import styles from "../styles/Chat.module.css"
import Layout from "../components/Layout"
import SendIcon from "../components/SendIcon"
import Messages from "../components/Messages"
import { MessageTypes, UserTypes } from "../utils/types"
import { Store } from "../components/StoreProvider"
import { useNavigate } from "react-router-dom"
import socket from "../utils/socket"
import CurrentRoomUsers from "../components/CurrentRoomUsers"
import validateInput from "../utils/validateInput"
import WelcomeNote from "../components/WelcomeNote"

function Chat() {
  const navigate = useNavigate()
  const [roomName, setRoomName] = useState("general")
  const [messages, setMessages] = useState<MessageTypes[]>([])
  const [message, setmessage] = useState("")
  const messagesEndRef = useRef(null)

  const {
    state: { isConnected, userInfo, roomsConnected },
    dispatch,
  } = useContext(Store)
  const { token, username, userId, image } = userInfo

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmessage(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateInput("message", message)) return
    const _message: MessageTypes = { sender: username, userId, image, content: message, to: roomName, createdAt: Date.now() }
    setMessages([...messages, _message])
    socket.emit("send_message", _message)
    setmessage("")
  }

  // Check if user is login
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true })
    }
  }, [navigate, token])

  // Make connection
  useEffect(() => {
    console.log("connection")
    socket.auth = { token, userId }
    socket.connect()
  }, [token, userId])

  useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "Invalid Token" || err.message === "Please Sign Up") {
        dispatch({ type: "SIGNOUT" })
      }
      console.log(err.message)
    })

    return () => {
      socket.off("connect_error")
    }
  }, [dispatch])

  useEffect(() => {
    socket.emit("join_server", { username, userId, image })
  }, [image, username, userId])

  // Connection status
  useEffect(() => {
    const onConnet = () => {
      dispatch({ type: "CONNECTED", payload: socket.connected })
    }

    const onDisconnet = () => {
      dispatch({ type: "CONNECTED", payload: socket.connected })
    }
    socket.on("connect", onConnet)

    socket.on("disconnect", onDisconnet)

    return () => {
      socket.off("connect", onConnet)

      socket.off("disconnect", onDisconnet)
    }
  }, [dispatch])

  // Layout Componnent Events
  useEffect(() => {
    socket.on("alert", (data) => {
      dispatch({ type: "ALERT", payload: data })
    })
    // Return list of all users
    socket.on("all_users", (users) => {
      dispatch({ type: "ALL_USERS", payload: users })
    })

    // Return list of online users
    socket.on("online_users", (users) => {
      dispatch({ type: "ONLINE_USERS", payload: users })
    })

    // Return list of all rooms
    socket.on("all_rooms", (rooms) => {
      dispatch({ type: "ALL_ROOMS", payload: rooms })
    })

    // Return list of the rooms a user is connected to
    socket.on("rooms_connected", (rooms) => {
      dispatch({ type: "ROOMS_CONNECTED", payload: rooms })
    })

    socket.on("room_info", (room) => {
      setMessages(room.messages)
    })
    return () => {
      socket.off("alert", () => {
        dispatch({ type: "ALERT", payload: { message: "" } })
      })
      socket.off("all_users")
      socket.off("online_users")
      socket.off("all_rooms")
      socket.off("rooms_connected")
      socket.off("room_info")
      socket.off("alert")
    }
  }, [dispatch])

  // EventHandlers for grand children
  useEffect(() => {
    const joinAroom = (roomName: string, userId: string) => {
      setRoomName(roomName)
      socket.emit("join_room", { roomName, userId })
    }

    const leaveAroom = (roomName: string, userId: string) => {
      socket.emit("leave_room", { roomName, userId })
    }

    dispatch({ type: "JOIN_A_ROOM", payload: joinAroom })
    dispatch({ type: "LEAVE_A_ROOM", payload: leaveAroom })
  }, [image, userId, username, dispatch])

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

  return (
    <Layout>
      {roomsConnected.length > 0 ? (
        <div className={styles.chat}>
          <div className={styles.roomUsers}>
            <CurrentRoomUsers roomName={roomName} />
          </div>
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
      ) : (
        <WelcomeNote />
      )}
    </Layout>
  )
}

export default Chat
