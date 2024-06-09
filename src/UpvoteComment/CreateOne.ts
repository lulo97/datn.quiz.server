import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(CommentId: string, UserId: string) {
    return `INSERT INTO ${TABLE} (CommentId, UserId) VALUES ('${CommentId}', '${UserId}')`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { CommentId, UserId } = req.body;
    if (!CommentId || !UserId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(CommentId, UserId);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        return res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
