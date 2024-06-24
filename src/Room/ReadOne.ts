import { Request, Response } from "express";
import { pool } from "../Connect";
import { Room } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(RoomId: string) {
    return `SELECT * FROM ${TABLE} WHERE RoomId = '${RoomId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const RoomId = req.params.RoomId;
    try {
        const sql_query = sql(RoomId);
        const [rows] = await pool.query<Room[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
