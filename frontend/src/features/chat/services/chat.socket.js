import {io} from "socket.io-client";

export function initializeSocketConnection() {
    const socket = io("http://localhost:8000", {
        withCredentials:true,
    });

    socket.on("connect", () => {
        console.log("Connected to Socket.IO server.");
    });
}

export default initializeSocketConnection;