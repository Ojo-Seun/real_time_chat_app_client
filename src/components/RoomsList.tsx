import type { RoomTypes } from "../utils/types"
import styles from "../styles/RoomsList.module.css"
import HomeIcon from "../icons/homeIcon.png"
import { useContext } from "react"
import { Store } from "./StoreProvider"

interface Props {
  rooms: RoomTypes[]
  children: string
  handleClick: (roomName: string, userId: string) => void
}

function RoomsList({ rooms, children, handleClick }: Props) {
  const {
    state: { userInfo },
  } = useContext(Store)
  const { userId } = userInfo
  return (
    <ul className={styles.rooms}>
      {rooms.length > 0 &&
        rooms.map((room, index) => {
          return (
            <li key={room.roomId}>
              <div>
                <img src={HomeIcon} alt={`${room.name} pics`} width={16} height={16} />
                <span style={{ textTransform: "capitalize" }}>{room.name}</span>
              </div>
              <button onClick={() => handleClick(room.name, userId)}>{children}</button>
              <span className={styles.msgCounter}>{room.messages.length > 99 ? "99+" : room.messages.length}</span>
            </li>
          )
        })}
    </ul>
  )
}

export default RoomsList
