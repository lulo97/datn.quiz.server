import express, { Router, Request, Response } from "express";
import path from "path";
import { UploadMiddleware } from "./Middleware";
import { CatchError, FieldNotValid, UploadSuccess } from "../MyResponse";
import { Code } from "../Code";

export const UploadFileRouter: Router = express.Router();

UploadFileRouter.post("/", UploadMiddleware, (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(Code.BadRequest).json(FieldNotValid);
        }
        const relative_path = path.relative(process.cwd(), req.file.path);
        res.status(Code.OK).json(UploadSuccess(relative_path));
    } catch (error) {
        res.status(Code.InternalServerError).json(CatchError(error));
    }
});
