interface UserTypes {
  username: string
  email: string
  roomsConnected: string[]
  userId: string
  sessionId: string
  token: string
  image: string
}

type OnlineUser = Omit<UserTypes, "roomNames">

interface MessageTypes {
  sender: string
  userId: string
  to: string
  content: string
  createdAt: number
  image: string
}

interface RoomTypes {
  roomId: string
  name: string
  description?: string
  userId: string
  users: User[]
  messages: Message[]
}

interface ServerToClient {
  alert: ({ message: string }) => void
  recieve_message: (message: MessageTypes) => void
  all_users: (allUsers: Pick<UserTypes, "image", "username", "userId">[]) => void
  online_users: (users: OnlineUser[]) => void
  all_rooms: (allRooms: any[]) => void
  rooms_connected: (roomsConnected: any[]) => void
  initial_room_messages: (messages: MessageTypes[]) => void
}

interface ClientToServer {
  join_room: ({ username: string, userId: string, image: string, roomName: string }) => void
  disconnected: (obj: { userId: string; username: string }) => void
  send_message: (message: MessageTypes) => void
}

export { UserTypes, MessageTypes, RoomTypes, ServerToClient, ClientToServer, OnlineUser, ClientAndServerEvents }
