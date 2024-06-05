import express from "express";
import { ReadAll } from "./ReadAll";
import { ReadOne } from "./ReadOne";
import { CreateOne } from "./CreateOne";
import { UpdateOne } from "./UpdateOne";
import { DeleteOne } from "./DeleteOne";

export const TABLE = "Time";
export const TimeRouter = express.Router();

TimeRouter.get("/", ReadAll);
TimeRouter.get("/:TimeId", ReadOne);
TimeRouter.post("/", CreateOne);
TimeRouter.put("/", UpdateOne);
TimeRouter.delete("/", DeleteOne);
