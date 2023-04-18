import { createContext, useReducer, Dispatch } from "react"
import type { OnlineUser, RoomTypes, UserTypes } from "../utils/types"

const initialValue: StateTypes = {
  userInfo: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")!) : {},
  isConnected: false,
  alert: { message: "" },
  allRooms: [],
  allUsers: [],
  roomsConnected: [],
  onlineUsers: [],
  joinAroom: (roomName: string, userId: string) => void {},
  leaveAroom: (roomName: string, userId: string) => void {},
}
export const Store = createContext({ state: initialValue, dispatch: {} as Dispatch<ActionTypes> })

interface ActionTypes {
  type: "SIGNIN" | "SIGNOUT" | "CONNECTED" | "ALERT" | "ALL_ROOMS" | "ALL_USERS" | "ONLINE_USERS" | "ROOMS_CONNECTED" | "JOIN_A_ROOM" | "LEAVE_A_ROOM"
  payload?: any
}

interface StateTypes {
  userInfo: UserTypes
  isConnected: boolean
  alert: { message: string }
  allRooms: RoomTypes[]
  roomsConnected: RoomTypes[]
  allUsers: UserTypes[]
  onlineUsers: OnlineUser[]
  joinAroom: (roomName: string, userId: string) => void
  leaveAroom: (roomName: string, userId: string) => void
}

interface Props {
  children: React.ReactNode
}

const reducer = (state: StateTypes, action: ActionTypes) => {
  switch (action.type) {
    case "SIGNIN":
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload))
      return { ...state, userInfo: action.payload }
    case "SIGNOUT":
      sessionStorage.removeItem("userInfo")
      return { ...state, userInfo: {} }
    case "CONNECTED":
      return { ...state, isConnected: action.payload }
    case "ALERT":
      return { ...state, alert: action.payload }
    case "ALL_ROOMS":
      return { ...state, allRooms: action.payload }
    case "ALL_USERS":
      return { ...state, allUsers: action.payload }
    case "ROOMS_CONNECTED":
      return { ...state, roomsConnected: action.payload }
    case "ONLINE_USERS":
      return { ...state, onlineUsers: action.payload }
    case "JOIN_A_ROOM":
      return { ...state, joinAroom: action.payload }
    case "LEAVE_A_ROOM":
      return { ...state, leaveAroom: action.payload }
    default:
      return state
  }
}

function StorageProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialValue)
  const values = { state, dispatch }

  return <Store.Provider value={values}>{children}</Store.Provider>
}

export default StorageProvider
