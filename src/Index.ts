import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

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

const routeObjects = [
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
];

routeObjects.forEach(({ path, router }) => {
    app.use(path, router);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
