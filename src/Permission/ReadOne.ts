import { Request, Response } from "express";
import { pool } from "../Connect";
import { Permission } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(PermissionId: string) {
    return `SELECT * FROM ${TABLE} WHERE PermissionId = '${PermissionId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const PermissionId = req.params.PermissionId;
    try {
        const sql_query = sql(PermissionId);
        const [rows] = await pool.query<Permission[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
