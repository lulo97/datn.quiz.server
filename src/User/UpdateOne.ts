import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, FieldNull, NotFound, Update } from "../MyResponse";
import { TABLE } from "./route";

function sql(
    UserId: string,
    ClerkId: string,
    Fullname: string,
    Username: string,
    Email: string,
    Biography: string,
    ImageUrl: string
) {
    return `UPDATE ${TABLE} SET ClerkId = '${ClerkId}', Fullname = '${Fullname}, Username = '${Username}, Email = '${Email}, Biography = '${Biography}, ImageUrl = '${ImageUrl} WHERE UserId = '${UserId}'`;
}

export const UpdateOne = async (req: Request, res: Response) => {
    const { UserId, ClerkId, Fullname, Username, Email, Biography, ImageUrl } =
        req.body;
    if (!UserId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(
            UserId,
            ClerkId,
            Fullname,
            Username,
            Email,
            Biography,
            ImageUrl
        );
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
