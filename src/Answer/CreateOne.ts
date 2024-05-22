import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(
    AnswerId: string,
    QuestionId: string,
    Content: string,
    IsCorrect: boolean
) {
    return `INSERT INTO ${TABLE} (AnswerId, QuestionId, Content, IsCorrect) VALUES ('${AnswerId}', '${QuestionId}', '${Content}', ${IsCorrect})`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { AnswerId, QuestionId, Content, IsCorrect } = req.body;
    if (!AnswerId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(AnswerId, QuestionId, Content, IsCorrect);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
