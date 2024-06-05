import { Request, Response } from "express";
import { pool } from "../Connect";
import { QuizInformation } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(QuizInformationId: string) {
    return `SELECT * FROM ${TABLE} WHERE QuizInformationId = '${QuizInformationId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const QuizInformationId = req.params.QuizInformationId;
    try {
        const sql_query = sql(QuizInformationId);
        const [rows] = await pool.query<QuizInformation[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
