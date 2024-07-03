import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create } from "../MyResponse";
import { Code } from "../Code";
import { formatVietnameseDatetime } from "../Utils";

const PlayTable = "Play";
const SelectedAnswerTable = "SelectedAnswer";
const QuizInformationTable = "QuizInformation";
const QuestionInformationTable = "QuestionInformation"

export const CreateOne = async (req: Request, res: Response) => {
    const { PlayRecordInsert, SelectedAnswersInsert, MetricUserCount } = req.body;
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

        // Update the attempts in QuizInformation
        const quizInfoSql = `
            UPDATE ${QuizInformationTable}
            SET Attempts = Attempts + 1
            WHERE QuizInformationId = (
                SELECT QuizInformationId
                FROM ${PlayTable}
                WHERE PlayId = ?
            )
        `;
        await connection.query<ResultSetHeader>(quizInfoSql, [PlayId]);

        // Update CorrectUserCount and IncorrectUserCount for each QuestionInformation
        for (const metric of MetricUserCount) {
            const { QuestionId, CorrectUserCount, IncorrectUserCount } = metric;

            const questionInfoSql = `
                UPDATE ${QuestionInformationTable} qi
                JOIN Question q ON qi.QuestionInformationId = q.QuestionInformationId
                SET qi.CorrectUserCount = qi.CorrectUserCount + ?,
                    qi.IncorrectUserCount = qi.IncorrectUserCount + ?
                WHERE q.QuestionId = ?
            `;
            await connection.query<ResultSetHeader>(questionInfoSql, [
                CorrectUserCount,
                IncorrectUserCount,
                QuestionId,
            ]);
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
