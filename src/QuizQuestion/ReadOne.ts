import { Request, Response } from "express";
import { pool } from "../Connect";
import { QuizQuestion } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(QuizQuestionId: string) {
    return `SELECT * FROM ${TABLE} WHERE QuizQuestionId = '${QuizQuestionId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const QuizQuestionId = req.params.QuizQuestionId;
    try {
        const sql_query = sql(QuizQuestionId);
        const [rows] = await pool.query<QuizQuestion[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
