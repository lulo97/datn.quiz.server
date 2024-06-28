import { Server as HTTPServer } from "http";
import { Server as HTTPSServer } from "https";
import { Server } from "socket.io";
import { Controller } from "./Controller";

export function setupSocketIO(server: HTTPServer | HTTPSServer) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        Controller(socket, io)
    });

    return io;
}
