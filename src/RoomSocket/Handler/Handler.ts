import { IRoomSocketData, PlayData, RoomDetail } from "../Interfaces";
import { User } from "../../InterfacesDatabase";

export function setRoom(data: IRoomSocketData, payload: RoomDetail) {
    if (!data.Room) {
        data.Room = payload;
        console.log("setRoom|", "Add room");
    } else {
        console.log("setRoom|", "Room already exist");
    }
}

export function addUser(data: IRoomSocketData, payload: User) {
    if (!data.Room) {
        console.log("addUser|", "Room null!");
        return;
    }
    const userExists = data.PlayDatas.some(
        (ele) => ele.User.UserId === payload.UserId
    );
    if (userExists) {
        console.log("addUser|", "User already join!");
        return;
    }
    data.PlayDatas.push({
        User: payload,
        QuestionIdx: 0,
        StartTime: Date.now(),
        EndTime: 0,
        RoomId: data.Room.RoomId,
        CurrentTime: Date.now(),
        Response: data.Room.Quiz.Questions.map((ele) => ({
            QuestionId: ele.QuestionId,
            SelectedAnswers: [],
        })),
    });
    console.log("addUser|", "A user join!");
}

export function setPlayData(data: IRoomSocketData, payload: PlayData) {
    data.PlayDatas.forEach((ele, index) => {
        if (ele.User.UserId === payload.User.UserId) {
            data.PlayDatas[index] = payload;
            console.log(
                "setPlayData|",
                "Update playdata for user = ",
                payload.User.Fullname
            );
        }
    });
}
