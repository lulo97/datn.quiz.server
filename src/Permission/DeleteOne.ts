import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, Delete, FieldNull, NotFound } from "../MyResponse";
import { TABLE } from "./route";

function sql(PermissionId: string) {
    return `DELETE FROM ${TABLE} WHERE PermissionId = '${PermissionId}'`;
}

export const DeleteOne = async (req: Request, res: Response) => {
    const { PermissionId } = req.body;
    if (!PermissionId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(PermissionId);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        if (result.affectedRows === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(Delete);
    } catch (error) {
        console.error(error);
        console.log(error)
res.status(Code.InternalServerError).json(CatchError(error));
    }
};