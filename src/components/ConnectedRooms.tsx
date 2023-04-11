import React, { memo, useEffect, useState } from "react"
import ToggleArrow from "./ToggleArrow"
import styles from "../styles/ConnectedRooms.module.css"
import RoomsList from "./RoomsList"
import { RoomTypes } from "../utils/types"

interface Props {
  connectedRooms: RoomTypes[]
}

function ConnectedRooms({ connectedRooms }: Props) {
  const [openList, setOpenList] = useState(true)

  return (
    <div className={styles.roomsConneted}>
      <div className={styles.dropDownOpener}>
        <span>Connected Rooms</span>
        <ToggleArrow status={openList} handleClick={setOpenList} />
      </div>
      {openList && <RoomsList rooms={connectedRooms}>Leave</RoomsList>}
    </div>
  )
}

export default memo(ConnectedRooms)
