import { Fragment } from "react"
import { MessageTypes } from "../utils/types"
import Message from "./Message"

interface Props {
  messages: MessageTypes[]
}

function Messages({ messages }: Props) {
  return (
    <Fragment>
      {messages.length > 0 &&
        messages.map((message, index) => {
          return <Message key={index} message={message} />
        })}
    </Fragment>
  )
}

export default Messages
