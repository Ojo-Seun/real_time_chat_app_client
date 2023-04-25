import { memo, useState } from "react"
import styles from "../styles/OfflineUsers.module.css"
import ToggleArrow from "./ToggleArrow"
import UsersList from "./UsersLIst"
import useOfflineUsers from "../hooks/useOfflineUsers"

function OfflineUsers() {
  const [openList, setOpenList] = useState(true)
  const { filter } = useOfflineUsers()

  return (
    <div className={styles.usersWrapper}>
      <div className={styles.dropDownOpener}>
        <span>Offline Users</span>
        <ToggleArrow status={openList} handleClick={setOpenList} />
      </div>
      {openList && <UsersList BgColor="#5e647c" users={filter()} />}
    </div>
  )
}

export default OfflineUsers
