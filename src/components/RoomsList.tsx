import type { RoomTypes } from "../utils/types"
import styles from "../styles/RoomsList.module.css"
import HomeIcon from "../icons/homeIcon.png"
import { useContext } from "react"
import { Store } from "./StoreProvider"

interface Props {
  rooms: RoomTypes[]
  children: string
  handleClick: (roomName: string, userId: string) => void
  getRoomMessages: (roomName: string) => void
  disabled: boolean
}
function RoomsList({ rooms, children, handleClick, disabled, getRoomMessages }: Props) {
  const {
    state: { userInfo },
  } = useContext(Store)
  const { userId } = userInfo

  console.log("roomlist")

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
              <div id={styles.chats}>
                <button disabled={disabled} onClick={() => getRoomMessages(room.name)} type="button">
                  Chats
                </button>
                <span className={styles.msgCounter}>{room.messages.length > 99 ? "99+" : room.messages.length}</span>
              </div>
              <button id={styles.btn1} onClick={() => handleClick(room.name, userId)}>
                {children}
              </button>
            </li>
          )
        })}
    </ul>
  )
}

export default RoomsList
