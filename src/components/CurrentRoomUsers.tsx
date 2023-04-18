import { useContext, memo } from "react"
import { Store } from "./StoreProvider"
import styles from "../styles/CurrentRoomUsers.module.css"
import useIsOnline from "../hooks/useIsOnline"

interface Props {
  roomName: string
}

function CurrentRoomUsers({ roomName }: Props) {
  const { state } = useContext(Store)
  const {
    userInfo: { userId },
    roomsConnected,
  } = state
  const { isOnline } = useIsOnline()
  // Find targeted room
  const room = roomsConnected.find((x) => x.name === roomName)
  // Remove user from list of users to display
  const users = room ? room.users.filter((user) => user.userId !== userId) : []

  return (
    <>
      {users?.length! > 0 && (
        <ul className={styles.room_users}>
          {users?.map((user, index) => {
            return (
              <li key={user.userId}>
                <img src={user.image} alt={user.username} width={60} height={60} />
                <span id={styles.wrapper}>
                  {isOnline(user.userId) ? <span id={styles.online}>Online</span> : <span id={styles.offline}>Offline</span>}

                  <span id={styles.username}>{user.username}</span>
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default memo(CurrentRoomUsers)
