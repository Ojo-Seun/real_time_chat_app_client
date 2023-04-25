import React, { memo, useContext, useEffect, useState } from "react"
import { MessageTypes } from "../utils/types"
import styles from "../styles/Message.module.css"
import { Store } from "./StoreProvider"
import useDate from "../hooks/useDate"
import useGetUserImage from "../hooks/useGetUserImage"

interface Props {
  message: Omit<MessageTypes, "to">
}

function Message({ message }: Props) {
  const { state } = useContext(Store)
  const { userInfo } = state
  const { userId, image } = userInfo
  const { createdAt } = message
  const { setDate, setTime } = useDate(createdAt)
  const { getImg } = useGetUserImage()

  return (
    <div className={styles.message}>
      <div className={styles.date}>{setDate()}</div>
      <span className={`${styles.wrapper1} ${userId === message.userId ? styles.yourMessage : styles.othersMessage}`}>
        <img className={styles.img} src={message.userId === userId ? image : getImg(message.imageName)} width={40} height={40} alt={`${message.sender} pics`} />
        <span className={styles.wrapper2}>
          <span className={styles.sender}>{userId === message.userId ? "You" : message.sender}</span>
          <span className={styles.content}>{message.content}</span>
          <span className={styles.time}>{setTime()}</span>
        </span>
      </span>
    </div>
  )
}

export default memo(Message)
