import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(
    ParentCommentId: string,
    QuizId: string,
    CreateUserId: string,
    Content: string
) {
    return `INSERT INTO ${TABLE} (ParentCommentId, QuizId, CreateUserId, Content) VALUES ('${ParentCommentId}', '${QuizId}','${CreateUserId}','${Content}')`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { ParentCommentId, QuizId, CreateUserId, Content } = req.body;
    if (!CreateUserId || !Content) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(ParentCommentId, QuizId, CreateUserId, Content);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        return res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
