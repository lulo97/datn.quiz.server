import { Request, Response } from "express";
import { pool } from "../../Connect";
import { Code } from "../../Code";
import { CatchError } from "../../MyResponse";
import { QuizForVertify } from "./Utils";

function sql() {
    return `
SELECT 
    q.QuizId,
    qi.QuizInformationId,
    qi.Name,
    CASE
        WHEN u.UserId IS NOT NULL THEN JSON_OBJECT(
            'UserId', u.UserId,
            'ClerkId', u.ClerkId,
            'Fullname', u.Fullname,
            'Username', u.Username,
            'Email', u.Email,
            'Biography', u.Biography,
            'ImageUrl', u.ImageUrl,
            'CreatedAt', u.CreatedAt
        )
        ELSE NULL
    END as UserVertify,
    qi.VerifiedAt
FROM quiz q
LEFT JOIN quizinformation qi ON qi.QuizInformationId = q.QuizInformationId
LEFT JOIN User u ON u.UserId = qi.UserVertify;

    `;
}

export const ReadAll = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query<QuizForVertify[]>(sql());
        return res.status(Code.OK).json(rows);
    } catch (error) {
        console.error(error);
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
