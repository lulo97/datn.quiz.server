import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError } from "../MyResponse";
import { QuizDetail, ReadAllSql } from "./Utils";

function sql(UserId: string) {
    return `
    ${ReadAllSql()}
    WHERE
        q.UserId = '${UserId}';`
}

export const ReadAllByUser = async (req: Request, res: Response) => {
    const UserId = req.params.UserId;
    try {
        const [rows, fields] = await pool.query<QuizDetail[]>(sql(UserId));
        res.status(Code.OK).json(rows.map(ele => ele.data));
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
