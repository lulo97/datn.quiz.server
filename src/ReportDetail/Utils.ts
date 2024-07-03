import { RowDataPacket } from "mysql2";
import { ReportReason, ReportTarget, User, Quiz } from "../InterfacesDatabase";

interface ReportDetail {
    ReportId: string;
    ReportReason: ReportReason;
    ReportTarget: ReportTarget;
    User: User;
    Parent: Quiz;
    Content: string;
    ResolvedAt: string;
    UserResolve: User | null;
}

export interface MySQLFunctionReturn extends RowDataPacket {
    data: ReportDetail[];
}
