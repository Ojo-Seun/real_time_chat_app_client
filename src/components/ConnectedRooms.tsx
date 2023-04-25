import React, { memo, useContext, useState } from "react"
import ToggleArrow from "./ToggleArrow"
import styles from "../styles/ConnectedRooms.module.css"
import RoomsList from "./RoomsList"
import { Store } from "./StoreProvider"

function ConnectedRooms() {
  const [openList, setOpenList] = useState(true)
  const { state } = useContext(Store)
  const { leaveAroom, roomsConnected, getRoomMessages } = state

  return (
    <div className={styles.roomsConneted}>
      <div className={styles.dropDownOpener}>
        <span>Connected Rooms</span>
        <ToggleArrow status={openList} handleClick={setOpenList} />
      </div>
      {openList && (
        <RoomsList disabled={false} getRoomMessages={getRoomMessages} handleClick={leaveAroom} rooms={roomsConnected}>
          Leave
        </RoomsList>
      )}
    </div>
  )
}

export default memo(ConnectedRooms)
