import express from "express";
import { Request, Response } from "express";
import { UpdateOne } from "./UpdateOne";
export const TABLE = "CreateQuestion";
export const UpdateQuestionRouter = express.Router();

UpdateQuestionRouter.get("/", (req: Request, res: Response) =>
    res.json("UpdateQuestionRouter")
);
UpdateQuestionRouter.post("/", UpdateOne);
