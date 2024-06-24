import { Request, Response } from "express";
import { pool } from "../Connect";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";

export const ReadAllBySubjectAndEducationLevel = async (req: Request, res: Response) => {
    const { SubjectId, EducationLevelId } = req.params;
    try {
        const sql_query = sql(SubjectId, EducationLevelId);

        const [rows] = await pool.query<any[]>(sql_query);

        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        if (!rows[0].data) {
            return res.status(Code.OK).json(NotFound);
        }
        const Questions = rows[0].data;

        return res.status(Code.OK).json(Questions);
    } catch (error) {
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};

function sql(SubjectId: string, EducationLevelId: string) {
    return `
    		WITH subsubjects AS (
			SELECT SubSubjectId
			FROM SubSubject
			WHERE SubjectId = '${SubjectId}'
		)
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'QuestionId', q.QuestionId,
                'QuestionInformationId', qi.QuestionInformationId,
                'UserId', q.UserId,
				'Content', qi.Content,
                'ImageUrl', qi.ImageUrl,
                'ImageFile', NULL,
                'AudioUrl', qi.AudioUrl,
                'AudioFile', NULL,
                'Explanation', qi.Explanation,
                'ExplainAllow', IF(qi.Explanation IS NULL, false, true),
                'PenaltyAllow', IF(pp.Value IS NULL, false, true),
                'Explanation', qi.Explanation,
                'CorrectUserCount', qi.CorrectUserCount,
                'IncorrectUserCount', qi.IncorrectUserCount,
                'IsDeleted', qi.IsDeleted,
                'CreatedAt', qi.CreatedAt,
                'UpdatedAt', qi.UpdatedAt,
                'Answers', (
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
                ),
                'SubSubject', JSON_OBJECT(
                    'SubSubjectId', ss.SubSubjectId,
                    'SubjectId', ss.SubjectId,
                    'EducationLevelId', ss.EducationLevelId,
                    'Name', ss.Name,
                    'Description', ss.Description,
                    'CreatedAt', ss.CreatedAt,
                    'UpdatedAt', ss.UpdatedAt
                ),
                'Subject', JSON_OBJECT(
                    'SubjectId', s.SubjectId,
                    'Name', s.Name,
                    'Description', s.Description,
                    'CreatedAt', s.CreatedAt,
                    'UpdatedAt', s.UpdatedAt
                ),
                'Type', JSON_OBJECT(
                    'TypeId', t.TypeId,
                    'Name', t.Name,
                    'Description', t.Description,
                    'CreatedAt', t.CreatedAt,
                    'UpdatedAt', t.UpdatedAt
                ),
                'EducationLevel', JSON_OBJECT(
                    'EducationLevelId', el.EducationLevelId,
                    'Name', el.Name,
                    'Description', el.Description,
                    'CreatedAt', el.CreatedAt,
                    'UpdatedAt', el.UpdatedAt
                ),
                'DifficultLevel', JSON_OBJECT(
                    'DifficultLevelId', dl.DifficultLevelId,
                    'Name', dl.Name,
                    'Description', dl.Description,
                    'CreatedAt', dl.CreatedAt,
                    'UpdatedAt', dl.UpdatedAt
                ),
                'Language', JSON_OBJECT(
                    'LanguageId', l.LanguageId,
                    'Name', l.Name,
                    'Description', l.Description,
                    'CreatedAt', l.CreatedAt,
                    'UpdatedAt', l.UpdatedAt
                ),
                'Point', JSON_OBJECT(
                    'PointId', p.PointId,
                    'Value', p.Value,
                    'IsPenalty', p.IsPenalty,
                    'CreatedAt', p.CreatedAt,
                    'UpdatedAt', p.UpdatedAt
                ),
                'PenaltyPoint', JSON_OBJECT(
                    'PointId', pp.PointId,
                    'Value', pp.Value,
                    'IsPenalty', pp.IsPenalty,
                    'CreatedAt', pp.CreatedAt,
                    'UpdatedAt', pp.UpdatedAt
                )
            )
        ) as data
        FROM Question q
        LEFT JOIN QuestionInformation qi ON q.QuestionInformationId = qi.QuestionInformationId
        LEFT JOIN Type t ON q.TypeId = t.TypeId
        LEFT JOIN EducationLevel el ON q.EducationLevelId = el.EducationLevelId
        LEFT JOIN DifficultLevel dl ON q.DifficultLevelId = dl.DifficultLevelId
        LEFT JOIN Language l ON q.LanguageId = l.LanguageId
        LEFT JOIN Point p ON q.PointId = p.PointId
        LEFT JOIN Point pp ON q.PenaltyPointId = pp.PointId
        LEFT JOIN SubSubject ss ON q.SubSubjectId = ss.SubSubjectId
        LEFT JOIN Subject s ON ss.SubjectId = s.SubjectId
        WHERE q.EducationLevelId = '${EducationLevelId}'
        AND q.SubSubjectId IN (SELECT SubSubjectId FROM subsubjects);
    `;
}
