import express from "express";
import { Request, Response } from "express";
import { CreateOne } from "./CreateOne";

export const CreatePlayRouter = express.Router();

CreatePlayRouter.get("/", (req: Request, res: Response) =>
    res.json("CreatePlayRouter")
);
CreatePlayRouter.post("/", CreateOne);
