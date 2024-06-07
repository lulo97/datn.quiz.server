import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError, NotFound } from "../MyResponse";
import { MySQLFunctionReturn, QuizDetail } from "./Utils";

function sql() {
    return `SELECT getAllQuizDetail() as data;`;
}

export const ReadAll = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query<MySQLFunctionReturn[]>(sql());
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        if (rows[0].data == null) {
            return res.status(Code.OK).json([]);
        }
        return res.status(Code.OK).json(rows[0].data);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
