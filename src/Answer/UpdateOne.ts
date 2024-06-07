import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, FieldNull, NotFound, Update } from "../MyResponse";
import { TABLE } from "./route";

function sql(
    AnswerId: string,
    QuestionId: string,
    Content: string,
    IsCorrect: boolean
) {
    return `UPDATE ${TABLE} SET QuestionId = '${QuestionId}', Content = '${Content}', IsCorrect = ${IsCorrect} WHERE AnswerId = '${AnswerId}'`;
}

export const UpdateOne = async (req: Request, res: Response) => {
    const { AnswerId, QuestionId, Content, IsCorrect } = req.body;
    if (!AnswerId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(AnswerId, QuestionId, Content, IsCorrect);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        if (result.affectedRows === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(Update);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
