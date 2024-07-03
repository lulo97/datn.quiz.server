import { Request, Response } from "express";
import { pool } from "../Connect";
import { Code } from "../Code";
import { CatchError, NotFound } from "../MyResponse";
import { MySQLFunctionReturn, SubSubjectDetail } from "./Utils";
import { TONG_HOP } from "../Utils";

//undefined ascend descend
/*
Name ascend
Subject descend
EducationLevel ascend
*/

function sql() {
    let query = `SELECT getAllSubSubjectDetail() as data;`;
    return query;
}

function doSort(
    data: SubSubjectDetail[],
    field: string | undefined,
    sort: string | undefined
) {
    if (!field || !sort) return data;
    if (field == "Name") {
        if (sort == "ascend") {
            return data.sort((a, b) => a.Name.localeCompare(b.Name));
        }
        if (sort == "descend") {
            return data.sort((a, b) => b.Name.localeCompare(a.Name));
        }
        return data;
    }
    if (field == "Subject") {
        if (sort == "ascend") {
            return data.sort((a, b) =>
                a.Subject.Name.localeCompare(b.Subject.Name)
            );
        }
        if (sort == "descend") {
            return data.sort((a, b) =>
                b.Subject.Name.localeCompare(a.Subject.Name)
            );
        }
        return data;
    }
    if (field == "EducationLevel") {
        if (sort == "ascend") {
            return data.sort((a, b) =>
                a.EducationLevel.Name.localeCompare(b.EducationLevel.Name)
            );
        }
        if (sort == "descend") {
            return data.sort((a, b) =>
                b.EducationLevel.Name.localeCompare(a.EducationLevel.Name)
            );
        }
        return data;
    }
    return data;
}

function toUndefined(value: string) {
    return value === "undefined" || value == TONG_HOP ? undefined : value;
}

function doFilter(
    data: SubSubjectDetail[],
    subjectFilter: string,
    educationFilter: string
) {
    let _subjectFilter = toUndefined(subjectFilter);
    let _educationFilter = toUndefined(educationFilter);

    if (!_subjectFilter && !_educationFilter) {
        return data;
    }

    if (_subjectFilter && !_educationFilter) {
        const filteredData = data.filter(
            (ele) => ele.Subject.Name == _subjectFilter
        );

        return filteredData;
    }

    if (_educationFilter && !_subjectFilter) {
        const filteredData = data.filter(
            (ele) => ele.EducationLevel.Name == _educationFilter
        );

        return filteredData;
    }

    if (_subjectFilter && _educationFilter) {
        const filteredData = data.filter(
            (ele) =>
                ele.Subject.Name == _subjectFilter &&
                ele.EducationLevel.Name == _educationFilter
        );

        return filteredData;
    }

    return data;
}

export const ReadAll = async (req: Request, res: Response) => {
    try {
        const { field, sort, subjectFilter, educationFilter } = req.params;

        const [rows] = await pool.query<MySQLFunctionReturn[]>(sql());
        if (rows[0].data == null) {
            return res.status(Code.OK).json([]);
        }
        let data = rows[0].data;
        data = doSort(data, field, sort);
        data = doFilter(data, subjectFilter, educationFilter);
        return res.status(Code.OK).json(data);
    } catch (error) {
        console.error(error);
        return res.status(Code.InternalServerError).json(CatchError(error));
    }
};
