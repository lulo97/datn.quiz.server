import { RowDataPacket } from "mysql2";
import { Permission, Role } from "../InterfacesDatabase";

export interface PermissionDetail extends Permission {
    Role: Role;
}

export interface MySQLFunctionReturn extends RowDataPacket {
    data: PermissionDetail[];
}