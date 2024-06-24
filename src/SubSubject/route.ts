import express from "express";
import { ReadAll } from "./ReadAll";
import { ReadOne } from "./ReadOne";
import { CreateOne } from "./CreateOne";
import { UpdateOne } from "./UpdateOne";
import { DeleteOne } from "./DeleteOne";
import { ReadBySubjectAndEducationLevel } from "./ReadBySubjectAndEducationLevel";
import { ReadBySubject } from "./ReadBySubject";

export const TABLE = "SubSubject";
export const SubSubjectRouter = express.Router();

SubSubjectRouter.get("/", ReadAll);
SubSubjectRouter.get("/:SubSubjectId", ReadOne);
SubSubjectRouter.get(
    "/GetBySubjectAndEducationLevel/:SubjectId/:EducationLevelId",
    ReadBySubjectAndEducationLevel
);
SubSubjectRouter.get("/GetBySubject/:SubjectId", ReadBySubject);
SubSubjectRouter.post("/", CreateOne);
SubSubjectRouter.put("/", UpdateOne);
SubSubjectRouter.delete("/", DeleteOne);
