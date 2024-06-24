import { Request, Response } from "express";
import { pool } from "../Connect";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";

function sql(QuizId: string) {
    return `SELECT getOneQuizDetail('${QuizId}') as data;`;
}

export const ReadAllByQuizId = async (req: Request, res: Response) => {
    const QuizId = req.params.QuizId;
    try {
        const sql_query = sql(QuizId);
        const [rows] = await pool.query<any[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        if (!rows[0].data) {
            return res.status(Code.OK).json(NotFound)
        }
        const Questions = rows[0].data.Questions;
        return res.status(Code.OK).json(Questions);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
