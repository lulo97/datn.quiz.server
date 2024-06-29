import express from "express";
import { UpdateOne } from "./UpdateOne";
import { ReadAll } from "./ReadAll";

export const TABLE = "UserRole";
export const UserRoleRouter = express.Router();

UserRoleRouter.get("/", ReadAll);
UserRoleRouter.put("/", UpdateOne);
