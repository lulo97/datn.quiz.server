import { RowDataPacket } from "mysql2";
import { Role, User, UserRole } from "../InterfacesDatabase";

export interface UserRoleDetail extends Omit<UserRole, "RoleId" | "UserId"> {
    Role: Role;
    User: User;
}

export interface MySQLFunctionReturn extends RowDataPacket {
    data: UserRoleDetail;
}
