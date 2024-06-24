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
// import { AnswerRouter } from "./Answer/route";
// import { QuestionRouter } from "./Question/route";
// import { QuestionInformationRouter } from "./QuestionInformation/route";
import { UserRouter } from "./User/route";
import { QuizRouter } from "./Quiz/route";
import { QuizInformationRouter } from "./QuizInformation/route";
import { QuizQuestionRouter } from "./QuizQuestion/route";
import { TimeRouter } from "./Time/route";
import { QuestionDetailRouter } from "./QuestionDetail/route";
import { QuizDetailRouter } from "./QuizDetail/route";
import { PlayRouter } from "./Play/route";
import { SelectedAnswerRouter } from "./SelectedAnswer/route";
import { PlayDetailRouter } from "./PlayDetail/route";
import { CommentDetailRouter } from "./CommentDetail/route";
import { CommentRouter } from "./Comment/route";
import { UpvoteCommentRouter } from "./UpvoteComment/route";
import { DownvoteCommentRouter } from "./Downvotecomment/route";
import { RoomRouter } from "./Room/route";
// import { setupSocketIO } from "./RoomSocket/RoomSocket";
import { RoomDetailRouter } from "./RoomDetail/route";
import { CreateQuestionRouter } from "./CreateQuestion/route";
import { AdminRouter } from "./Admin/route";
import { CreateQuizRouter } from "./CreateQuiz/route";
import { UpdateQuestionRouter } from "./UpdateQuestion/route";

export const RouteObjects = [
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
    { path: "/User", router: UserRouter },
    { path: "/QuestionDetail", router: QuestionDetailRouter },
    { path: "/Quiz", router: QuizRouter },
    { path: "/QuizInformation", router: QuizInformationRouter },
    { path: "/QuizQuestion", router: QuizQuestionRouter },
    { path: "/Time", router: TimeRouter },
    { path: "/QuizDetail", router: QuizDetailRouter },
    { path: "/Play", router: PlayRouter },
    { path: "/SelectedAnswer", router: SelectedAnswerRouter },
    { path: "/PlayDetail", router: PlayDetailRouter },
    { path: "/CommentDetail", router: CommentDetailRouter },
    { path: "/Comment", router: CommentRouter },
    { path: "/UpvoteComment", router: UpvoteCommentRouter },
    { path: "/DownvoteComment", router: DownvoteCommentRouter },
    { path: "/Room", router: RoomRouter },
    { path: "/RoomDetail", router: RoomDetailRouter },
    { path: "/CreateQuestion", router: CreateQuestionRouter },
    { path: "/UpdateQuestion", router: UpdateQuestionRouter },
    { path: "/Admin", router: AdminRouter },
    { path: "/CreateQuiz", router: CreateQuizRouter },
];