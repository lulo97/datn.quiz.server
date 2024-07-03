import express from "express";
import { CreateOne } from "./CreateOne";
import { DeleteOne } from "./DeleteOne";

export const QuizRouter = express.Router();

QuizRouter.post("/", CreateOne);
QuizRouter.delete("/", DeleteOne);