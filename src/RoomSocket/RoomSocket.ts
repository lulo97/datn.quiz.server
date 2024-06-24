import { Server as HTTPServer } from "http";
import { Server as HTTPSServer } from "https";
import { Server } from "socket.io";
import {
    ActionType,
    IRoomSocketData,
    PlayData,
    RoomDetail,
} from "./Interfaces";
import { User } from "../InterfacesDatabase";
import { setRoom, addUser, setPlayData } from "./Handler/Handler";

export const data: IRoomSocketData = {
    Room: null,
    PlayDatas: [],
};

export function setupSocketIO(server: HTTPServer | HTTPSServer) {
    const io = new Server(server, {
        cors: {
            origin: "*", // Adjust this for production
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        socket.on("disconnect", () => {});
        socket.on(ActionType.SetRoom, (payload: RoomDetail) => {
            setRoom(data, payload);
        });
        socket.on(ActionType.AddUser, (payload: User) => {
            addUser(data, payload);
        });
        socket.on("RequestRoomSocketData", () => {
            socket.emit("GetRoomSocketData", data);
        });
        socket.on("SetPlayData", (payload: PlayData) => {
            setPlayData(data, payload);
        });
    });

    return io;
}
