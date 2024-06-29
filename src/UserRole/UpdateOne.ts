import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, FieldNull, NotFound, Update } from "../MyResponse";
import { TABLE } from "./route";

function sql(UserId: string, RoleId: string) {
    return `UPDATE ${TABLE} SET RoleId = '${RoleId}' WHERE UserId = '${UserId}'`;
}

export const UpdateOne = async (req: Request, res: Response) => {
    const { UserId, RoleId } = req.body;
    if (!UserId || !RoleId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(UserId, RoleId);
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
