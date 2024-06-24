import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";
import { formatVietnameseDatetime } from "../Utils";

interface RoomRecord {
    RoomId: string;
    QuizId: string;
    UserId: string;
    Name: string;
    StartTime: number;
    StartQuizTime: number;
    EndTime: number;
    Capacity: number;
    Password: string | null;
}

function sql(
    RoomId: string,
    QuizId: string,
    UserId: string,
    Name: string,
    StartTime: string,
    StartQuizTime: string,
    EndTime: string,
    Capacity: number,
    Password: string | null
) {
    // Use template literals to insert parameters into the SQL query
    return `
        INSERT INTO ${TABLE} 
        (RoomId, QuizId, UserId, Name, StartTime, StartQuizTime, EndTime, Capacity, Password) 
        VALUES 
        ('${RoomId}', '${QuizId}', '${UserId}', '${Name}', '${StartTime}', '${StartQuizTime}', '${EndTime}', '${Capacity}', ${
        Password ? `'${Password}'` : "NULL"
    })
    `;
}

export const CreateOne = async (req: Request, res: Response) => {
    const {
        RoomId,
        QuizId,
        UserId,
        Name,
        StartTime,
        StartQuizTime,
        EndTime,
        Capacity,
        Password,
    }: RoomRecord = req.body;
    if (
        !RoomId ||
        !QuizId ||
        !UserId ||
        !Name ||
        !StartTime ||
        !StartQuizTime ||
        !EndTime ||
        !Capacity
    ) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const StartTimeDatetime = formatVietnameseDatetime(
            Math.trunc(StartTime / 1000)
        );
        const StartQuizTimeDatetime = formatVietnameseDatetime(
            Math.trunc(StartQuizTime / 1000)
        );
        const EndTimeDatetime = formatVietnameseDatetime(
            Math.trunc(EndTime / 1000)
        );
        const sql_query = sql(
            RoomId,
            QuizId,
            UserId,
            Name,
            StartTimeDatetime,
            StartQuizTimeDatetime,
            EndTimeDatetime,
            Capacity,
            Password
        );
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        return res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
