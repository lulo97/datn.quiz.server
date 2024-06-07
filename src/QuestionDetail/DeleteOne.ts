import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError, Delete, FieldNull, NotFound } from "../MyResponse";
import { RowDataPacket } from "mysql2";

// Define the interface for the expected row structure
interface QuestionInformationRow extends RowDataPacket {
    QuestionInformationId: string;
}

function getQueries() {
    return [
        `SELECT QuestionInformationId FROM Question WHERE QuestionId = ?`,
        `DELETE FROM QuestionInformation WHERE QuestionInformationId = ?`,
        `DELETE FROM Question WHERE QuestionId = ?`,
        `DELETE FROM Answer WHERE QuestionId = ?`
    ];
}

export const DeleteOne = async (req: Request, res: Response) => {
    const { QuestionId } = req.body;
    if (!QuestionId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const queries = getQueries();

        // Step 1: Retrieve the QuestionInformationId
        const [rows] = await connection.query<QuestionInformationRow[]>(queries[0], [QuestionId]);
        if (rows.length === 0) {
            await connection.rollback();
            return res.status(Code.NotFound).json(NotFound);
        }
        const QuestionInformationId = rows[0].QuestionInformationId;

        // Step 2: Delete from QuestionInformation
        await connection.query(queries[1], [QuestionInformationId]);

        // Step 3: Delete from Question
        await connection.query(queries[2], [QuestionId]);

        // Step 4: Delete from Answer
        await connection.query(queries[3], [QuestionId]);

        await connection.commit();
        res.status(Code.OK).json(Delete);

    } catch (error) {
        await connection.rollback();
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    } finally {
        connection.release();
    }
};
