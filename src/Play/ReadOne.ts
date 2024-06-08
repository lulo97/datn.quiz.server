import { Request, Response } from "express";
import { pool } from "../Connect";
import { Play } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(PlayId: string) {
    return `SELECT * FROM ${TABLE} WHERE PlayId = '${PlayId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const PlayId = req.params.PlayId;
    try {
        const sql_query = sql(PlayId);
        const [rows] = await pool.query<Play[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
