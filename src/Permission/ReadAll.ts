import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError } from "../MyResponse";
import { MySQLFunctionReturn } from "./Utils";

function sql() {
    return `
SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
        'PermissionId', p.PermissionId,
        'Name', p.Name,
        'Description', p.Description,
        'CreatedAt', p.CreatedAt,
        'UpdatedAt', p.UpdatedAt,
        'Role', (
            SELECT JSON_OBJECT(
                'RoleId', r.RoleId,
                'Name', r.Name,
                'Description', r.Description,
                'CreatedAt', r.CreatedAt,
                'UpdatedAt', r.UpdatedAt
            )
            FROM Role r
            JOIN RolePermission rp ON r.RoleId = rp.RoleId
            WHERE rp.PermissionId = p.PermissionId
        )
    )
) AS data
FROM Permission p;
    `;
}

export const ReadAll = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query<MySQLFunctionReturn[]>(sql());
        if (!rows[0].data) {
            return res.status(Code.OK).json([]);
        }
        return res.status(Code.OK).json(rows[0].data);
    } catch (error) {
        console.error(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
