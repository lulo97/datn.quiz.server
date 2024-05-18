import express from "express";
import { ReadAll } from "./ReadAll";
import { ReadOne } from "./ReadOne";
import { CreateOne } from "./CreateOne";
import { UpdateOne } from "./UpdateOne";
import { DeleteOne } from "./DeleteOne";

export const TABLE = "Type";
export const TypeRouter = express.Router();

TypeRouter.get("/", ReadAll);
TypeRouter.get("/:TypeId", ReadOne);
TypeRouter.post("/", CreateOne);
TypeRouter.put("/", UpdateOne);
TypeRouter.delete("/", DeleteOne);
