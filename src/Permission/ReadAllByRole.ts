import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError } from "../MyResponse";
import { MySQLFunctionReturn } from "./Utils";

function sql(RoleId: string) {
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
FROM rolepermission rp
JOIN Role r ON rp.RoleId = r.RoleId
JOIN Permission p ON rp.PermissionId = p.PermissionId
WHERE rp.RoleId = '${RoleId}';
`;
}

export const ReadAllByRole = async (req: Request, res: Response) => {
    const { RoleId } = req.params;
    try {
        const [rows, fields] = await pool.query<MySQLFunctionReturn[]>(sql(RoleId));
        if (!rows[0].data) {
            return res.status(Code.OK).json([]);
        }
        return res.status(Code.OK).json(rows[0].data);
    } catch (error) {
        console.error(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
