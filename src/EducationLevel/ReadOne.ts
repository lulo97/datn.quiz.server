import { Request, Response } from "express";
import { pool } from "../Connect";
import { EducationLevel } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(EducationLevelId: string) {
    return `SELECT * FROM ${TABLE} WHERE EducationLevelId = '${EducationLevelId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const EducationLevelId = req.params.EducationLevelId;
    try {
        const sql_query = sql(EducationLevelId);
        const [rows] = await pool.query<EducationLevel[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error)
res.status(Code.InternalServerError).json(CatchError(error));
    }
};
