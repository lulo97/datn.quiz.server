import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(Name: string, Description: string) {
    return `INSERT INTO ${TABLE} (Name, Description) VALUES (${Name}, ${Description})`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { Name, Description } = req.body;
    if (!Name) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(Name, Description);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error)
res.status(Code.InternalServerError).json(CatchError(error));
    }
};
