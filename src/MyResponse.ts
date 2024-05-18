import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export interface MyResponse {
    message?: string;
    error?: string | unknown;
    result?: ResultSetHeader;
    rows?: RowDataPacket[];
    fields?: FieldPacket[];
}

export const FieldNull: MyResponse = {
    error: "Field cannot be null",
};

export const NotFound: MyResponse = {
    error: "Not found",
};

export const Delete: MyResponse = {
    message: "Deleted successfully",
};

export const Update: MyResponse = {
    message: "Updated successfully",
};

export const Create: MyResponse = {
    message: "Added successfully",
};

export function CatchError(error: unknown): MyResponse {
    return {
        error: error,
    };
}
