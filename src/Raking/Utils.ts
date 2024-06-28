import { RowDataPacket } from "mysql2";
import { Play, SelectedAnswer, Room, UserInRoom, User } from "../InterfacesDatabase";
import { QuizDetail } from "../QuizDetail/Utils";

interface PlayWithSelectedAnswer extends Play {
    SelectedAnswers: SelectedAnswer[]
}

interface UserInRoomWhenUser extends Omit<UserInRoom, "UserId"> {
    User: User
}

export interface Ranking {
    Room: Room,
    Quiz: QuizDetail,
    UsersInRooms: UserInRoomWhenUser[],
    Plays: PlayWithSelectedAnswer[]
}

export interface MySQLFunctionReturn extends RowDataPacket {
    data: Ranking;
}
