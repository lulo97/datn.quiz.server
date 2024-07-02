import { Request, Response } from "express";
import { pool } from "../../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { Code } from "../../Code";
import { CatchError, FieldNull, NotFound, Update } from "../../MyResponse";
import { formatVietnameseDatetime } from "../../Utils";

function sql(
    QuizInformationId: string,
    UserVertify: string,
    dateVerifiedAt: string
) {
    return `UPDATE quizinformation 
            SET 
                UserVertify = '${UserVertify}', 
                VerifiedAt = '${dateVerifiedAt}' 
            WHERE QuizInformationId = '${QuizInformationId}'`;
}

export const UpdateOne = async (req: Request, res: Response) => {
    const { QuizInformationId, UserVertify, VerifiedAt } = req.body;
    if (!QuizInformationId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const dateVerifiedAt = formatVietnameseDatetime(VerifiedAt / 1000);
        const sql_query = sql(QuizInformationId, UserVertify, dateVerifiedAt);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        if (result.affectedRows === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(Update);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
