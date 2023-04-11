import { useEffect, useState } from "react"
import ToggleArrow from "./ToggleArrow"
import styles from "../styles/AllRooms.module.css"
import { RoomTypes } from "../utils/types"
import RoomsList from "./RoomsList"

interface Props {
  allRooms: RoomTypes[]
}

function AllRooms({ allRooms }: Props) {
  const [openList, setOpenList] = useState(true)

  return (
    <div className={styles.allRooms}>
      <div className={styles.dropDownOpener}>
        <span>All Rooms</span>
        <ToggleArrow status={openList} handleClick={setOpenList} />
      </div>
      {openList && <RoomsList rooms={allRooms}>Join</RoomsList>}
    </div>
  )
}

export default AllRooms
