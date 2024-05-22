import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

export const CreateOne = async (req: Request, res: Response) => {
    const {
        QuestionInformationId,
        Content,
        ImageUrl,
        AudioUrl,
        Explanation,
        CorrectUserCount,
        IncorrectUserCount,
        IsDeleted,
        IsAllowPenalty
    } = req.body;

    if (!QuestionInformationId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }

    try {
        const sql = `
        INSERT INTO ${TABLE} (
            QuestionInformationId,
            Content,
            ImageUrl,
            AudioUrl,
            Explanation,
            CorrectUserCount,
            IncorrectUserCount,
            IsDeleted,
            IsAllowPenalty
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?
        );`;

        const params = [
            QuestionInformationId,
            Content,
            ImageUrl,
            AudioUrl,
            Explanation,
            CorrectUserCount,
            IncorrectUserCount,
            IsDeleted,
            IsAllowPenalty,
        ];

        const [result] = await pool.query<ResultSetHeader>(sql, params);
        res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
