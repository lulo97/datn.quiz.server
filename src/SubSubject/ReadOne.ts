import { Request, Response } from "express";
import { pool } from "../Connect";
import { SubSubject } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(SubSubjectId: string) {
    return `SELECT * FROM ${TABLE} WHERE SubSubjectId = '${SubSubjectId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const SubSubjectId = req.params.SubSubjectId;
    try {
        const sql_query = sql(SubSubjectId);
        const [rows] = await pool.query<SubSubject[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error)
res.status(Code.InternalServerError).json(CatchError(error));
    }
};
