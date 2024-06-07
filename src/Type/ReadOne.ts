import { Request, Response } from "express";
import { pool } from "../Connect";
import { Type } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(TypeId: string) {
    return `SELECT * FROM ${TABLE} WHERE TypeId = '${TypeId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const TypeId = req.params.TypeId;
    try {
        const sql_query = sql(TypeId);
        const [rows] = await pool.query<Type[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
