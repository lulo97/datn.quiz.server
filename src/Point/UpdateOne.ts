import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, FieldNull, NotFound, Update } from "../MyResponse";
import { TABLE } from "./route";

function sql(PointId: string, Value: number, IsPenalty: boolean) {
    return `UPDATE ${TABLE} SET Value = ${Value}, IsPenalty = ${IsPenalty} WHERE PointId = '${PointId}'`;
}

export const UpdateOne = async (req: Request, res: Response) => {
    const { PointId, Value, IsPenalty } = req.body;
    if (!PointId || !Value) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(PointId, Number(Value), Boolean(IsPenalty));
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