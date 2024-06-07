import { Request, Response } from "express";
import { pool } from "../Connect";
import { Point } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(PointId: string) {
    return `SELECT * FROM ${TABLE} WHERE PointId = '${PointId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const PointId = req.params.PointId;
    try {
        const sql_query = sql(PointId);
        const [rows] = await pool.query<Point[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
