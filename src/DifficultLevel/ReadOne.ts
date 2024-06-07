import { Request, Response } from "express";
import { pool } from "../Connect";
import { DifficultLevel } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(DifficultLevelId: string) {
    return `SELECT * FROM ${TABLE} WHERE DifficultLevelId = '${DifficultLevelId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const DifficultLevelId = req.params.DifficultLevelId;
    try {
        const sql_query = sql(DifficultLevelId);
        const [rows] = await pool.query<DifficultLevel[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
