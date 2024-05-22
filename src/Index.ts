import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
//To access static file directly
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => res.send("Hello world!"))

import { AchievementRouter } from "./Achievements/route";
import { DifficultLevelRouter } from "./DifficultLevel/route";
import { EducationLevelRouter } from "./EducationLevel/route";
import { PermissionRouter } from "./Permission/route";
import { ReportReasonRouter } from "./ReportReason/route";
import { ReportTargetRouter } from "./ReportTarget/route";
import { RoleRouter } from "./Role/route";
import { LanguageRouter } from "./Language/route";
import { SubjectRouter } from "./Subject/route";
import { SubSubjectRouter } from "./SubSubject/route";
import { TypeRouter } from "./Type/route";
import { PointRouter } from "./Point/route";
import { UploadFileRouter } from "./UploadFile/UploadFile";
import { AnswerRouter } from "./Answer/route";
import { QuestionRouter } from "./Question/route";
import { QuestionInformationRouter } from "./QuestionInformation/route";

const routeObjects = [
    { path: "/Upload", router: UploadFileRouter },
    { path: "/Achievements", router: AchievementRouter },
    { path: "/DifficultLevel", router: DifficultLevelRouter },
    { path: "/EducationLevel", router: EducationLevelRouter },
    { path: "/Permission", router: PermissionRouter },
    { path: "/ReportReason", router: ReportReasonRouter },
    { path: "/ReportTarget", router: ReportTargetRouter },
    { path: "/Role", router: RoleRouter },
    { path: "/Language", router: LanguageRouter },
    { path: "/Subject", router: SubjectRouter },
    { path: "/SubSubject", router: SubSubjectRouter },
    { path: "/Type", router: TypeRouter },
    { path: "/Point", router: PointRouter },
    { path: "/Answer", router: AnswerRouter },
    { path: "/Question", router: QuestionRouter },
    { path: "/QuestionInformation", router: QuestionInformationRouter },
];

routeObjects.forEach(({ path, router }) => {
    app.use(path, router);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
