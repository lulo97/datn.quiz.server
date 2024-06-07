import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(Value: number, IsPenalty: boolean) {
    return `INSERT INTO ${TABLE} (Value, IsPenalty) VALUES (${Value}, ${IsPenalty})`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { Value, IsPenalty } = req.body;
    if (!Value) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(Number(Value), Boolean(IsPenalty));
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        return res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
