import { Request, Response } from "express";
import { pool } from "../Connect";
import { SubSubject } from "../InterfacesDatabase";
import { Code } from "../Code";
import { CatchError, FieldNull } from "../MyResponse";
import { TABLE } from "./route";

function sql(SubjectId: string) {
    return `            
    SELECT sub.*
    FROM 
        ${TABLE} AS sub
    JOIN 
        subject AS subj ON sub.SubjectId = subj.SubjectId
    WHERE 
        subj.SubjectId = '${SubjectId}';
    `;
}

export const ReadBySubject = async (
    req: Request,
    res: Response
) => {
    const { SubjectId } = req.params;
    console.log(SubjectId)
    if (!SubjectId) {
        return res.status(Code.BadRequest).json(FieldNull);
    }
    try {
        console.log(sql(SubjectId));
        const [rows] = await pool.query<SubSubject[]>(
            sql(SubjectId)
        );
        return res.status(Code.OK).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
