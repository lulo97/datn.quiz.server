import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Message, RoomSocketData } from "./Interfaces";
import { pool } from "../Connect";
import { Room, SelectedAnswer, User, UserInRoom } from "../InterfacesDatabase";
import { MySQLFunctionReturn } from "../RoomDetail/Utils";
import {
    PlayInsert,
    UserInRoomInsert,
    calculateUserScore,
    handleInsertInto,
} from "./Utils";

type ISocket = Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
>;
type Iio = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

async function getRoom(RoomId: string) {
    const sql_query = `SELECT getOneRoomDetail('${RoomId}') as data;`;
    const [rows] = await pool.query<MySQLFunctionReturn[]>(sql_query);
    if (rows.length === 0) {
        return null;
    }
    return rows[0].data;
}

let rooms: RoomSocketData[] = [];

rooms.push();

export async function Controller(socket: ISocket, io: Iio) {
    socket.emit("SEND_MONITOR", rooms);

    socket.on("GET_MONITOR", (data) => {
        socket.emit("SEND_MONITOR", rooms);
    });

    socket.on("CREATE_ROOM", async (data) => {
        const { RoomId } = data;
        if (!RoomId) {
            console.log("CREATE_ROOM", "Field null");
            return;
        }
        const RoomRecord = await getRoom(RoomId);
        if (!RoomRecord) {
            console.log("CREATE_ROOM", "Can't get record!");
            return;
        }
        const RoomExist = rooms.some(
            (ele) => ele.Room.RoomId == RoomRecord.RoomId
        );
        if (RoomExist) {
            console.log("CREATE_ROOM", "Can't add room that exist");
            return;
        }
        rooms.push({
            Room: RoomRecord,
            UserDatas: [],
            Messages: [],
        });
        io.emit("SEND_MONITOR", rooms);
    });

    socket.on("JOIN_ROOM", (data: { RoomId: string; CurrentUser: User }) => {
        const { RoomId, CurrentUser } = data;
        if (!RoomId || !CurrentUser) {
            console.log("JOIN_ROOM", "Field null");
            return;
        }
        const room = rooms.find((ele) => ele.Room.RoomId === RoomId);
        if (!room) {
            console.log("JOIN_ROOM", "Can't join room that does not exist");
            return;
        }
        const isUserInRoom = room.UserDatas.some(
            (ele) => ele.User.UserId == CurrentUser.UserId
        );
        if (isUserInRoom) {
            console.log("JOIN_ROOM", "Can't rejoin a room");
            return;
        }
        room.UserDatas.push({
            User: CurrentUser,
            StartTimeJoin: Date.now(),
            EndTimeJoin: -1,
        });
        const messageExist = room.Messages.some(
            (ele) => ele.UserId == CurrentUser.UserId
        );
        const InitialResponse = room.Room.Quiz.Questions.map((ele) => ({
            QuestionId: ele.QuestionId,
            SelectedAnswers: [],
        }));
        if (!messageExist) {
            const message: Message = {
                UserId: CurrentUser.UserId,
                RoomId: RoomId,
                QuestionIdx: 0,
                Response: InitialResponse,
                StartTimePlay: -1,
                EndTimePlay: -1,
            };
            room.Messages.push(message);
        } else {
            console.log("JOIN_ROOM", "Message already exist");
        }

        //Still need join room in socket.io when already have own room data type
        //Room is a list of string, join() is dynamically create room if not exist
        socket.join(RoomId);
        io.emit("SEND_MONITOR", rooms);
    });

    socket.on("REQUEST_MESSAGE_CLIENT_TO_SERVER", (data) => {
        const { RoomId, UserId } = data;
        if (!RoomId || !UserId) {
            console.log("REQUEST_MESSAGE_CLIENT_TO_SERVER", "Field null");
            return;
        }
        const room = rooms.find((ele) => ele.Room.RoomId === data.RoomId);
        if (!room) {
            console.log(
                "REQUEST_MESSAGE_CLIENT_TO_SERVER",
                "Can't send message to room that does not exist"
            );
            return;
        }
        const isUserInRoom = room.UserDatas.some(
            (ele) => ele.User.UserId == data.UserId
        );
        if (!isUserInRoom) {
            console.log(
                "REQUEST_MESSAGE_CLIENT_TO_SERVER",
                "User not in room so user can't send message"
            );
            return;
        }
        // Find the current message of the user
        const messageIdx = room.Messages.findIndex(
            (ele) => ele.UserId === data.UserId
        );
        if (messageIdx == -1) {
            console.log(
                "REQUEST_MESSAGE_CLIENT_TO_SERVER",
                "User message not initialized"
            );
            return;
        }
        socket.emit("SEND_MESSAGE_SERVER_TO_CLIENT", room.Messages[messageIdx]);
    });

    socket.on("SEND_MESSAGE_CLIENT_TO_SERVER", (data: Message) => {
        if (!data) {
            console.log("SEND_MESSAGE_CLIENT_TO_SERVER", "Field null");
            return;
        }
        const room = rooms.find((ele) => ele.Room.RoomId === data.RoomId);
        if (!room) {
            console.log(
                "SEND_MESSAGE_CLIENT_TO_SERVER",
                "Can't send message to room that does not exist"
            );
            return;
        }
        const isUserInRoom = room.UserDatas.some(
            (ele) => ele.User.UserId == data.UserId
        );
        if (!isUserInRoom) {
            console.log(
                "SEND_MESSAGE_CLIENT_TO_SERVER",
                "User not in room so user can't send message"
            );
            return;
        }
        // Find the current message of the user
        const messageIdx = room.Messages.findIndex(
            (ele) => ele.UserId === data.UserId
        );
        if (messageIdx == -1) {
            console.log(
                "SEND_MESSAGE_CLIENT_TO_SERVER",
                "User message not initialized"
            );
            return;
        }

        const StartTimePlay =
            data.StartTimePlay == -1 ? Date.now() : data.StartTimePlay;

        // Update the current message with data received
        room.Messages[messageIdx] = {
            ...room.Messages[messageIdx],
            StartTimePlay: StartTimePlay,
            QuestionIdx: data.QuestionIdx,
            Response: data.Response,
            EndTimePlay: data.EndTimePlay,
        };

        const userdataIdx = room.UserDatas.findIndex(
            (ele) => ele.User.UserId === data.UserId
        );
        room.UserDatas[userdataIdx] = {
            ...room.UserDatas[userdataIdx],
            EndTimeJoin: data.EndTimePlay,
        };
        // Emit updated rooms to all clients
        io.emit("SEND_MONITOR", rooms);
    });

    socket.on("END_ROOM", async (data) => {
        const { RoomId } = data;
        if (!RoomId) {
            console.log("END_ROOM", "Field null");
            return;
        }
        const room = rooms.find((ele) => ele.Room.RoomId == RoomId);
        if (!room) {
            console.log("END_ROOM", "Room not exist");
            return;
        }
        const UserInRoomRecords = [];
        const PlayRecords = [];
        const SelectedAnswerRecords2D = [];
        const Length = room.UserDatas.length;

        const QuizId = room.Room.Quiz.QuizId;
        for (let i = 0; i < Length; i++) {
            const UserId = room.UserDatas[i].User.UserId;
            const PlayId = getUUID();
            const StartTimeJoin = room.UserDatas[i].StartTimeJoin;
            const EndTimeJoin = room.UserDatas[i].EndTimeJoin;
            const StartTimePlay = room.Messages[i].StartTimePlay;
            const EndTimePlay = room.Messages[i].EndTimePlay;

            const SelectedAnswers = room.Messages[i].Response.map(
                (ele) => ele.SelectedAnswers
            ).flat();
            const SelectedAnswersWithPlayId = SelectedAnswers.map((ele) => ({
                AnswerId: ele,
                PlayId: PlayId,
            }));

            const Score = calculateUserScore(
                room,
                room.UserDatas[i].User.UserId
            );
            const UserInRoomRecord: UserInRoomInsert = {
                UserId: UserId,
                RoomId: RoomId,
                StartTime: StartTimeJoin,
                EndTime: EndTimeJoin,
                TotalQuestionViewed: room.Room.Quiz.Questions.length,
                CurrentQuestionIndex: room.Messages[i].QuestionIdx,
                CurrentScore: Score,
            };
            const PlayRecord: PlayInsert = {
                PlayId: PlayId,
                UserId: UserId,
                QuizId: QuizId,
                RoomId: RoomId,
                StartTime: StartTimePlay,
                SubmitTime: EndTimePlay,
                Score: Score,
            };

            SelectedAnswerRecords2D.push(SelectedAnswersWithPlayId);
            UserInRoomRecords.push(UserInRoomRecord);
            PlayRecords.push(PlayRecord);
        }
        const result = await handleInsertInto(
            UserInRoomRecords,
            PlayRecords,
            SelectedAnswerRecords2D.flat()
        );

        io.emit("END_ROOM_SERVER_TO_CLIENT", result);
        console.log(result, "emit to END_ROOM_SERVER_TO_CLIENT");
    });
}

export function getUUID() {
    var d = new Date().getTime(); //Timestamp
    var d2 =
        (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1000) ||
        0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = Math.random() * 16; //random number between 0 and 16
            if (d > 0) {
                //Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                //Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
}
