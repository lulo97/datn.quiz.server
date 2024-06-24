import { RowDataPacket } from "mysql2";

export interface Admin {
    TotalUser: number;
    TotalQuiz: number;
    TotalQuestion: number;
}

export interface MySQLFunctionReturn extends RowDataPacket {
    data: Admin[];
}
