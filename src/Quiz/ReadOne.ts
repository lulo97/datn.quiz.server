import { Request, Response } from "express";
import { pool } from "../Connect";
import { Quiz } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(QuizId: string) {
    return `SELECT * FROM ${TABLE} WHERE QuizId = '${QuizId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const QuizId = req.params.QuizId;
    try {
        const sql_query = sql(QuizId);
        const [rows] = await pool.query<Quiz[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
