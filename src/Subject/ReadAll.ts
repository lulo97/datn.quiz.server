import { Request, Response } from "express";
import { pool } from "../Connect";
import { Subject } from "../InterfacesDatabase";
import { Code } from "../Code";
import { CatchError } from "../MyResponse";
import { TABLE } from "./route";

function sql() {
    return `SELECT * FROM ${TABLE}`;
}

export const ReadAll = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query<Subject[]>(sql());
        res.status(Code.OK).json(rows);
    } catch (error) {
        console.error(error);
        console.log(error)
res.status(Code.InternalServerError).json(CatchError(error));
    }
};
