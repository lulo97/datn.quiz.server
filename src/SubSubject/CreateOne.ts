import { Request, Response } from "express";
import { pool } from "../Connect";
import { ResultSetHeader } from "mysql2/promise";
import { CatchError, Create, FieldNull } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(
    SubjectId: string,
    EducationLevelId: string,
    Name: string,
    Description: string
) {
    return `INSERT INTO ${TABLE} (SubjectId, EducationLevelId, Name, Description) VALUES ('${SubjectId}', '${EducationLevelId}', '${Name}', '${
        Description ? Description : "NULL"
    }')`;
}

export const CreateOne = async (req: Request, res: Response) => {
    const { SubjectId, EducationLevelId, Name, Description } = req.body;
    if (!Name || !SubjectId || !EducationLevelId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const sql_query = sql(SubjectId, EducationLevelId, Name, Description);
        const [result] = await pool.query<ResultSetHeader>(sql_query);
        return res.status(Code.Created).json(Create);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
