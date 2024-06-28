import { User } from "../InterfacesDatabase";
import { RoomDetail } from "../RoomDetail/Utils";

export interface UserData {
    User: User;
    StartTimeJoin: number;
    EndTimeJoin: number;
}

export interface RoomSocketData {
    Room: RoomDetail;
    UserDatas: UserData[];
    Messages: Message[];
}

export interface Response {
    QuestionId: string;
    SelectedAnswers: string[];
}

export interface Message {
    UserId: string;
    RoomId: string;
    QuestionIdx: number;
    Response: Response[];
    StartTimePlay: number;
    EndTimePlay: number;  
}
