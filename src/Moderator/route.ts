import express from "express";
import { ReadAll } from "./QuizVertify/ReadAll";
import { UpdateOne } from "./QuizVertify/UpdateOne";

export const ModeratorRouter = express.Router();

ModeratorRouter.get("/QuizVertify/ReadAll", ReadAll);
ModeratorRouter.put("/QuizVertify", UpdateOne);
