import { RowDataPacket } from "mysql2";
import { Play, SelectedAnswer } from "../InterfacesDatabase";
import { QuizDetail } from "../QuizDetail/Utils";

export interface PlayDetail extends Play {
    Quiz: QuizDetail,
    SelectedAnswer: SelectedAnswer[]
}

export interface MySQLFunctionReturn extends RowDataPacket {
    data: PlayDetail[];
}