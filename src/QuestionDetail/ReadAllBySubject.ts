import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError } from "../MyResponse";
import { QuestionDetail, leftJoin, selectJsonObject } from "./Utils";

function sql(SubjectId: string) {
    return `WITH subsubjects AS (
        SELECT SubSubjectId
        FROM SubSubject
        WHERE SubjectId = '${SubjectId}'
    )
    ${selectJsonObject}
    FROM
        Question q
    ${leftJoin}
    WHERE
        q.SubSubjectId IN (SELECT SubSubjectId FROM subsubjects);`
}

export const ReadAllBySubject = async (req: Request, res: Response) => {
    const SubjectId = req.params.SubjectId;
    try {
        const [rows, fields] = await pool.query<QuestionDetail[]>(sql(SubjectId));
        res.status(Code.OK).json(rows.map(ele => ele.data));
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
