import { useContext, useState } from "react"
import ToggleArrow from "./ToggleArrow"
import styles from "../styles/AvailableRooms.module.css"
import { RoomTypes } from "../utils/types"
import RoomsList from "./RoomsList"
import { Store } from "./StoreProvider"
import useAvailableRooms from "../hooks/useAvailableRooms"

function AvailableRooms() {
  const { state, dispatch } = useContext(Store)
  const { joinAroom, getRoomMessages } = state
  const [openList, setOpenList] = useState(true)
  const { filter } = useAvailableRooms()

  return (
    <div className={styles.allAvailableRooms}>
      <div className={styles.dropDownOpener}>
        <span>Available Rooms</span>
        <ToggleArrow status={openList} handleClick={setOpenList} />
      </div>
      {openList && (
        <RoomsList disabled={true} getRoomMessages={getRoomMessages} handleClick={joinAroom} rooms={filter()}>
          Join
        </RoomsList>
      )}
    </div>
  )
}

export default AvailableRooms
