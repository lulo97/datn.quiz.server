import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../Code";
import { CatchError, FieldNull, Update, Create } from "../MyResponse";
import { TABLE as PermissionTable } from "./route";
import { TABLE as RolePermissionTable } from "../RolePermission/route";

function createPermissionSQL(
    PermissionId: string,
    Name: string,
    Description: string
) {
    return `INSERT INTO ${PermissionTable} (PermissionId, Name, Description) VALUES ('${PermissionId}', '${Name}', '${
        Description ? Description : "NULL"
    }')`;
}

function createRolePermissionSQL(RoleId: string, PermissionId: string) {
    return `INSERT INTO ${RolePermissionTable} (RoleId, PermissionId) VALUES ('${RoleId}', '${PermissionId}');`;
}

export const UpdateOne = async (req: Request, res: Response) => {
    const { PermissionId, Name, Description, Role } = req.body;
    const connection = await pool.getConnection();
    try {
        const { RoleId } = Role;
        if (!PermissionId || !Name || !RoleId) {
            connection.release();
            return res.status(Code.BadRequest).json(FieldNull);
        }

        await connection.beginTransaction();

        const sqlPermissionQuery = createPermissionSQL(
            PermissionId,
            Name,
            Description
        );
        await connection.query<ResultSetHeader>(sqlPermissionQuery);

        const sqlRolePermissionQuery = createRolePermissionSQL(
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

export const CreateOne = async (req: Request, res: Response) => {
    const { PermissionId, Name, Description, Role } = req.body;
    const connection = await pool.getConnection();
    try {
        const { RoleId } = Role;
        if (!Name || !RoleId) {
            connection.release();
            return res.status(Code.BadRequest).json(FieldNull);
        }

        await connection.beginTransaction();

        const sqlPermissionQuery = createPermissionSQL(
            PermissionId,
            Name,
            Description
        );
        await connection.query<ResultSetHeader>(
            sqlPermissionQuery
        );

        const sqlRolePermissionQuery = createRolePermissionSQL(
            RoleId,
            PermissionId
        );
        await connection.query<ResultSetHeader>(
            sqlRolePermissionQuery
        );

        await connection.commit();
        connection.release();
        return res.status(Code.OK).json(Create);
    } catch (error) {
        await connection.rollback();
        connection.release();
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
