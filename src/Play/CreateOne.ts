import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function formatVietnameseDatetime(timestamp: number) {
    const date = new Date(timestamp * 1000);

    // Format the date parts
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Format the time parts
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Combine to the desired format
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { PlayId, UserId, QuizId, RoomId, StartTime, SubmitTime, Score } =
        req.body;

    if (!UserId || !QuizId || !StartTime || !SubmitTime || !Score) {
        return res.status(Code.BadRequest).json(FieldNull);
    }

    const startTimeDatetime = formatVietnameseDatetime(StartTime);
    const submitTimeDatetime = formatVietnameseDatetime(SubmitTime);

    try {
        const sql_query = `
            INSERT INTO ${TABLE} 
            (PlayId, UserId, QuizId, RoomId, StartTime, SubmitTime, Score) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query<ResultSetHeader>(sql_query, [
            PlayId,
            UserId,
            QuizId,
            RoomId,
            startTimeDatetime,
            submitTimeDatetime,
            Score,
        ]);

        return res.status(Code.Created).json(Create);
    } catch (error) {
        console.error(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
