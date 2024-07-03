import { Request, Response } from "express";
import { pool } from "../Connect";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { MySQLFunctionReturn } from "./Utils";

function sql(UserId: string) {
    return `SELECT getPlayDetailByUserId('${UserId}') as data;`;
}

export const ReadAllByUserId = async (req: Request, res: Response) => {
    const UserId = req.params.UserId;
    try {
        const sql_query = sql(UserId);
        const [rows] = await pool.query<MySQLFunctionReturn[]>(sql_query);
        if (rows[0].data == null) {
            return res.status(Code.OK).json([]);
        }
        let data = rows[0].data
        data = data.filter(ele => ele.Quiz != null)
        return res.status(Code.OK).json(data);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
