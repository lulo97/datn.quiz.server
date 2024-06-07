import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError, NotFound } from "../MyResponse";
import { MySQLFunctionReturn } from "./Utils";

function sql() {
    return "SELECT getAllQuestionDetail() as data;"
}

export const ReadAll = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query<MySQLFunctionReturn[]>(sql());
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(rows[0].data);
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
