import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(
    ClerkId: string,
    Fullname: string,
    Username: string,
    Email: string,
    ImageUrl: string
) {
    return `
    INSERT INTO ${TABLE} (ClerkId, Fullname, Username, Email, ImageUrl) 
    VALUES ('${ClerkId}', '${Fullname}', '${Username}', '${Email}', '${ImageUrl}')`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { ClerkId, Fullname, Username, Email, ImageUrl } = req.body;
    if (!ClerkId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(ClerkId, Fullname, Username, Email, ImageUrl);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
