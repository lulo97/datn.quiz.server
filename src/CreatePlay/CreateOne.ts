import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE as PlayTable } from "../Play/route";
import { TABLE as SelectedAnswerTable } from "../SelectedAnswer/route";
import { formatVietnameseDatetime } from "../Utils";

export const CreateOne = async (req: Request, res: Response) => {
    const { PlayRecordInsert, SelectedAnswersInsert } = req.body;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { PlayId, UserId, QuizId, RoomId, StartTime, SubmitTime, Score } =
            PlayRecordInsert;

        const startTimeDatetime = formatVietnameseDatetime(StartTime);
        const submitTimeDatetime = formatVietnameseDatetime(SubmitTime);

        const sql_query = `
        INSERT INTO ${PlayTable}
        (PlayId, UserId, QuizId, RoomId, StartTime, SubmitTime, Score) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
        await pool.query<ResultSetHeader>(sql_query, [
            PlayId,
            UserId,
            QuizId,
            RoomId,
            startTimeDatetime,
            submitTimeDatetime,
            Score,
        ]);

        for (const answer of SelectedAnswersInsert) {
            const answerSql = `INSERT INTO ${SelectedAnswerTable} (PlayId, AnswerId) VALUES (?, ?)`;
            const answerParams = [answer.PlayId, answer.AnswerId];
            await connection.query<ResultSetHeader>(answerSql, answerParams);
        }

        await connection.commit();

        return res.status(Code.Created).json(Create);
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    } finally {
        connection.release();
    }
};
