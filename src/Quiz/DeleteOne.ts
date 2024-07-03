import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError, Delete, FieldNull, NotFound } from "../MyResponse";
import fs from "fs";
import path from "path";
import { Comment, Play, Quiz, QuizInformation } from "../InterfacesDatabase";

const sqlSelectQuiz = "SELECT * FROM Quiz WHERE QuizId = ?";
const sqlSelectQI = "SELECT * FROM QuizInformation WHERE QuizInformationId = ?";
const sqlSelectPlay = "SELECT * FROM Play WHERE QuizId = ?";
const sqlSelectComments = "SELECT * FROM Comment WHERE QuizId = ?";

const sqlDeleteQI = "DELETE FROM QuizInformation WHERE QuizInformationId = ?";
const sqlDeleteQuiz = "DELETE FROM Quiz WHERE QuizId = ?";
const sqlDeleteQuizQuestion = "DELETE FROM QuizQuestion WHERE QuizId = ?";
const sqlDeleteSelectedAnswer = "DELETE FROM SelectedAnswer WHERE PlayId = ?";
const sqlDeletePlay = "DELETE FROM Play WHERE QuizId = ?";
const sqlDeleteLikes = "DELETE FROM Likes WHERE QuizId = ?";
const sqlDeleteRating = "DELETE FROM Rating WHERE QuizId = ?";
const sqlDeleteCommentUpvotes = "DELETE FROM UpvoteComment WHERE CommentId = ?";
const sqlDeleteCommentDownvotes =
    "DELETE FROM DownvoteComment WHERE CommentId = ?";
const sqlDeleteChildComments = "DELETE FROM Comment WHERE ParentCommentId = ?";
const sqlDeleteComments = "DELETE FROM Comment WHERE QuizId = ?";

export const DeleteOne = async (req: Request, res: Response) => {
    //console.log("Starting DeleteOne function");
    const { QuizId } = req.body;
    //console.log("QuizId:", QuizId);
    if (!QuizId) {
        //console.log("QuizId is missing");
        return res.status(Code.BadRequest).json(FieldNull);
    }
    const connection = await pool.getConnection();
    //console.log("Database connection established");

    try {
        await connection.beginTransaction();
        //console.log("Transaction started");

        // Fetch QuizInformationId by QuizId
        const [quizRows] = await connection.query<Quiz[]>(sqlSelectQuiz, [
            QuizId,
        ]);
        if (quizRows.length === 0) {
            //console.log("No Quiz found for QuizId:", QuizId);
            await connection.rollback();
            return res.status(Code.NotFound).json(NotFound);
        }
        const { QuizInformationId } = quizRows[0];

        // Fetch ImageUrl
        const [quizInfoRows] = await connection.query<QuizInformation[]>(
            sqlSelectQI,
            [QuizInformationId]
        );
        //console.log("Fetched QuizInformation rows:", quizInfoRows);
        if (quizInfoRows.length === 0) {
            //console.log("No QuizInformation found for QuizInformationId:", QuizInformationId);
            await connection.rollback();
            return res.status(Code.NotFound).json(NotFound);
        }
        const { ImageUrl } = quizInfoRows[0];
        //console.log("QuizInformationId:", QuizInformationId, "ImageUrl:", ImageUrl);

        // Fetch PlayIds
        const [playRows] = await connection.query<Play[]>(sqlSelectPlay, [
            QuizId,
        ]);
        //console.log("Fetched Play rows:", playRows);

        // Delete from SelectedAnswer based on PlayIds
        for (const playRow of playRows) {
            await connection.query(sqlDeleteSelectedAnswer, [playRow.PlayId]);
            //console.log("Deleted SelectedAnswer for PlayId:", playRow.PlayId);
        }

        // Fetch all comments for the quiz
        const [commentRows] = await connection.query<Comment[]>(
            sqlSelectComments,
            [QuizId]
        );
        //console.log("Fetched Comment rows:", commentRows);

        // Delete upvotes, downvotes, and child comments for each comment
        for (const commentRow of commentRows) {
            const commentId = commentRow.CommentId;
            await connection.query(sqlDeleteCommentUpvotes, [commentId]);
            //console.log("Deleted UpvoteComment for CommentId:", commentId);
            await connection.query(sqlDeleteCommentDownvotes, [commentId]);
            //console.log("Deleted DownvoteComment for CommentId:", commentId);
            await connection.query(sqlDeleteChildComments, [commentId]);
            //console.log("Deleted ChildComments for ParentCommentId:", commentId);
        }

        // Delete comments
        await connection.query(sqlDeleteComments, [QuizId]);
        //console.log("Deleted Comments for QuizId:", QuizId);

        // Delete from other tables
        await connection.query(sqlDeleteQI, [QuizInformationId]);
        //console.log("Deleted QuizInformation for QuizInformationId:", QuizInformationId);
        await connection.query(sqlDeleteQuiz, [QuizId]);
        //console.log("Deleted Quiz for QuizId:", QuizId);
        await connection.query(sqlDeleteQuizQuestion, [QuizId]);
        //console.log("Deleted QuizQuestion for QuizId:", QuizId);
        await connection.query(sqlDeletePlay, [QuizId]);
        //console.log("Deleted Play for QuizId:", QuizId);
        await connection.query(sqlDeleteLikes, [QuizId]);
        //console.log("Deleted Likes for QuizId:", QuizId);
        await connection.query(sqlDeleteRating, [QuizId]);
        //console.log("Deleted Rating for QuizId:", QuizId);

        if (ImageUrl) {
            // Delete image file
            //One .. is src
            //Two .. is root folder = localhost:3000
            const imagePath = path.join(__dirname, "..", "..", ImageUrl);
            //console.log("Deleting image file at path:", imagePath);
            fs.unlink(imagePath, async (err) => {
                if (err) {
                    console.error(`Error deleting file: ${imagePath}`, err);
                    await connection.rollback();
                    return res.status(Code.NotFound).json(NotFound);
                } else {
                    console.log(`Successfully deleted file: ${imagePath}`);
                }
            });
        }

        await connection.commit();
        //console.log("Transaction committed");

        return res.status(Code.OK).json(Delete);
    } catch (error) {
        //console.log("Error occurred:", error);
        await connection.rollback();
        return res.status(Code.InternalServerError).json(CatchError(error));
    } finally {
        connection.release();
        //console.log("Database connection released");
    }
};
