import { useContext, memo } from "react"
import type { OnlineUser, UserTypes } from "../utils/types"
import { Store } from "./StoreProvider"
import styles from "../styles/UsersList.module.css"
import { motion, AnimatePresence } from "framer-motion"
import useGetUserImage from "../hooks/useGetUserImage"

interface Props {
  users: Partial<UserTypes>[] | OnlineUser[]
  BgColor: string
}

const Variant = {
  initial: { opacity: 0, transform: "scale(0.5)" },
  animate: { opacity: 1, transform: "scale(1)", transition: { duration: 0.5 } },
  exit: { opacity: 0, transform: "scale(0.5)" },
}

function UsersList({ users, BgColor }: Props) {
  const { state } = useContext(Store)
  const { userInfo } = state
  const { getImg } = useGetUserImage()

  users = users.filter((x) => x.userId !== userInfo.userId)

  return (
    <AnimatePresence>
      <motion.ul variants={Variant} initial="initial" animate="animate" exit="exit" className={styles.users}>
        {users.length > 0 &&
          users.map((user, index) => {
            return (
              <li key={user.userId} style={{ backgroundColor: BgColor }}>
                <div>
                  <img src={getImg(user.imageName!)} alt={`${user.username} pics`} width={40} height={40} />
                  <span>{user.username}</span>
                </div>
                <button>Message</button>
              </li>
            )
          })}
      </motion.ul>
    </AnimatePresence>
  )
}

export default memo(UsersList)
