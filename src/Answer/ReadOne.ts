import { Request, Response } from "express";
import { pool } from "../Connect";
import { Answer } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(AnswerId: string) {
    return `SELECT * FROM ${TABLE} WHERE AnswerId = '${AnswerId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const AnswerId = req.params.AnswerId;
    try {
        const sql_query = sql(AnswerId);
        const [rows] = await pool.query<Answer[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
