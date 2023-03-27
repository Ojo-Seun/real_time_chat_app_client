import { io, Socket } from "socket.io-client";
import type { ClientToServer, ServerToClient } from "./types";

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:5000";

let socket: Socket<ServerToClient, ClientToServer> = io(URL!, { autoConnect: false });

export default socket;
