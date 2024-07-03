import { Request, Response } from "express";
import { pool } from "../Connect";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { MySQLFunctionReturn } from "./Utils";

export const ReadAllBySubjectAndEducationLevel = async (
    req: Request,
    res: Response
) => {
    const { SubjectId, EducationLevelId } = req.params;
    try {
        const sql_query = sql(SubjectId, EducationLevelId);

        const [rows] = await pool.query<MySQLFunctionReturn[]>(sql_query);

        if (!rows[0].data) {
            return res.status(Code.OK).json(NotFound);
        }
        const Questions = rows[0].data;

        return res.status(Code.OK).json(Questions);
    } catch (error) {
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};

function sql(SubjectId: string, EducationLevelId: string) {
    return `SELECT getAllQuestionDetailBySubjectAndEducationLevel('${SubjectId}', '${EducationLevelId}') as data;`;
}
