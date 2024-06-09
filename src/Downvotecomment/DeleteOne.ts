import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, Delete, FieldNull, NotFound } from "../MyResponse";
import { TABLE } from "./route";

function sql(DownvoteCommentId: string) {
    return `DELETE FROM ${TABLE} WHERE DownvoteCommentId = '${DownvoteCommentId}'`;
}

export const DeleteOne = async (req: Request, res: Response) => {
    const { DownvoteCommentId } = req.body;
    if (!DownvoteCommentId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(DownvoteCommentId);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        if (result.affectedRows === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(Delete);
    } catch (error) {
        console.error(error);
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
