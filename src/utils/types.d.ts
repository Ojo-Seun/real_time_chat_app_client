interface UserTypes {
  username: string
  email: string
  roomsConnected: string[]
  userId: string
  token: string
  imageName: string
  image?: string
  name: string
}

type OnlineUser = Omit<UserTypes, "roomNames">

interface MessageTypes {
  sender: string
  userId: string
  to: string
  content: string
  createdAt: number
  imageName: string
}

interface RoomTypes {
  roomId: string
  name: string
  description?: string
  userId: string
  users: User[]
  messages: Message[]
}

interface UserStartUpData {
  roomsConnected: Pick<RoomTypes, "messages" | "name" | "roomId" | "users">[]
  allRooms: Pick<RoomTypes, "messages" | "name" | "roomId" | "users">[]
  allUsers: Pick<UserTypes, "imageName", "username", "userId">[]
  onlineUsers: OnlineUser[]
}

interface ServerToClient {
  alert: ({ message: string }) => void
  all_users: (allUsers: Pick<UserTypes, "image", "username", "userId">[]) => void
  online_users: (users: OnlineUser[]) => void
  all_rooms: (allRooms: Pick<RoomTypes, "messages" | "name" | "roomId" | "users">[]) => void
  rooms_connected: (roomsConnected: Omit<RoomTypes, "logo">[]) => void
  initial_room_messages: (messages: MessageTypes[]) => void
  message: (message: MessageTypes) => void
  newUserImage: (e: { [key: string]: string }) => void
}

interface ClientToServer {
  join_room: (
    { userId: string, roomName: string },
    cb: (room: Pick<RoomTypes, "messages" | "name" | "roomId" | "users">, roomsConnected: Pick<RoomTypes, "messages" | "name" | "roomId" | "users">[]) => void
  ) => void
  leave_room: ({ userId: string, roomName: string }, cb: (roomsConnected: Pick<RoomTypes, "messages" | "name" | "roomId" | "users">[]) => void) => void
  message: (message: MessageTypes) => void
  join_server: (
    { username: string, userId: string, imageName: string },
    cb: (roomsConnected: Pick<RoomTypes, "messages" | "name" | "roomId" | "users">[], allUsersImages: { [imageName: string]: string }[]) => void
  ) => void
  room_messages: (roomName: string) => void
  user_image: (imageName: string, cb: ({ image: string }) => void) => void
}

export { UserTypes, MessageTypes, RoomTypes, ServerToClient, ClientToServer, OnlineUser }
