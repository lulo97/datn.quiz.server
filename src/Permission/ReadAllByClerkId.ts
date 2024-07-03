import { Request, Response } from "express";
import { pool } from "../Connect";
import { Permission } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { RowDataPacket } from "mysql2";

function sql(ClerkId: string) {
    return `
SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
        'PermissionId', p.PermissionId,
        'Name', p.Name,
        'Description', p.Description,
        'CreatedAt', p.CreatedAt,
        'UpdatedAt', p.UpdatedAt
    )
) AS data
FROM UserRole ur
LEFT JOIN user u ON ur.UserId = u.UserId
LEFT JOIN role r ON ur.RoleId = r.RoleId
LEFT JOIN rolepermission rp ON rp.RoleId = r.RoleId
LEFT JOIN permission p ON rp.PermissionId = p.PermissionId
WHERE u.ClerkId = '${ClerkId}';
    `;
}

export interface MySQLFunctionReturn extends RowDataPacket {
    data: Permission[];
}

export const ReadAllByClerkId = async (req: Request, res: Response) => {
    const ClerkId = req.params.ClerkId;
    try {
        const sql_query = sql(ClerkId);
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
