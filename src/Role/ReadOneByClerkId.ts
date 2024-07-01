import { Request, Response } from "express";
import { pool } from "../Connect";
import { Role } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";

function sql(ClerkId: string) {
    return `
SELECT r.*
FROM UserRole ur
LEFT JOIN user u ON ur.UserId = u.UserId
LEFT JOIN role r ON ur.RoleId = r.RoleId
WHERE u.ClerkId = '${ClerkId}';
    `;
}

export const ReadOneByClerkId = async (req: Request, res: Response) => {
    const ClerkId = req.params.ClerkId;
    try {
        const sql_query = sql(ClerkId);
        const [rows] = await pool.query<Role[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
