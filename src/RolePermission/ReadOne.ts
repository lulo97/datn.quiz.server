import { Request, Response } from "express";
import { pool } from "../Connect";
import { RolePermission } from "../InterfacesDatabase";
import { CatchError, FieldNull, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(RoleId: string, PermissionId: string) {
    return `SELECT * FROM ${TABLE} WHERE RoleId = '${RoleId}' AND PermissionId = '${PermissionId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const { RoleId, PermissionId } = req.params;
    if (!RoleId || !PermissionId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(RoleId, PermissionId);
        const [rows] = await pool.query<RolePermission[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
