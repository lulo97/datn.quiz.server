import { Request, Response } from "express";
import { pool } from "../Connect";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";

function sql(EducationLevelId: string) {
    return `SELECT getAllQuestionDetailByEducationLevel('${EducationLevelId}') as data;`;
}

export const ReadAllByEducationLevel = async (req: Request, res: Response) => {
    const EducationLevelId = req.params.EducationLevelId;

    try {
        const sql_query = sql(EducationLevelId);

        const [rows] = await pool.query<any[]>(sql_query);

        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        if (!rows[0].data) {
            return res.status(Code.OK).json(NotFound);
        }
        const Questions = rows[0].data;

        return res.status(Code.OK).json(Questions);
    } catch (error) {
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
