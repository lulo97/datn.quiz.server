import { RowDataPacket } from "mysql2";
import {
    EducationLevel,
    Subject,
    Time,
} from "../InterfacesDatabase";
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
}

export function ReadAllSql() {
    return `
        SELECT JSON_OBJECT(
            'QuizId', q.QuizId,
            'QuizInformationId', qi.QuizInformationId,
            'UserId', q.UserId,
            'Name', qi.Name,
            'Description', qi.Description,
            'Time', JSON_OBJECT(
                'TimeId', t.TimeId,
                'Value', t.Value,
                'CreatedAt', t.CreatedAt,
                'UpdatedAt', t.UpdatedAt
            ),
            'IsPublic', NULL,
            'EducationLevel', JSON_OBJECT(
                'EducationLevelId', el.EducationLevelId,
                'Name', el.Name,
                'Description', el.Description,
                'CreatedAt', el.CreatedAt,
                'UpdatedAt', el.UpdatedAt
            ),
            'Subject', JSON_OBJECT(
                'SubjectId', s.SubjectId,
                'Name', s.Name,
                'Description', s.Description,
                'CreatedAt', s.CreatedAt,
                'UpdatedAt', s.UpdatedAt
            )
        ) as data
        FROM
            Quiz q
        LEFT JOIN QuizInformation qi ON qi.QuizInformationId = q.QuizInformationId
        LEFT JOIN Time t ON q.TimeId = t.TimeId
        LEFT JOIN EducationLevel el ON el.EducationLevelId = q.EducationLevelId
        LEFT JOIN Subject s ON s.SubjectId = q.SubjectId
    `;
}

export function ReadOneSql(QuizId: string) {
    return `${ReadAllSql()}
WHERE
    q.QuizId = '${QuizId}';`;
}
