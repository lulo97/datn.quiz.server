import { Request, Response } from "express";
import { pool } from "../Connect";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { QuizDetail, ReadOneSql as sql } from "./Utils";

export const ReadOne = async (req: Request, res: Response) => {
    const QuizId = req.params.QuizId;
    try {
        const sql_query = sql(QuizId);
        const [rows] = await pool.query<QuizDetail[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(rows[0].data);
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
