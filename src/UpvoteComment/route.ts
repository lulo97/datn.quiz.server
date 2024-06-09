import express from "express";
import { CreateOne } from "./CreateOne";
import { DeleteOne } from "./DeleteOne";

export const TABLE = "UpvoteComment";
export const UpvoteCommentRouter = express.Router();

UpvoteCommentRouter.post("/", CreateOne);
UpvoteCommentRouter.delete("/", DeleteOne);
