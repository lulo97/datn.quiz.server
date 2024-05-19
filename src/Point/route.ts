import express from "express";
import { ReadAll } from "./ReadAll";
import { ReadOne } from "./ReadOne";
import { CreateOne } from "./CreateOne";
import { UpdateOne } from "./UpdateOne";
import { DeleteOne } from "./DeleteOne";

export const TABLE = "Point";
export const PointRouter = express.Router();

PointRouter.get("/", ReadAll);
PointRouter.get("/:PointId", ReadOne);
PointRouter.post("/", CreateOne);
PointRouter.put("/", UpdateOne);
PointRouter.delete("/", DeleteOne);
