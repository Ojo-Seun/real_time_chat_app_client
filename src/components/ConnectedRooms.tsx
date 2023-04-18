import React, { memo, useContext, useEffect, useState } from "react"
import ToggleArrow from "./ToggleArrow"
import styles from "../styles/ConnectedRooms.module.css"
import RoomsList from "./RoomsList"
import { RoomTypes } from "../utils/types"
import { Store } from "./StoreProvider"

function ConnectedRooms() {
  const [openList, setOpenList] = useState(true)
  const { state, dispatch } = useContext(Store)
  const { leaveAroom, roomsConnected } = state

  return (
    <div className={styles.roomsConneted}>
      <div className={styles.dropDownOpener}>
        <span>Connected Rooms</span>
        <ToggleArrow status={openList} handleClick={setOpenList} />
      </div>
      {openList && (
        <RoomsList handleClick={leaveAroom} rooms={roomsConnected}>
          Leave
        </RoomsList>
      )}
    </div>
  )
}

export default memo(ConnectedRooms)
