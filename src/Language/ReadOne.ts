import { Request, Response } from "express";
import { pool } from "../Connect";
import { Language } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(LanguageId: string) {
    return `SELECT * FROM ${TABLE} WHERE LanguageId = '${LanguageId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const LanguageId = req.params.LanguageId;
    try {
        const sql_query = sql(LanguageId);
        const [rows] = await pool.query<Language[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        return res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
