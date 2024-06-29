import { Request, Response } from "express";
import { pool } from "../Connect";
import { Like } from "../InterfacesDatabase";
import { Code } from "../Code";
import { CatchError, FieldNull } from "../MyResponse";
import { TABLE } from "./route";

function sql(QuizId: string, UserId: string) {
    return `SELECT * FROM ${TABLE} WHERE QuizId = '${QuizId}' AND UserId = '${UserId}';`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const { QuizId, UserId } = req.params;
    try {
        if (!QuizId || !UserId) {
            return res.status(Code.BadRequest).json(FieldNull);
        }
        const [rows] = await pool.query<Like[]>(sql(QuizId, UserId));
        if (rows.length == 0) {
            return res.status(Code.OK).json(null);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
