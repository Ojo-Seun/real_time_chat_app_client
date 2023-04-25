import { memo, useContext, useState } from "react"
import styles from "../styles/OnlineUsers.module.css"
import ToggleArrow from "./ToggleArrow"
import UsersList from "./UsersLIst"
import { Store } from "./StoreProvider"

function OnlineUsers() {
  const [openList, setOpenList] = useState(true)
  const { state } = useContext(Store)
  const { onlineUsers } = state
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
