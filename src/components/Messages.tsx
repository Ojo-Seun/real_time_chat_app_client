import { MessageTypes } from "../utils/types"
import Message from "./Message"
import styles from "../styles/Messages.module.css"
import { useEffect, useRef } from "react"

interface Props {
  messages: MessageTypes[]
}

function Messages({ messages }: Props) {
  const messageRef = useRef(null)

  useEffect(() => {
    const lastChild = messageRef.current as unknown as HTMLDivElement
    if (lastChild) {
      lastChild.scrollIntoView()
    }
  }, [messages.length])
  return (
    <div className={styles.messages}>
      {messages.length > 0 &&
        messages.map((message, index) => {
          return (
            <div ref={messageRef} key={index}>
              <Message message={message} />
            </div>
          )
        })}
    </div>
  )
}

export default Messages
