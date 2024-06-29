import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(RoleId: string, PermissionId: string) {
    return `INSERT INTO ${TABLE} (RoleId, PermissionId) VALUES ('${RoleId}', '${PermissionId}')`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { RoleId, PermissionId } = req.body;
    if (!RoleId || !PermissionId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(RoleId, PermissionId);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        return res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
