import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, FieldNull, NotFound, Update } from "../MyResponse";
import { TABLE } from "./route";

function sql(ReportTargetId: string, Name: string, Description: string) {
    return `UPDATE ${TABLE} SET Name = '${Name}', Description = '${
        Description ? Description : "NULL"
    }' WHERE ReportTargetId = '${ReportTargetId}'`;
}

export const UpdateOne = async (req: Request, res: Response) => {
    const { ReportTargetId, Name, Description } = req.body;
    if (!ReportTargetId || !Name) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(ReportTargetId, Name, Description);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        if (result.affectedRows === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(Update);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
