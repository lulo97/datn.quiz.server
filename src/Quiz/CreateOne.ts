import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

export const CreateOne = async (req: Request, res: Response) => {
    const {
        QuizId,
        QuizInformationId,
        UserId,
        SubjectId,
        EducationLevelId,
        TimeId
    } = req.body;

    if (!QuizId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }

    try {
        const sql = `
            INSERT INTO ${TABLE} (
                QuizId,
                QuizInformationId,
                UserId,
                SubjectId,
                EducationLevelId,
                TimeId
            ) VALUES (?, ?, ?, ?, ?, ?);`;

        const params = [
            QuizId,
            QuizInformationId,
            UserId,
            SubjectId,
            EducationLevelId,
            TimeId
        ];

        const [result] = await pool.query<ResultSetHeader>(sql, params);
        res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
