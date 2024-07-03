import express from "express";
import { UpdateOne } from "./UpdateOne";
import { CreateOne } from "./CreateOne";
import { DeleteOne } from "./DeleteOne";

export const QuestionTable = "Question"
export const QuestionInfoTable = "QuestionInformation"
export const AnswerTable = "Answer"

export const QuestionRouter = express.Router();

QuestionRouter.post("/", CreateOne);
QuestionRouter.put("/", UpdateOne);
QuestionRouter.delete("/", DeleteOne);