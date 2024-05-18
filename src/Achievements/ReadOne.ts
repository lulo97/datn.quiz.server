import { Request, Response } from "express";
import { pool } from "../Connect";
import { Achievements } from "../InterfacesDatabase";
import { CatchError, NotFound } from "../MyResponse";
import { Code } from "../Code";
import { TABLE } from "./route";

function sql(AchievementId: string) {
    return `SELECT * FROM ${TABLE} WHERE AchievementId = '${AchievementId}'`;
}

export const ReadOne = async (req: Request, res: Response) => {
    const AchievementId = req.params.AchievementId;
    try {
        const sql_query = sql(AchievementId);
        const [rows] = await pool.query<Achievements[]>(sql_query);
        if (rows.length === 0) {
            return res.status(Code.NotFound).json(NotFound);
        }
        res.status(Code.OK).json(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(Code.InternalServerError).json(CatchError(error));
    }
};
