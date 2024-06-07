import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError, NotFound } from "../MyResponse";
import { MySQLFunctionReturn, QuizDetail } from "./Utils";

function sql(UserId: string) {
    return `SELECT getAllQuizDetailByUser('${UserId}') as data;`;
}

export const ReadAllByUser = async (req: Request, res: Response) => {
    const UserId = req.params.UserId;
    try {
        const [rows, fields] = await pool.query<MySQLFunctionReturn[]>(
            sql(UserId)
        );
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
