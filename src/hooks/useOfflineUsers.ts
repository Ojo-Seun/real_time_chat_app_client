import { useContext } from "react"
import { UserTypes } from "../utils/types"
import { Store } from "../components/StoreProvider"

function useOfflineUsers() {
  const { state } = useContext(Store)
  const { allUsers, onlineUsers } = state

  const filter = () => {
    const users: UserTypes[] = []
    const set = new Set()
    for (let i = 0; i < onlineUsers.length; i++) {
      set.add(onlineUsers[i].userId)
    }

    for (let j = 0; j < allUsers.length; j++) {
      const user = allUsers[j]
      if (!set.has(user.userId)) {
        users.push(user)
      }
    }

    return [...users]
  }

  return { filter }
}

export default useOfflineUsers
