import { Request, Response } from "express";
import { pool } from "../Connect";
import { SubSubject } from "../InterfacesDatabase";
import { Code } from "../Code";
import { CatchError } from "../MyResponse";
import { TABLE } from "./route";

function sql() {
    return `
    SELECT 
        sub.*,
        subj.SubjectId AS SubjectId,
        subj.Name AS SubjectName,
        subj.Description AS SubjectDescription,
        subj.CreatedAt AS SubjectCreatedAt,
        subj.UpdateAt AS SubjectUpdatedAt
    FROM 
        ${TABLE} AS sub
    JOIN 
        subject AS subj ON sub.SubjectId = subj.SubjectId;
    `;
}

export const ReadAll = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query<SubSubject[]>(sql());
        res.status(Code.OK).json(rows);
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
