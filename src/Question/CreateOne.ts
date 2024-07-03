import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create } from "../MyResponse";
import { Code } from "../Code";

const questionSql = `
    INSERT INTO Question (
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
;

const questionInfoSql = `
    INSERT INTO QuestionInformation (
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

const answerSql = `
    INSERT INTO Answer (AnswerId, QuestionId, Content, IsCorrect)
    VALUES (?, ?, ?, ?);`
;

export const CreateOne = async (req: Request, res: Response) => {
    //console.log("Received request body:", req.body);
    const {
        QuestionRecord,
        QuestionInfoRecord,
        AnswerRecords,
        ImageUrl = "",
        AudioUrl = "",
    } = req.body;

    const connection = await pool.getConnection();
    //console.log("Database connection established");

    try {
        await connection.beginTransaction();
        //console.log("Transaction started");

        // Insert into questions table
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
        //console.log("Question parameters:", questionParams);
        await connection.query<ResultSetHeader>(questionSql, questionParams);
        //console.log("Question record inserted");

        // Insert into question information table
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
        //console.log("Question information parameters:", questionInfoParams);
        await connection.query<ResultSetHeader>(
            questionInfoSql,
            questionInfoParams
        );
        //console.log("Question information record inserted");

        // Insert into answers table
        for (const answer of AnswerRecords) {
            const answerParams = [
                answer.AnswerId,
                answer.QuestionId,
                answer.Content,
                answer.IsCorrect,
            ];
            //console.log("Answer parameters:", answerParams);
            await connection.query<ResultSetHeader>(answerSql, answerParams);
            //console.log("Answer record inserted");
        }

        await connection.commit();
        //console.log("Transaction committed");

        return res.status(Code.Created).json(Create);
    } catch (error) {
        await connection.rollback();
        //console.log("Transaction rolled back due to error:", error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    } finally {
        connection.release();
        //console.log("Database connection released");
    }
};
