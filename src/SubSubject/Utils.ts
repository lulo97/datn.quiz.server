import { RowDataPacket } from "mysql2";
import { EducationLevel, SubSubject, Subject } from "../InterfacesDatabase";

export interface SubSubjectDetail
    extends Omit<SubSubject, "SubjectId" | "EducationLevelId"> {
    Subject: Subject;
    EducationLevel: EducationLevel;
}

export interface MySQLFunctionReturn extends RowDataPacket {
    data: SubSubjectDetail[];
}
