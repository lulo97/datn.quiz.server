import { Request, Response } from "express";
import { pool } from "../Connect";
import { SelectedAnswer } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(SelectedAnswerId: string) {
    return `SELECT * FROM ${TABLE} WHERE SelectedAnswerId = '${SelectedAnswerId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const SelectedAnswerId = req.params.SelectedAnswerId;
    try {
        const sql_query = sql(SelectedAnswerId);
        const [rows] = await pool.query<SelectedAnswer[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
