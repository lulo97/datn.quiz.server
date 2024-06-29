import { Request, Response } from "express";
import { pool } from "../Connect";
import { Like } from "../InterfacesDatabase";
import { Code } from "../Code";
import { CatchError, FieldNull } from "../MyResponse";
import { TABLE } from "./route";
import { MySQLFunctionReturn } from "./Utils";

function sql(QuizId: string) {
    return `
SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
        'RatingId', r.RatingId,
        'QuizId', r.QuizId,
        'UserId', r.UserId,
        'Score', r.Score,
        'Content', r.Content,
        'CreatedAt', r.CreatedAt,
        'User', JSON_OBJECT(
            'UserId', u.UserId,
            'ClerkId', u.ClerkId,
            'Fullname', u.Fullname,
            'Username', u.Username,
            'Email', u.Email,
            'Biography', u.Biography,
            'ImageUrl', u.ImageUrl,
            'CreatedAt', u.CreatedAt
        )
    )
) AS data
FROM rating r
JOIN User u ON r.UserId = u.UserId
WHERE r.QuizId = '${QuizId}';
`;
}

export const ReadAllByQuiz = async (req: Request, res: Response) => {
    const { QuizId } = req.params;
    try {
        if (!QuizId) {
            return res.status(Code.BadRequest).json(FieldNull);
        }
        const [rows] = await pool.query<MySQLFunctionReturn[]>(sql(QuizId));
        if (rows[0].data == null) {
            return res.status(Code.OK).json([]);
        }
        return res.status(Code.OK).json(rows[0].data);
    } catch (error) {
        console.error(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
