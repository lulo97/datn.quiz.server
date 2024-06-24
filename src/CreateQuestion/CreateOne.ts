import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create } from "../MyResponse";
import { Code } from "../Code";
import { TABLE as QuestionTable } from "../Question/route";
import { TABLE as QuestionInfoTable } from "../QuestionInformation/route";
import { TABLE as AnswerTable } from "../Answer/route";

export const CreateOne = async (req: Request, res: Response) => {
    const {
        QuestionRecord,
        QuestionInfoRecord,
        AnswerRecords,
        ImageUrl = "",
        AudioUrl = "",
    } = req.body;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Insert into questions table
        const questionSql = `
            INSERT INTO ${QuestionTable} (
                QuestionId,
                QuestionInformationId,
                UserId,
                TypeId,
                SubSubjectId,
                EducationLevelId,
                DifficultLevelId,
                LanguageId,
                PointId,
                PenaltyPointId
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const questionParams = [
            QuestionRecord.QuestionId,
            QuestionRecord.QuestionInformationId,
            QuestionRecord.UserId,
            QuestionRecord.TypeId,
            QuestionRecord.SubSubjectId,
            QuestionRecord.EducationLevelId,
            QuestionRecord.DifficultLevelId,
            QuestionRecord.LanguageId,
            QuestionRecord.PointId,
            QuestionRecord.PenaltyPointId,
        ];
        await connection.query<ResultSetHeader>(questionSql, questionParams);

        // Insert into question information table
        const questionInfoSql = `
            INSERT INTO ${QuestionInfoTable} (
                QuestionInformationId,
                Content,
                ImageUrl,
                AudioUrl,
                Explanation,
                CorrectUserCount,
                IncorrectUserCount,
                IsDeleted,
                AllowPenalty
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const questionInfoParams = [
            QuestionInfoRecord.QuestionInformationId,
            QuestionInfoRecord.Content,
            ImageUrl,
            AudioUrl,
            QuestionInfoRecord.Explanation,
            QuestionInfoRecord.CorrectUserCount,
            QuestionInfoRecord.IncorrectUserCount,
            QuestionInfoRecord.IsDeleted,
            QuestionInfoRecord.AllowPenalty,
        ];
        await connection.query<ResultSetHeader>(
            questionInfoSql,
            questionInfoParams
        );

        // Insert into answers table
        for (const answer of AnswerRecords) {
            const answerSql = `
                INSERT INTO ${AnswerTable} (AnswerId, QuestionId, Content, IsCorrect)
                VALUES (?, ?, ?, ?);`;
            const answerParams = [
                answer.AnswerId,
                answer.QuestionId,
                answer.Content,
                answer.IsCorrect,
            ];
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
