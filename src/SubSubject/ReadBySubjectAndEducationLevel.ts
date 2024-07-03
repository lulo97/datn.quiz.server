import { Request, Response } from "express";
import { pool } from "../Connect";
import { SubSubject } from "../InterfacesDatabase";
import { Code } from "../Code";
import { CatchError, FieldNull } from "../MyResponse";
import { TABLE } from "./route";

function sql(SubjectId: string, EducationLevelId: string) {
    return `            
    SELECT sub.*
    FROM 
        ${TABLE} AS sub
    JOIN 
        subject AS subj ON sub.SubjectId = subj.SubjectId
    JOIN
        educationlevel AS el ON sub.EducationLevelId = el.EducationLevelId
    WHERE 
        subj.SubjectId = '${SubjectId}'
    AND el.EducationLevelId = '${EducationLevelId}';
    `;
}

export const ReadBySubjectAndEducationLevel = async (
    req: Request,
    res: Response
) => {
    const { SubjectId, EducationLevelId } = req.params;
    if (!SubjectId || !EducationLevelId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        const [rows] = await pool.query<SubSubject[]>(
            sql(SubjectId, EducationLevelId)
        );
        return res.status(Code.OK).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
