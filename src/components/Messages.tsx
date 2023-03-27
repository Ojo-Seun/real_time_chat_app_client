import React, { Fragment, useContext, useId } from "react";
import { MessageTypes } from "../utils/types";
import Message from "./Message";
import { Store } from "./StoreProvider";
import styles from "../styles/Messages.module.css";

interface Props {
  messages: MessageTypes[];
}

function Messages({ messages }: Props) {
  const {
    state: { userInfo },
  } = useContext(Store);

  return (
    <Fragment>
      {messages.length > 0 &&
        messages.map((message, index) => {
          return <Message key={index} message={message} />;
        })}
    </Fragment>
  );
}

export default Messages;
