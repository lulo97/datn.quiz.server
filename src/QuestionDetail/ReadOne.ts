import { Request, Response } from "express";
import { pool } from "../Connect";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { QuestionDetail, ReadOneSql as sql } from "./Utils";

export const ReadOne = async (req: Request, res: Response) => {
    const QuestionId = req.params.QuestionId;
    try {
        const sql_query = sql(QuestionId);
        const [rows] = await pool.query<QuestionDetail[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(rows[0].data);
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
