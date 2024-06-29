import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, FieldNull, NotFound, Update } from "../MyResponse";
import { TABLE as PermissionTable } from "./route";
import { TABLE as RolePermissionTable } from "../RolePermission/route";

function updatePermissionSQL(
    PermissionId: string,
    Name: string,
    Description: string
) {
    return `UPDATE ${PermissionTable} SET Name = '${Name}', Description = '${
        Description ? Description : "NULL"
    }' WHERE PermissionId = '${PermissionId}'`;
}

function updateRolePermissionSQL(RoleId: string, PermissionId: string) {
    return `UPDATE ${RolePermissionTable} SET RoleId = '${RoleId}', PermissionId = '${PermissionId}' WHERE PermissionId = '${PermissionId}'`;
}

export const UpdateOne = async (req: Request, res: Response) => {
    const { PermissionId, Name, Description, Role } = req.body;
    console.log(req.body)
    const connection = await pool.getConnection();
    try {
        const { RoleId } = Role;
        if (!PermissionId || !Name || !RoleId) {
            connection.release();
            return res.status(Code.BadRequest).json(FieldNull);
        }

        await connection.beginTransaction();

        const sqlPermissionQuery = updatePermissionSQL(
            PermissionId,
            Name,
            Description
        );
        await connection.query<ResultSetHeader>(sqlPermissionQuery);

        const sqlRolePermissionQuery = updateRolePermissionSQL(
            RoleId,
            PermissionId
        );
        await connection.query<ResultSetHeader>(sqlRolePermissionQuery);

        await connection.commit();
        connection.release();
        return res.status(Code.OK).json(Update);
    } catch (error) {
        await connection.rollback();
        connection.release();
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
