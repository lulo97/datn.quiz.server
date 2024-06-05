import { Request, Response } from "express";
import { pool } from "../Connect";
import { User } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(UserId: string) {
    return `SELECT * FROM ${TABLE} WHERE UserId = '${UserId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const UserId = req.params.UserId;
    try {
        const sql_query = sql(UserId);
        const [rows] = await pool.query<User[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error)
res.status(Code.InternalServerError).json(CatchError(error));
    }
};
