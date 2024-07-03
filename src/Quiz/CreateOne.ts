import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";

const QuizTable = "Quiz";
const QuizInfoTable = "QuizInformation";
const QuizQuestionTable = "QuizQuestion";

const quizSql = `
    INSERT INTO ${QuizTable} (
        QuizId,
        QuizInformationId,
        UserId,
        SubjectId,
        EducationLevelId,
        TimeId
    ) VALUES (?, ?, ?, ?, ?, ?);`;

const quizInfoSql = `
    INSERT INTO ${QuizInfoTable} (
        QuizInformationId,
        Name,
        Description,
        ImageUrl,
        Attempts,
        IsPublic,
        IsDeleted,
        UserVertify,
        VerifiedAt
    ) VALUES (?, ?, ?, ?, 0, ?, false, NULL, NULL);`;

const quizQuestionSql = `
    INSERT INTO ${QuizQuestionTable} ( QuizQuestionId, QuizId, QuestionId ) VALUES (?, ?, ?);
`;

export const CreateOne = async (req: Request, res: Response) => {
    const {
        QuizRecord,
        QuizInfoRecord,
        QuizQuestionRecords,
        ImageUrl = "",
    } = req.body;
    if (!QuizRecord || !QuizInfoRecord || !QuizQuestionRecords) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const quizParams = [
            QuizRecord.QuizId,
            QuizRecord.QuizInformationId,
            QuizRecord.UserId,
            QuizRecord.SubjectId,
            QuizRecord.EducationLevelId,
            QuizRecord.TimeId,
        ];
        await connection.query<ResultSetHeader>(quizSql, quizParams);

        const quizInfoParams = [
            QuizInfoRecord.QuizInformationId,
            QuizInfoRecord.Name,
            QuizInfoRecord.Description,
            ImageUrl,
            QuizInfoRecord.IsPublic,
        ];
        await connection.query<ResultSetHeader>(quizInfoSql, quizInfoParams);

        for (const quizquestion of QuizQuestionRecords) {
            const quizQuestionParams = [
                quizquestion.QuizQuestionId,
                quizquestion.QuizId,
                quizquestion.QuestionId,
            ];
            await connection.query<ResultSetHeader>(
                quizQuestionSql,
                quizQuestionParams
            );
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
