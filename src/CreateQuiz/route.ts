import express from "express";
import { Request, Response } from "express";
import { CreateOne } from "./CreateOne";
export const TABLE = "CreateQuestion";
export const CreateQuizRouter = express.Router();

CreateQuizRouter.get("/", (req: Request, res: Response) =>
    res.json("CreateQuizRouter")
);
CreateQuizRouter.post("/", CreateOne);
