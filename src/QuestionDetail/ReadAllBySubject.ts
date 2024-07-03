import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError } from "../MyResponse";
import { MySQLFunctionReturn } from "./Utils";

export const ReadAllBySubject = async (req: Request, res: Response) => {
    const SubjectId = req.params.SubjectId;
    try {
        const [rows, fields] = await pool.query<MySQLFunctionReturn[]>(
            sql(SubjectId)
        );
        if (rows[0].data == null) {
            return res.status(Code.OK).json([]);
        }
        return res.status(Code.OK).json(rows[0].data);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};

function sql(SubjectId: string) {
    return `SELECT getAllQuestionDetailBySubject('${SubjectId}') as data;`;
}
