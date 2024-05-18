import { Request, Response } from "express";
import { pool } from "../Connect";
import { ReportTarget } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(ReportTargetId: string) {
    return `SELECT * FROM ${TABLE} WHERE ReportTargetId = '${ReportTargetId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const ReportTargetId = req.params.ReportTargetId;
    try {
        const sql_query = sql(ReportTargetId);
        const [rows] = await pool.query<ReportTarget[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error)
res.status(Code.InternalServerError).json(CatchError(error));
    }
};
