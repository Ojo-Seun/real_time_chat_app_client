import { useContext, memo } from "react"
import { Store } from "./StoreProvider"
import styles from "../styles/CurrentRoomUsers.module.css"
import useIsOnline from "../hooks/useIsOnline"
import useGetUserImage from "../hooks/useGetUserImage"

interface Props {
  roomName: string
}

function CurrentRoomUsers({ roomName }: Props) {
  const { state } = useContext(Store)
  const { userInfo, allRooms } = state
  const { isOnline } = useIsOnline()
  const { getImg } = useGetUserImage()
  const { userId } = userInfo

  // Find targeted room
  const room = allRooms.find((x) => x.name === roomName)
  // Remove this user from list of users to display
  const users = room ? room.users.filter((user) => user.userId !== userId) : []
  console.log("Current room users")

  return (
    <>
      {users?.length! > 0 && (
        <ul className={styles.room_users}>
          {users?.map((user, index) => {
            return (
              <li key={user.userId}>
                <img src={getImg(user.imageName)} alt={user.username} width={60} height={60} />
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

export default CurrentRoomUsers
