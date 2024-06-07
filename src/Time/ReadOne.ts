import { Request, Response } from "express";
import { pool } from "../Connect";
import { Time } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(TimeId: string) {
    return `SELECT * FROM ${TABLE} WHERE TimeId = '${TimeId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const TimeId = req.params.TimeId;
    try {
        const sql_query = sql(TimeId);
        const [rows] = await pool.query<Time[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
