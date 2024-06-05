import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, FieldNull, NotFound, Update } from "../MyResponse";
import { TABLE } from "./route";

export const UpdateOne = async (req: Request, res: Response) => {
    const { QuizQuestionId, QuizId, QuestionId } = req.body;

    if (!QuizQuestionId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }

    const sql = `
        UPDATE ${TABLE} 
        SET 
            QuizId = ?, 
            QuestionId = ?
        WHERE 
            QuizQuestionId = ?`;

    const params = [QuizId, QuestionId, QuizQuestionId];

    try {
        const [result] = await pool.query<ResultSetHeader>(sql, params);
        if (result.affectedRows === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(Update);
    } catch (error) {
        console.error(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
