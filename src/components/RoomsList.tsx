import type { RoomTypes } from "../utils/types"
import styles from "../styles/RoomsList.module.css"
import HomeIcon from "../icons/homeIcon.png"

interface Props {
  rooms: RoomTypes[]
  children: string
}

function RoomsList({ rooms, children }: Props) {
  return (
    <ul className={styles.rooms}>
      {rooms.length > 0 &&
        rooms.map((room, index) => {
          return (
            <li key={room.roomId}>
              <div>
                <img src={HomeIcon} alt={`${room.name} pics`} width={16} height={16} />
                <span>{room.name}</span>
              </div>
              <button>{children}</button>
              <span className={styles.msgCounter}>{room.messages.length}</span>
            </li>
          )
        })}
    </ul>
  )
}

export default RoomsList
