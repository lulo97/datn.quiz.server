import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Update } from "../MyResponse";
import { Code } from "../Code";
import { TABLE as QuestionTable } from "../Question/route";
import { TABLE as QuestionInfoTable } from "../QuestionInformation/route";
import { TABLE as AnswerTable } from "../Answer/route";

export const UpdateOne = async (req: Request, res: Response) => {
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

        // Update questions table
        const questionSql = `
            UPDATE ${QuestionTable} SET
                QuestionInformationId = ?,
                UserId = ?,
                TypeId = ?,
                SubSubjectId = ?,
                EducationLevelId = ?,
                DifficultLevelId = ?,
                LanguageId = ?,
                PointId = ?,
                PenaltyPointId = ?
            WHERE QuestionId = ?;`;
        const questionParams = [
            QuestionRecord.QuestionInformationId,
            QuestionRecord.UserId,
            QuestionRecord.TypeId,
            QuestionRecord.SubSubjectId,
            QuestionRecord.EducationLevelId,
            QuestionRecord.DifficultLevelId,
            QuestionRecord.LanguageId,
            QuestionRecord.PointId,
            QuestionRecord.PenaltyPointId,
            QuestionRecord.QuestionId,
        ];
        await connection.query<ResultSetHeader>(questionSql, questionParams);

        // Update question information table
        const questionInfoSql = `
            UPDATE ${QuestionInfoTable} SET
                Content = ?,
                ImageUrl = ?,
                AudioUrl = ?,
                Explanation = ?,
                CorrectUserCount = ?,
                IncorrectUserCount = ?,
                IsDeleted = ?,
                AllowPenalty = ?
            WHERE QuestionInformationId = ?;`;
        const questionInfoParams = [
            QuestionInfoRecord.Content,
            ImageUrl,
            AudioUrl,
            QuestionInfoRecord.Explanation,
            QuestionInfoRecord.CorrectUserCount,
            QuestionInfoRecord.IncorrectUserCount,
            QuestionInfoRecord.IsDeleted,
            QuestionInfoRecord.AllowPenalty,
            QuestionInfoRecord.QuestionInformationId,
        ];
        await connection.query<ResultSetHeader>(questionInfoSql, questionInfoParams);

        // Update answers table
        for (const answer of AnswerRecords) {
            const answerSql = `
                UPDATE ${AnswerTable} SET
                    Content = ?,
                    IsCorrect = ?
                WHERE AnswerId = ? AND QuestionId = ?;`;
            const answerParams = [
                answer.Content,
                answer.IsCorrect,
                answer.AnswerId,
                answer.QuestionId,
            ];
            await connection.query<ResultSetHeader>(answerSql, answerParams);
        }

        await connection.commit();

        return res.status(Code.OK).json(Update);
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    } finally {
        connection.release();
    }
};
