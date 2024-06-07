import { Request, Response } from "express";
import { pool } from "../Connect";
import { Subject } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(SubjectId: string) {
    return `SELECT * FROM ${TABLE} WHERE SubjectId = '${SubjectId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const SubjectId = req.params.SubjectId;
    try {
        const sql_query = sql(SubjectId);
        const [rows] = await pool.query<Subject[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
