import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError } from "../MyResponse";
import { QuestionDetail, ReadAllSql as sql } from "./Utils";

export const ReadAll = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query<QuestionDetail[]>(sql());
        res.status(Code.OK).json(rows.map(ele => ele.data));
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
