import React, { useState } from "react"
import styles from "../styles/OnlineUsers.module.css"
import ToggleArrow from "./ToggleArrow"
import { UserTypes } from "../utils/types"
import UsersList from "./UsersLIst"

interface Props {
  onlineUsers: UserTypes[]
}

function OnlineUsers({ onlineUsers }: Props) {
  const [openList, setOpenList] = useState(true)
  return (
    <div className={styles.online_users}>
      <div className={styles.dropDownOpener}>
        <span>Online Users</span>
        <ToggleArrow status={openList} handleClick={setOpenList} />
      </div>
      {openList && <UsersList BgColor="#161d34" users={onlineUsers} />}
    </div>
  )
}

export default OnlineUsers
