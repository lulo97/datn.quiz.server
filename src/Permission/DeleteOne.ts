import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, Delete, FieldNull, NotFound } from "../MyResponse";
import { TABLE as PermissionTable } from "./route";
import { TABLE as RolePermissionTable } from "../RolePermission/route";

function deletePermissionSQL(PermissionId: string) {
    return `DELETE FROM ${PermissionTable} WHERE PermissionId = '${PermissionId}'`;
}

function deleteRolePermissionSQL(PermissionId: string) {
    return `DELETE FROM ${RolePermissionTable} WHERE PermissionId = '${PermissionId}'`;
}

export const DeleteOne = async (req: Request, res: Response) => {
    const { PermissionId } = req.body;
    if (!PermissionId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const sqlPermissionQuery = deletePermissionSQL(PermissionId);
        await connection.query<ResultSetHeader>(sqlPermissionQuery);

        const sqlRolePermissionQuery = deleteRolePermissionSQL(PermissionId);
        await connection.query<ResultSetHeader>(sqlRolePermissionQuery);

        await connection.commit();
        connection.release();
        return res.status(Code.OK).json(Delete);
    } catch (error) {
        await connection.rollback();
        connection.release();
        console.error(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
