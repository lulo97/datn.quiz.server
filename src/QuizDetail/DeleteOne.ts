import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError, Delete, FieldNull, NotFound } from "../MyResponse";
import { RowDataPacket } from "mysql2";

const sqlSelectQI = "SELECT QuizInformationId FROM Quiz WHERE QuizId = ?";

const sqlDeleteQI = "DELETE FROM QuizInformation WHERE QuizInformationId = ?";

const sqlDeleteQuiz = "DELETE FROM Quiz WHERE QuizId = ?";

const sqlDeleteQuizQuestion = "DELETE FROM QuizQuestion WHERE QuizId = ?";

interface QIRow extends RowDataPacket {
    QuizInformationId: string;
}

export const DeleteOne = async (req: Request, res: Response) => {
    const { QuizId } = req.body;
    if (!QuizId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [rows] = await connection.query<QIRow[]>(sqlSelectQI, [QuizId]);

        if (rows.length === 0) {
            await connection.rollback();
            return res.status(Code.NotFound).json(NotFound);
        }

        const QuizInformationId = rows[0].QuizInformationId;
        await connection.query(sqlDeleteQI, [QuizInformationId]);
        await connection.query(sqlDeleteQuiz, [QuizId]);
        await connection.query(sqlDeleteQuizQuestion, [QuizId]);
        await connection.commit();

        return res.status(Code.OK).json(Delete);
    } catch (error) {
        await connection.rollback();
        return res.status(Code.InternalServerError).json(CatchError(error));
    } finally {
        connection.release();
    }
};
