import express from "express";
import { CreateOne } from "./CreateOne";
import { DeleteOne } from "./DeleteOne";

export const TABLE = "DownvoteComment";
export const DownvoteCommentRouter = express.Router();

DownvoteCommentRouter.post("/", CreateOne);
DownvoteCommentRouter.delete("/", DeleteOne);
