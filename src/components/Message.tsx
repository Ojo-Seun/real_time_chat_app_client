import React, { useContext, useEffect, useState } from "react";
import { MessageTypes } from "../utils/types";
import styles from "../styles/Message.module.css";
import { Store } from "./StoreProvider";

interface Props {
  message: Omit<MessageTypes, "to">;
}

function Message({ message }: Props) {
  const { createdAt } = message;
  const {
    state: {
      userInfo: { userId },
    },
  } = useContext(Store);

  const setDate = () => {
    const min = 1000 * 60;
    const hour = min * 60;
    const currentDate = Date.now();
    const createdDate = new Date(createdAt);
    const diff = currentDate - createdAt;
    let _date = "";

    if (diff < hour) {
      const _min = `${Math.floor(diff / min)}min ago`;
      _date = _min;
    } else if (diff >= hour && diff <= hour * 12) {
      const _hour = `${Math.floor(diff / hour)}h ago`;
      _date = _hour;
    } else if (diff > hour * 12 && diff < hour * 24) {
      _date = "Today";
    } else if (diff >= hour * 24 && diff <= hour * 48) {
      _date = "Yestaday";
    } else {
      _date = createdDate.toDateString();
    }

    return _date;
  };

  const setTime = () => {
    const createdDate = new Date(createdAt);
    const time = `${createdDate.getHours()}:${createdDate.getMinutes()}`;
    return time;
  };

  return (
    <div className={styles.message}>
      <div className={styles.date}>{setDate()}</div>
      <span className={`${styles.wrapper1} ${userId === message.userId ? styles.yourMessage : styles.othersMessage}`}>
        <img className={styles.img} src={message.image} width={40} height={40} alt={`${message.sender} pics`} />
        <span className={styles.wrapper2}>
          <span className={styles.sender}>{userId === message.userId ? "You" : message.sender}</span>
          <span className={styles.content}>{message.content}</span>
          <span className={styles.time}>{setTime()}</span>
        </span>
      </span>
    </div>
  );
}

export default Message;
