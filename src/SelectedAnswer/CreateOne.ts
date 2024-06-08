import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(PlayId: string, AnswerId: string) {
    return `INSERT INTO ${TABLE} (PlayId, AnswerId) VALUES ('${PlayId}', '${AnswerId}')`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { PlayId, AnswerId } = req.body;
    if (!PlayId || !AnswerId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(PlayId, AnswerId);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        return res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
