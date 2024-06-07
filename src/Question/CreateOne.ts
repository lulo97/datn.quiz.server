import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

export const CreateOne = async (req: Request, res: Response) => {
    const {
        QuestionId,
        QuestionInformationId,
        UserId,
        TypeId,
        SubSubjectId,
        EducationLevelId,
        DifficultLevelId,
        LanguageId,
        PointId,
        PenaltyPointId,
    } = req.body;

    if (!QuestionId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }

    try {
        const sql = `
            INSERT INTO ${TABLE} (
                QuestionId,
                QuestionInformationId,
                UserId,
                TypeId,
                SubSubjectId,
                EducationLevelId,
                DifficultLevelId,
                LanguageId,
                PointId,
                PenaltyPointId
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        const params = [
            QuestionId,
            QuestionInformationId,
            UserId,
            TypeId,
            SubSubjectId,
            EducationLevelId,
            DifficultLevelId,
            LanguageId,
            PointId,
            PenaltyPointId,
        ];

        const [result] = await pool.query<ResultSetHeader>(sql, params);
        return res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
