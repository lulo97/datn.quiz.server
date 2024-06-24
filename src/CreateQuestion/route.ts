import express from "express";
import { Request, Response } from "express";
import { CreateOne } from "./CreateOne";
export const TABLE = "CreateQuestion";
export const CreateQuestionRouter = express.Router();

CreateQuestionRouter.get("/", (req: Request, res: Response) =>
    res.json("CreateQuestionRouter")
);
CreateQuestionRouter.post("/", CreateOne);
