import { Request, Response } from "express";
import { pool } from "../Connect";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { MySQLFunctionReturn } from "./Utils";

function sql() {
    return `
SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
        'UserRoleId', ur.UserRoleId,
        'User', JSON_OBJECT(
            'UserId', u.UserId,
            'ClerkId', u.ClerkId,
            'Fullname', u.Fullname,
            'Username', u.Username,
            'Email', u.Email,
            'Biography', u.Biography,
            'ImageUrl', u.ImageUrl,
            'CreatedAt', u.CreatedAt
        ),
        'Role', JSON_OBJECT(
            'RoleId', r.RoleId,
            'Name', r.Name,
            'Description', r.Description,
            'CreatedAt', r.CreatedAt,
            'UpdatedAt', r.UpdatedAt
        ),
        'CreatedAt', ur.CreatedAt,
        'UpdatedAt', ur.UpdatedAt
    )
) AS data
FROM userrole ur
JOIN Role r ON ur.RoleId = r.RoleId
JOIN User u ON ur.UserId = u.UserId
WHERE u.Username != 'admin';
`;
}

export const ReadAll = async (req: Request, res: Response) => {
    try {
        const sql_query = sql();
        const [rows] = await pool.query<MySQLFunctionReturn[]>(sql_query);
        if (rows[0].data == null) {
            return res.status(Code.OK).json([]);
        }
        return res.status(Code.OK).json(rows[0].data);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
