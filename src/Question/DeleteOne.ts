import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError, Delete, FieldNull, NotFound } from "../MyResponse";
import {
    Question,
    QuestionInformation,
    QuizQuestion,
} from "../InterfacesDatabase";
import path from "path";
import fs from "fs";

// Define query constants
const sqlSelectQuestion = "SELECT * FROM Question WHERE QuestionId = ?";
const sqlSelectQuestionInformation =
    "SELECT * FROM QuestionInformation WHERE QuestionInformationId = ?";
const sqlSelectQuizQuestion = "SELECT * FROM QuizQuestion WHERE QuestionId = ?";

const sqlDeleteQuestionInfo =
    "DELETE FROM QuestionInformation WHERE QuestionInformationId = ?";
const sqlDeleteQuestion = "DELETE FROM Question WHERE QuestionId = ?";
const sqlDeleteAnswer = "DELETE FROM Answer WHERE QuestionId = ?";

const ErrorQuestionInQuiz = "Question in Quiz";

export const DeleteOne = async (req: Request, res: Response) => {
    const { QuestionId } = req.body;
    if (!QuestionId) {
        //console.log("QuestionId is null or undefined.");
        return res.status(Code.BadRequest).json(FieldNull);
    }

    const connection = await pool.getConnection();
    //console.log("Connection established.");

    try {
        await connection.beginTransaction();
        //console.log("Transaction started.");

        //Check if the QuestionId exists in QuizQuestion
        const [quizQuestionRows] = await connection.query<QuizQuestion[]>(
            sqlSelectQuizQuestion,
            [QuestionId]
        );
        //console.log("Quiz question rows:", quizQuestionRows);

        if (quizQuestionRows.length > 0) {
            //console.log("Question is in quiz. Rolling back transaction.");
            await connection.rollback();
            return res.status(Code.OK).json({ error: ErrorQuestionInQuiz });
        }

        //Retrieve the QuestionInformationId in Question table
        const [questionRows] = await connection.query<Question[]>(
            sqlSelectQuestion,
            [QuestionId]
        );
        //console.log("Question info rows:", questionRows);

        if (questionRows.length === 0) {
            //console.log("Question not found. Rolling back transaction.");
            await connection.rollback();
            return res.status(Code.NotFound).json(NotFound);
        }
        const { QuestionInformationId } = questionRows[0];

        //Get file urls from QuestionInformation
        const [questionInfoRows] = await connection.query<
            QuestionInformation[]
        >(sqlSelectQuestionInformation, [QuestionInformationId]);
        //console.log("QuestionInformation info rows:", questionInfoRows);

        if (questionInfoRows.length === 0) {
            //console.log("Question information not found. Rolling back transaction.");
            await connection.rollback();
            return res.status(Code.NotFound).json(NotFound);
        }
        const { ImageUrl, AudioUrl } = questionInfoRows[0];

        //Delete from QuestionInformation
        await connection.query(sqlDeleteQuestionInfo, [QuestionInformationId]);
        //console.log("Deleted from QuestionInformation.");

        //Delete from Question
        await connection.query(sqlDeleteQuestion, [QuestionId]);
        //console.log("Deleted from Question.");

        //Delete from Answer
        await connection.query(sqlDeleteAnswer, [QuestionId]);
        //console.log("Deleted from Answer.");

        if (ImageUrl) {
            const filePath = path.join(__dirname, "..", "..", ImageUrl);
            fs.unlink(filePath, async (err) => {
                if (err) {
                    //console.error(`Error deleting file: ${filePath}`, err);
                    await connection.rollback();
                    //console.log("Error deleting image file. Rolling back transaction.");
                    return res.status(Code.NotFound).json(NotFound);
                } else {
                    //console.log(`Successfully deleted file: ${filePath}`);
                }
            });
        }

        if (AudioUrl) {
            const filePath = path.join(__dirname, "..", "..", AudioUrl);
            fs.unlink(filePath, async (err) => {
                if (err) {
                    //console.error(`Error deleting file: ${filePath}`, err);
                    await connection.rollback();
                    //console.log("Error deleting audio file. Rolling back transaction.");
                    return res.status(Code.NotFound).json(NotFound);
                } else {
                    //console.log(`Successfully deleted file: ${filePath}`);
                }
            });
        }

        await connection.commit();
        //console.log("Transaction committed successfully.");
        return res.status(Code.OK).json(Delete);
    } catch (error) {
        await connection.rollback();
        //console.error("Error during transaction:", error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    } finally {
        connection.release();
        //console.log("Connection released.");
    }
};
