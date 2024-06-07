import { Request, Response } from "express";
import { pool } from "../Connect";
import { QuestionInformation } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(QuestionInformationId: string) {
    return `SELECT * FROM ${TABLE} WHERE QuestionInformationId = '${QuestionInformationId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const QuestionInformationId = req.params.QuestionInformationId;
    try {
        const sql_query = sql(QuestionInformationId);
        const [rows] = await pool.query<QuestionInformation[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
