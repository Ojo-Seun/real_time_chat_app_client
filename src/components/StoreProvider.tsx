import { createContext, useReducer, Dispatch } from "react"
import type { OnlineUser, RoomTypes, UserTypes } from "../utils/types"

const initialValue: StateTypes = {
  userInfo: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")!) : {},
  isConnected: false,
  alert: { message: "" },
  allRooms: [],
  allUsers: [],
  onlineUsers: [],
  roomsConnected: [],
  joinAroom: (roomName: string, userId: string) => void {},
  leaveAroom: (roomName: string, userId: string) => void {},
  getRoomMessages: (roomName: string) => void {},
  imageStorage: [],
  handleSignOut: () => void {},
}
export const Store = createContext({ state: initialValue, dispatch: {} as Dispatch<ActionTypes> })

interface ActionTypes {
  type:
    | "SIGN_IN"
    | "SIGN_OUT"
    | "HANDLE_SIGN_OUT"
    | "CONNECTED"
    | "ALERT"
    | "ALL_USERS"
    | "ALL_ROOMS"
    | "ONLINE_USERS"
    | "ROOMS_CONNECTED"
    | "JOIN_A_ROOM"
    | "LEAVE_A_ROOM"
    | "ROOM_CHATS"
    | "ADD_IMG"
    | "ADD_IMGS"
  payload?: any
}

interface StateTypes {
  userInfo: UserTypes
  isConnected: boolean
  alert: { message: string }
  roomsConnected: RoomTypes[]
  allUsers: UserTypes[]
  allRooms: RoomTypes[]
  onlineUsers: OnlineUser[]
  joinAroom: (roomName: string, userId: string) => void
  leaveAroom: (roomName: string, userId: string) => void
  getRoomMessages: (roomName: string) => void
  imageStorage: { [key: string]: string }[]
  handleSignOut: () => void
}

interface Props {
  children: React.ReactNode
}

const reducer = (state: StateTypes, action: ActionTypes) => {
  switch (action.type) {
    case "SIGN_IN":
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload))
      return { ...state, userInfo: action.payload }
    case "SIGN_OUT":
      sessionStorage.removeItem("userInfo")
      return { ...state, userInfo: {} }
    case "HANDLE_SIGN_OUT":
      return { ...state, handleSignOut: action.payload }
    case "CONNECTED":
      return { ...state, isConnected: action.payload }
    case "ALERT":
      return { ...state, alert: action.payload }
    case "ROOMS_CONNECTED":
      return { ...state, roomsConnected: action.payload }
    case "ALL_USERS":
      return { ...state, allUsers: action.payload }
    case "ALL_ROOMS":
      return { ...state, allRooms: action.payload }
    case "ONLINE_USERS":
      return { ...state, onlineUsers: action.payload }
    case "JOIN_A_ROOM":
      return { ...state, joinAroom: action.payload }
    case "LEAVE_A_ROOM":
      return { ...state, leaveAroom: action.payload }
    case "ROOM_CHATS":
      return { ...state, getRoomMessages: action.payload }
    case "ADD_IMG":
      let images = state.imageStorage
      const imageName = Object.keys(action.payload)[0]
      const isExist = images.find((image) => image.imageName === imageName)
      if (isExist === undefined) {
        images.push(action.payload)
      }
      return { ...state, imageStorage: images }
    case "ADD_IMGS":
      return { ...state, imageStorage: action.payload }
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
