import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";
import { formatVietnameseDatetime } from "../Utils";

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
