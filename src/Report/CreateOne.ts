import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

async function getReportTargetId(reportTarget: string): Promise<number | null> {
    const sql_query = `SELECT ReportTargetId FROM ReportTarget WHERE Name = ?`;
    const [rows] = await pool.query<RowDataPacket[]>(sql_query, [reportTarget]);
    if (rows.length > 0) {
        return rows[0].ReportTargetId;
    }
    return null;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { ReportReasonId, ReportTarget, UserId, ParentId, Content } = req.body;
    if (!ReportReasonId || !ReportTarget || !UserId || !ParentId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }

    try {
        const ReportTargetId = await getReportTargetId(ReportTarget);
        if (!ReportTargetId) {
            return res.status(Code.BadRequest).json({ error: `Can't find ReportTargetId by ReportTarget = ${ReportTarget}` });
        }

        const IsResolved = 0; // False in MySQL TINYINT
        const UserResolve = null;
        const contentValue = Content === "" ? null : Content;

        const sql_query = `
            INSERT INTO ${TABLE} (ReportReasonId, ReportTargetId, UserId, ParentId, Content, IsResolved, UserResolve)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        await pool.query<ResultSetHeader>(sql_query, [
            ReportReasonId,
            ReportTargetId,
            UserId,
            ParentId,
            contentValue,
            IsResolved,
            UserResolve
        ]);

        return res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
