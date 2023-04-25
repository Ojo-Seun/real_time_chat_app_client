import React, { useState, useEffect, useContext } from "react"
import styles from "../styles/Chat.module.css"
import Layout from "../components/Layout"
import SendIcon from "../components/SendIcon"
import Messages from "../components/Messages"
import { MessageTypes } from "../utils/types"
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
  const { state, dispatch } = useContext(Store)
  const { isConnected, userInfo, roomsConnected } = state
  const { token, username, userId, imageName } = userInfo

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmessage(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateInput("message", message)) return
    const _message: MessageTypes = { sender: username, userId, imageName, content: message, to: roomName, createdAt: Date.now() }
    setMessages([...messages, _message])
    socket.emit("message", _message)
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
    socket.auth = { token, userId, username }
    socket.connect()
  }, [token, userId, username])

  useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "Invalid Token" || err.message === "Please Sign Up") {
        dispatch({ type: "SIGN_OUT" })
      }
      console.log(err.message)
    })

    return () => {
      socket.off("connect_error")
    }
  }, [dispatch])

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

  useEffect(() => {
    const timer = setTimeout(() => {
      socket.emit("join_server", { username, userId, imageName }, (roomsConnected, allUsersImages) => {
        dispatch({ type: "ADD_IMGS", payload: allUsersImages })
        dispatch({ type: "ROOMS_CONNECTED", payload: roomsConnected })
      })
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [imageName, username, userId, dispatch])

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

    // Return all the rooms the user is
    socket.on("rooms_connected", (rooms) => {
      dispatch({ type: "ROOMS_CONNECTED", payload: rooms })
    })

    // Last user the joined the room
    socket.on("newUserImage", (e) => {
      console.log(e)
      dispatch({ type: "ADD_IMG", payload: e })
    })
    return () => {
      socket.off("alert", () => {
        dispatch({ type: "ALERT", payload: { message: "" } })
      })
      socket.off("all_users")
      socket.off("online_users")
      socket.off("all_rooms")
      socket.off("rooms_connected")
      socket.off("newUserImage")
    }
  }, [dispatch])

  // EventHandlers for grand children
  useEffect(() => {
    const joinAroom = (roomName: string, userId: string) => {
      setRoomName(roomName)
      socket.emit("join_room", { roomName, userId }, (room, roomsConnected) => {
        setMessages(room.messages)
        dispatch({ type: "ROOMS_CONNECTED", payload: roomsConnected })
      })
    }

    const leaveAroom = (roomName: string, userId: string) => {
      socket.emit("leave_room", { roomName, userId }, (roomsConnected) => {
        dispatch({ type: "ROOMS_CONNECTED", payload: roomsConnected })
      })
    }

    const getRoomMessages = (roomName: string) => {
      socket.emit("room_messages", roomName)
    }

    const handleSignOut = () => {
      dispatch({ type: "SIGN_OUT" })
      socket.disconnect()
    }

    dispatch({ type: "JOIN_A_ROOM", payload: joinAroom })
    dispatch({ type: "LEAVE_A_ROOM", payload: leaveAroom })
    dispatch({ type: "ROOM_CHATS", payload: getRoomMessages })
    dispatch({ type: "HANDLE_SIGN_OUT", payload: handleSignOut })
  }, [userId, username, dispatch])

  useEffect(() => {
    socket.on("initial_room_messages", (messages) => {
      setMessages(messages)
    })

    socket.on("message", (message) => {
      setMessages([...messages, message])
    })

    return () => {
      socket.off("initial_room_messages")
      socket.off("message")
    }
  }, [messages])

  return (
    <Layout>
      {roomsConnected.length > 0 ? (
        <div className={styles.chat}>
          <div className={styles.roomUsers}>
            <CurrentRoomUsers roomName={roomName} />
          </div>
          <>
            <Messages messages={messages} />
          </>
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
