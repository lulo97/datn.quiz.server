import { Request, Response } from "express";
import { pool } from "../Connect";
import { SubSubject } from "../InterfacesDatabase";
import { Code } from "../Code";
import { CatchError } from "../MyResponse";
import { TABLE } from "./route";

interface FilterParams {
    fields?: string | string[];
    sortField?: string;
    sortDirection?: 'ASC' | 'DESC';
}

function buildSqlQuery(filterFields?: string[], sortField?: string, sortDirection?: 'ASC' | 'DESC') {
    let query = `
        SELECT 
            sub.*, subj.SubjectId, subj.Name AS SubjectName,
            subj.Description AS SubjectDescription,
            subj.CreatedAt AS SubjectCreatedAt,
            subj.UpdateAt AS SubjectUpdatedAt
        FROM 
            ${TABLE} AS sub
        JOIN 
            subject AS subj ON sub.SubjectId = subj.SubjectId
        `;
    if (filterFields && filterFields.length > 0) {
        const sanitizedFields = filterFields.map(field => field.replace(/"/g, ''));
        query += ` WHERE subj.Name IN (${sanitizedFields.map(field => `'${field}'`).join(', ')}) `;
    }
    if (sortDirection && sortField) {
        query += `ORDER BY ${sortField} ${sortDirection} `;
    }
    return query;
}

export const ReadAll = async (req: Request, res: Response) => {
    try {
        const { fields, sortField, sortDirection } = req.query as FilterParams;

        let filterFields: string[] | undefined;
        if (fields) {
            filterFields = Array.isArray(fields) ? fields : (fields as string).split(',');
        }

        const query = buildSqlQuery(filterFields, sortField, sortDirection);

        const [rows] = await pool.query<SubSubject[]>(query);
        res.status(Code.OK).json(rows);
    } catch (error) {
        console.error(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
