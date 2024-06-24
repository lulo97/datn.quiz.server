import { Request, Response } from "express";
import { pool } from "../Connect";
import { SubSubject } from "../InterfacesDatabase";
import { Code } from "../Code";
import { CatchError, NotFound } from "../MyResponse";
import { TABLE } from "./route";
import { MySQLFunctionReturn } from "./Utils";

interface FilterParams {
    fields?: string | string[];
    sortField?: string;
    sortDirection?: "ASC" | "DESC";
}

function buildSqlQuery(
    filterFields?: string[],
    sortField?: string,
    sortDirection?: "ASC" | "DESC"
) {
    let query = `SELECT getAllSubSubjectDetail() as data;`;
    // if (filterFields && filterFields.length > 0) {
    //     const sanitizedFields = filterFields.map((field) =>
    //         field.replace(/"/g, "")
    //     );
    //     query += ` WHERE subj.Name IN (${sanitizedFields
    //         .map((field) => `'${field}'`)
    //         .join(", ")}) `;
    // }
    // if (sortDirection && sortField) {
    //     query += `ORDER BY ${sortField} ${sortDirection} `;
    // }
    return query;
}

export const ReadAll = async (req: Request, res: Response) => {
    try {
        const { fields, sortField, sortDirection } = req.query as FilterParams;
        let filterFields: string[] | undefined;
        if (fields) {
            filterFields = Array.isArray(fields)
                ? fields
                : (fields as string).split(",");
        }
        const query = buildSqlQuery(filterFields, sortField, sortDirection);
        const [rows] = await pool.query<MySQLFunctionReturn[]>(query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        if (rows[0].data == null) {
            return res.status(Code.OK).json([]);
        }
        return res.status(Code.OK).json(rows[0].data);
    } catch (error) {
        console.error(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
