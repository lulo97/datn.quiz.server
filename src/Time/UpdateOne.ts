import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, FieldNull, NotFound, Update } from "../MyResponse";
import { TABLE } from "./route";

function sql(TimeId: string, Value: number) {
    return `UPDATE ${TABLE} SET Value = ${Value} WHERE TimeId = '${TimeId}'`;
}

export const UpdateOne = async (req: Request, res: Response) => {
    const { TimeId, Value, IsPenalty } = req.body;
    if (!TimeId || !Value) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(TimeId, Number(Value));
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        if (result.affectedRows === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(Update);
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
