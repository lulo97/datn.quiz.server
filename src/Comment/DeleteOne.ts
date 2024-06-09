import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, Delete, FieldNull, NotFound } from "../MyResponse";
import { TABLE } from "./route";

function sql(CommentId: string) {
    return `DELETE FROM ${TABLE} WHERE CommentId = '${CommentId}'`;
}

export const DeleteOne = async (req: Request, res: Response) => {
    const { CommentId } = req.body;
    if (!CommentId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.query(
            "DELETE FROM UpvoteComment WHERE CommentId = ?",
            [CommentId]
        );
        await connection.query(
            "DELETE FROM DownvoteComment WHERE CommentId = ?",
            [CommentId]
        );
        await connection.query(
            "DELETE FROM Comment WHERE ParentCommentId = ?",
            [CommentId]
        );
        await connection.query("DELETE FROM Comment WHERE CommentId = ?", [
            CommentId,
        ]);
        await connection.commit();
        return res.status(Code.OK).json(Delete);
    } catch (error) {
        console.log(error);
        await connection.rollback();
        return res.status(Code.InternalServerError).json(CatchError(error));
    } finally {
        connection.release();
    }
};
