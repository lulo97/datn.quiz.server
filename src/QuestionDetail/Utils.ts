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
    ExplainContent: string | null;
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
}

export const answerFields = `
(
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'QuestionId', a.QuestionId,
            'AnswerId', a.AnswerId,
            'Content', a.Content,
            'IsCorrect', a.IsCorrect
        )
    )
    FROM Answer a
    WHERE a.QuestionId = q.QuestionId
)
`;

export const subSubjectFields = `
JSON_OBJECT(
    'SubSubjectId', ss.SubSubjectId,
    'SubjectId', ss.SubjectId,
    'Name', ss.Name,
    'Description', ss.Description,
    'CreatedAt', ss.CreatedAt,
    'UpdatedAt', ss.UpdatedAt
)
`;

export const subjectFields = `
JSON_OBJECT(
    'SubjectId', s.SubjectId,
    'Name', s.Name,
    'Description', s.Description,
    'CreatedAt', s.CreatedAt,
    'UpdatedAt', s.UpdatedAt
)
`;

export const typeFields = `
JSON_OBJECT(
    'TypeId', t.TypeId,
    'Name', t.Name,
    'Description', t.Description,
    'CreatedAt', t.CreatedAt,
    'UpdatedAt', t.UpdatedAt
)
`;

export const educationLevelFields = `
JSON_OBJECT(
    'EducationLevelId', el.EducationLevelId,
    'Name', el.Name,
    'Description', el.Description,
    'CreatedAt', el.CreatedAt,
    'UpdatedAt', el.UpdatedAt
)
`;

export const difficultLevelFields = `
JSON_OBJECT(
    'DifficultLevelId', dl.DifficultLevelId,
    'Name', dl.Name,
    'Description', dl.Description,
    'CreatedAt', dl.CreatedAt,
    'UpdatedAt', dl.UpdatedAt
)
`;

export const languageFields = `
JSON_OBJECT(
    'LanguageId', l.LanguageId,
    'Name', l.Name,
    'Description', l.Description,
    'CreatedAt', l.CreatedAt,
    'UpdatedAt', l.UpdatedAt
)
`;

export const pointFields = (alias: string) => `
JSON_OBJECT(
    'PointId', ${alias}.PointId,
    'Value', ${alias}.Value,
    'IsPenalty', ${alias}.IsPenalty,
    'CreatedAt', ${alias}.CreatedAt,
    'UpdatedAt', ${alias}.UpdatedAt
)
`;

export const selectJsonObject = `
SELECT JSON_OBJECT(
    'QuestionId', q.QuestionId,
    'QuestionInformationId', qi.QuestionInformationId,
    'UserId', q.UserId,
    'Answers', (${answerFields}),
    'Content', qi.Content,
    'ImageUrl', qi.ImageUrl,
    'ImageFile', NULL,
    'AudioUrl', qi.AudioUrl,
    'AudioFile', NULL,
    'ExplainContent', qi.Explanation,
    'ExplainAllow', IF(qi.Explanation IS NULL, false, true),
    'PenaltyAllow', IF(pp.Value IS NULL, false, true),
    'SubSubject', (${subSubjectFields}),
    'Subject', (${subjectFields}),
    'Type', (${typeFields}),
    'EducationLevel', (${educationLevelFields}),
    'DifficultLevel', (${difficultLevelFields}),
    'Language', (${languageFields}),
    'Point', (${pointFields('p')}),
    'PenaltyPoint', (${pointFields('pp')})
) as data
`

export const leftJoin = `
    LEFT JOIN QuestionInformation qi ON q.QuestionInformationId = qi.QuestionInformationId
    LEFT JOIN Type t ON q.TypeId = t.TypeId
    LEFT JOIN EducationLevel el ON q.EducationLevelId = el.EducationLevelId
    LEFT JOIN DifficultLevel dl ON q.DifficultLevelId = dl.DifficultLevelId
    LEFT JOIN Language l ON q.LanguageId = l.LanguageId
    LEFT JOIN Point p ON q.PointId = p.PointId
    LEFT JOIN Point pp ON q.PenaltyPointId = pp.PointId
    LEFT JOIN SubSubject ss ON q.SubSubjectId = ss.SubSubjectId
    LEFT JOIN Subject s ON ss.SubjectId = s.SubjectId
`

export function ReadAllSql() {
    return `
        ${selectJsonObject}
        FROM
            Question q
        ${leftJoin}
    `;
}

export function ReadOneSql(QuestionId: string) {
    return `${ReadAllSql()}
WHERE
    q.QuestionId = '${QuestionId}';`;
}
