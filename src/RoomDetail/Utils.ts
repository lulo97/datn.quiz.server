import { RowDataPacket } from "mysql2";
import { Room, User } from "../InterfacesDatabase";
import { QuizDetail } from "../QuizDetail/Utils";

interface RoomDetail extends Omit<Room, "QuizId" | "UserId"> {
    Quiz: QuizDetail;
    User: User;
}

export interface MySQLFunctionReturn extends RowDataPacket {
    data: RoomDetail;
}
