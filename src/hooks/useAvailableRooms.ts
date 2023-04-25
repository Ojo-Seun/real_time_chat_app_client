import { useContext } from "react"
import { Store } from "../components/StoreProvider"
import { RoomTypes } from "../utils/types"

function useAvailableRooms() {
  const { state } = useContext(Store)
  const { allRooms, roomsConnected } = state
  // Returns list of rooms that a user is not connectected to

  const filter = () => {
    let rooms: RoomTypes[] = []
    const set = new Set()
    for (let i = 0; i < roomsConnected.length; i++) {
      set.add(roomsConnected[i].roomId)
    }

    for (let j = 0; j < allRooms.length; j++) {
      const room = allRooms[j]
      if (!set.has(room.roomId)) {
        rooms.push(room)
      }
    }

    return rooms
  }

  return { filter }
}

export default useAvailableRooms
