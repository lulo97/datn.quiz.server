import { Request, Response } from "express";
import { pool } from "../Connect";
import { Question } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(QuestionId: string) {
    return `SELECT * FROM ${TABLE} WHERE QuestionId = '${QuestionId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const QuestionId = req.params.QuestionId;
    try {
        const sql_query = sql(QuestionId);
        const [rows] = await pool.query<Question[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
