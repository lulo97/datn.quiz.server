import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(SubjectId: string, Name: string, Description: string) {
    return `INSERT INTO ${TABLE} (SubjectId, Name, Description) VALUES ('${SubjectId}', '${Name}', '${Description}')`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { SubjectId, Name, Description } = req.body;
    if (!Name) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(SubjectId, Name, Description);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error)
res.status(Code.InternalServerError).json(CatchError(error));
    }
};
