import { Code } from "../Code";
import { pool } from "../Connect";
import { CatchError, NotFound } from "../MyResponse";
import { MySQLFunctionReturn } from "./Utils";
import { Request, Response } from "express";

function sql() {
    return `select getOneAdmin() as data;`;
}

export async function ReadOne(req: Request, res: Response) {
    try {
        const sql_query = sql();
        const [rows] = await pool.query<MySQLFunctionReturn[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0].data);
    } catch (error) {
        console.log("Error occurred:", error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
}
