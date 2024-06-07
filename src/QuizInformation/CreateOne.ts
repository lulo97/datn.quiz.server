import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

export const CreateOne = async (req: Request, res: Response) => {
    const { QuizInformationId, Name, Description, ImageUrl, IsPublic } =
        req.body;

    if (!QuizInformationId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }

    try {
        const sql = `
            INSERT INTO ${TABLE} (
                QuizInformationId,
                Name,
                Description,
                ImageUrl,
                Attempts,
                IsPublic,
                IsDeleted,
                IsVerified,
                UserVerify,
                VerifiedAt
            ) VALUES (?, ?, ?, ?, 0, ?, false, false, NULL, NULL);`;

        const params = [
            QuizInformationId,
            Name,
            Description,
            ImageUrl,
            IsPublic,
        ];

        const [result] = await pool.query<ResultSetHeader>(sql, params);
        return res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
