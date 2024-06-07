import { RowDataPacket } from "mysql2";
import { EducationLevel, Subject, Time } from "../InterfacesDatabase";
import { QuestionDetail } from "../QuestionDetail/Utils";

export interface QuizDetail extends RowDataPacket {
    QuizId: string;
    UserId: string;
    QuizInformationId: string;
    Questions: QuestionDetail[];
    Name: string | null;
    Description: string | null;
    ImageUrl: string | null;
    ImageFile: File | null;
    Time: Time | null;
    IsPublic: boolean;
    EducationLevel: EducationLevel | null;
    Subject: Subject | null;
    //
    Attempts: number;
    IsDeleted: boolean;
    IsVerified: boolean;
    UserVerify: string | null;
    VerifiedAt: string | null;
    CreatedAt: string | null;
    UpdatedAt: string | null;
}

export interface MySQLFunctionReturn extends RowDataPacket {
    data: QuizDetail[];
}
