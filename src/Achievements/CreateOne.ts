import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(Name: string, Description: string, ImageUrl: string) {
    return `INSERT INTO ${TABLE} (Name, Description, ImageUrl) VALUES ('${Name}', '${
        Description ? Description : "NULL"
    }', '${ImageUrl}')`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { Name, Description, ImageUrl } = req.body;
    if (!Name) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(Name, Description, ImageUrl);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        return res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
