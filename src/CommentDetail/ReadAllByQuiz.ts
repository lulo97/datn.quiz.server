import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError } from "../MyResponse";
import { CommentDetail, nestComments } from "./Utils";

function sql(QuizId: string) {
    return `
        WITH RECURSIVE AllComments AS (
            SELECT 
                c.CommentId, 
                c.ParentCommentId, 
                c.QuizId, 
                c.CreateUserId, 
                c.CreatedAt, 
                c.UpdatedAt, 
                c.Content,
                JSON_OBJECT(
                    'UserId', u.UserId, 
                    'ClerkId', u.ClerkId,
                    'Fullname', u.Fullname, 
                    'Username', u.Username, 
                    'Email', u.Email, 
                    'Biography', u.Biography, 
                    'ImageUrl', u.ImageUrl, 
                    'CreatedAt', u.CreatedAt
                ) AS User,
                IFNULL(getDownvoteByCommentId(c.CommentId), JSON_ARRAY()) AS Downvotes,
                IFNULL(getUpvoteByCommentId(c.CommentId), JSON_ARRAY()) AS Upvotes
            FROM 
                Comment c
            JOIN 
                User u ON c.CreateUserId = u.UserId
            WHERE 
                (c.ParentCommentId IS NULL OR c.ParentCommentId = '')
                AND c.QuizId = '${QuizId}'
            
            UNION ALL
            
            SELECT 
                c.CommentId, 
                c.ParentCommentId, 
                c.QuizId, 
                c.CreateUserId, 
                c.CreatedAt, 
                c.UpdatedAt, 
                c.Content,
                JSON_OBJECT(
                    'UserId', u.UserId, 
                    'ClerkId', u.ClerkId,
                    'Fullname', u.Fullname, 
                    'Username', u.Username, 
                    'Email', u.Email, 
                    'Biography', u.Biography, 
                    'ImageUrl', u.ImageUrl, 
                    'CreatedAt', u.CreatedAt
                ) AS User,
                IFNULL(getDownvoteByCommentId(c.CommentId), JSON_ARRAY()) AS Downvotes,
                IFNULL(getUpvoteByCommentId(c.CommentId), JSON_ARRAY()) AS Upvotes
            FROM 
                Comment c
            JOIN 
                AllComments ac ON c.ParentCommentId = ac.CommentId
            JOIN 
                User u ON c.CreateUserId = u.UserId
        )
        SELECT *
        FROM AllComments;

    `;
}

export const ReadAllByQuiz = async (req: Request, res: Response) => {
    const QuizId = req.params.QuizId;
    try {
        const [rows, fields] = await pool.query<CommentDetail[]>(sql(QuizId));
        const _rows = rows.map((ele) => ({ ...ele, Replies: [] }));
        return res.status(Code.OK).json(nestComments(_rows));
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
