import { useContext } from "react"
import { Store } from "../components/StoreProvider"

function useIsOnline() {
  const { state } = useContext(Store)
  const { onlineUsers } = state
  const isOnline = (userId: string) => {
    for (let i = 0; i < onlineUsers.length; i++) {
      const user = onlineUsers[i]
      if (user.userId === userId) {
        return true
      }
    }
    return false
  }
  return { isOnline }
}

export default useIsOnline
