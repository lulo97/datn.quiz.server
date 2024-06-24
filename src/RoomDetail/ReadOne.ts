import { Request, Response } from "express";
import { pool } from "../Connect";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { MySQLFunctionReturn } from "./Utils";

function sql(RoomId: string) {
    return `SELECT getOneRoomDetail('${RoomId}') as data;`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const RoomId = req.params.RoomId;
    try {
        const sql_query = sql(RoomId);
        const [rows] = await pool.query<MySQLFunctionReturn[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0].data);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
