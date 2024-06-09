import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, Delete, FieldNull, NotFound } from "../MyResponse";
import { TABLE } from "./route";

function sql(UpvoteCommentId: string) {
    return `DELETE FROM ${TABLE} WHERE UpvoteCommentId = '${UpvoteCommentId}'`;
}

export const DeleteOne = async (req: Request, res: Response) => {
    const { UpvoteCommentId } = req.body;
    if (!UpvoteCommentId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(UpvoteCommentId);
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
