import { RowDataPacket } from "mysql2";
import {
    Answer,
    DifficultLevel,
    EducationLevel,
    Language,
    Point,
    SubSubject,
    Subject,
    Type,
} from "../InterfacesDatabase";

export interface QuestionDetail extends RowDataPacket {
    QuestionId: string;
    QuestionInformationId: string;
    UserId: string;
    Answers: Answer[];
    Content: string | null;
    ImageFile: File | null;
    ImageUrl: string | null;
    AudioFile: File | null;
    AudioUrl: string | null;
    Explanation: string | null;
    ExplainAllow: boolean;
    Type: Type | null;
    DifficultLevel: DifficultLevel | null;
    EducationLevel: EducationLevel | null;
    Subject: Subject | null;
    Language: Language | null;
    SubSubject: SubSubject | null;
    PenaltyPoint: Point | null;
    PenaltyAllow: boolean;
    Point: Point | null;
    //
    CorrectUserCount: number;
    IncorrectUserCount: number;
    IsDeleted: boolean;
    CreatedAt: string | null;
    UpdatedAt: string | null;
}

export interface MySQLFunctionReturn extends RowDataPacket {
    data: QuestionDetail[];
}
