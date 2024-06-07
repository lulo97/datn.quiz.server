import { Request, Response } from "express";
import { pool } from "../Connect";
import { ReportReason } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(ReportReasonId: string) {
    return `SELECT * FROM ${TABLE} WHERE ReportReasonId = '${ReportReasonId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const ReportReasonId = req.params.ReportReasonId;
    try {
        const sql_query = sql(ReportReasonId);
        const [rows] = await pool.query<ReportReason[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
