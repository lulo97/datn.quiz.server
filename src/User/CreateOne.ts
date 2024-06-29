import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

//Role = Người dùng
const RoleId = "995bfc28-12cb-11ef-9b8a-02509c489bec"

function sql(
    UserId: string,
    ClerkId: string,
    Fullname: string,
    Username: string,
    Email: string,
    ImageUrl: string
) {
    return `
    INSERT INTO ${TABLE} (UserId, ClerkId, Fullname, Username, Email, ImageUrl) 
    VALUES ('${UserId}', '${ClerkId}', '${Fullname}', '${Username}', '${Email}', '${ImageUrl}')`;
}

function sqlUserRole(UserId: string) {
    return `INSERT INTO UserRole (UserId, RoleId) VALUES ('${UserId}', '${RoleId}')`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { UserId, ClerkId, Fullname, Username, Email, ImageUrl } = req.body;
    if (!ClerkId || !UserId || !Fullname || !Username || !ImageUrl) {
        return res.status(Code.BadRequest).json(FieldNull);
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const sql_query = sql(UserId, ClerkId, Fullname, Username, Email, ImageUrl);
        await connection.query<ResultSetHeader>(sql_query);

        const sql_user_role = sqlUserRole(UserId);
        await connection.query<ResultSetHeader>(sql_user_role);

        await connection.commit();
        return res.status(Code.Created).json(Create);
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    } finally {
        connection.release();
    }
};
