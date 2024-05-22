import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { MulterStorage } from "./MulterStorage";
import { CatchError } from "../MyResponse";
import { Code } from "../Code";

const upload = multer({ storage: MulterStorage }).single("file");

export const UploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err: any) => {
        if (err) {
            return res.status(Code.InternalServerError).json(CatchError(err));
        }
        next();
    });
};