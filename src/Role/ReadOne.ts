import { Request, Response } from "express";
import { pool } from "../Connect";
import { Role } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(RoleId: string) {
    return `SELECT * FROM ${TABLE} WHERE RoleId = '${RoleId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const RoleId = req.params.RoleId;
    try {
        const sql_query = sql(RoleId);
        const [rows] = await pool.query<Role[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
