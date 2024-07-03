import express from "express";
import { ReadOne } from "./ReadOne";
import { ReadAllBySubject } from "./ReadAllBySubject";
import { ReadAllByUser } from "./ReadAllByUser";
import { ReadAll } from "./ReadAll";
import { ReadAllByQuizId } from "./ReadAllByQuizId";
import { ReadAllByEducationLevel } from "./ReadAllByEducationLevel";
import { ReadAllBySubjectAndEducationLevel } from "./ReadAllBySubjectAndEducationLevel";

export const QuestionDetailRouter = express.Router();

QuestionDetailRouter.get("/", ReadAll);
QuestionDetailRouter.get("/:QuestionId", ReadOne);
QuestionDetailRouter.get("/ReadAllBySubject/:SubjectId", ReadAllBySubject);
QuestionDetailRouter.get("/ReadAllByUser/:UserId", ReadAllByUser);
QuestionDetailRouter.get("/ReadAllByQuizId/:QuizId", ReadAllByQuizId);
QuestionDetailRouter.get(
    "/ReadAllByEducationLevel/:EducationLevelId",
    ReadAllByEducationLevel
);
QuestionDetailRouter.get(
    "/ReadAllBySubjectAndEducationLevel/:SubjectId/:EducationLevelId",
    ReadAllBySubjectAndEducationLevel
);
