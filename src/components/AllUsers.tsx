import React, { useContext, useState, memo } from "react"
import styles from "../styles/AllUsers.module.css"
import { UserTypes } from "../utils/types"
import ToggleArrow from "./ToggleArrow"
import UsersList from "./UsersLIst"

interface Props {
  allUsers: Partial<UserTypes>[]
}

function AllUsers({ allUsers }: Props) {
  const [openList, setOpenList] = useState(true)

  return (
    <div className={styles.usersWrapper}>
      <div className={styles.dropDownOpener}>
        <span>All Users</span>
        <ToggleArrow status={openList} handleClick={setOpenList} />
      </div>
      {openList && <UsersList BgColor="#5e647c" users={allUsers} />}
    </div>
  )
}

export default memo(AllUsers)
