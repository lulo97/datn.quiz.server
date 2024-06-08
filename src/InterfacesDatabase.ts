import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
    UserId: string;
    ClerkId: string;
    Fullname: string;
    Username: string;
    Email: string;
    Biography: string;
    ImageUrl: string;
    CreatedAt: string;
}

export interface Achievements extends RowDataPacket {
    AchievementId: string;
    ImageUrl: string;
    Name: string;
    Description: string;
    CreatedAt: string;
}

export interface UserAchievement extends RowDataPacket {
    UserAchievementId: string;
    UserId: string;
    AchievementId: string;
    CreatedAt: string;
}

export interface Question extends RowDataPacket {
    QuestionId: string;
    QuestionInformationId: string;
    UserId: string;
    TypeId: string;
    SubSubjectId: string;
    EducationLevelId: string;
    DifficultLevelId: string;
    LanguageId: string;
    PointId: string;
    PenaltyPointId: string;
}

export interface QuestionInformation extends RowDataPacket {
    QuestionInformationId: string;
    Content: string;
    ImageUrl: string;
    AudioUrl: string;
    Explanation: string;
    CorrectUserCount: number;
    IncorrectUserCount: number;
    IsDeleted: boolean;
    IsAllowPenalty: boolean;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Answer extends RowDataPacket {
    AnswerId: string;
    QuestionId: string;
    Content: string;
    IsCorrect: boolean;
}

export interface QuizInformation extends RowDataPacket {
    QuizInformationId: string;
    Name: string;
    Description: string;
    ImageUrl: string;
    Attempts: number;
    IsPublic: boolean;
    Time: number;
    IsDeleted: boolean;
    IsVerified: boolean;
    UserVerify: string;
    VerifiedAt: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Quiz extends RowDataPacket {
    QuizId: string;
    UserId: string;
    QuizInformationId: string;
    EducationLevelId: string;
    SubjectId: string;
    TimeId: string;
}

export interface SubSubject extends RowDataPacket {
    SubSubjectId: string;
    SubjectId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface QuizQuestion extends RowDataPacket {
    QuizQuestionId: string;
    QuizId: string;
    QuestionId: string;
}

export interface Subject extends RowDataPacket {
    SubjectId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface EducationLevel extends RowDataPacket {
    EducationLevelId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Language extends RowDataPacket {
    LanguageId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Type extends RowDataPacket {
    TypeId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface DifficultLevel extends RowDataPacket {
    DifficultLevelId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Play extends RowDataPacket {
    PlayId: string;
    UserId: string;
    QuizId: string;
    RoomId: string;
    StartTime: string;
    SubmitTime: string;
    Score: number;
    CreatedAt: string;
}

export interface SelectedAnswer extends RowDataPacket {
    SelectedAnswerId: string;
    PlayId: string;
    AnswerId: string;
}

export interface Like extends RowDataPacket {
    LikeId: string;
    QuizId: string;
    UserId: string;
    CreatedAt: string;
}

export interface Comment extends RowDataPacket {
    CommentId: string;
    ParentId: string;
    CreateUserId: string;
    CreatedAt: string;
    UpdatedAt: string;
    Content: string;
    UpvoteCount: number;
    DownvoteCount: number;
}

export interface UpvoteComment extends RowDataPacket {
    UpvoteCommentId: string;
    CommentId: string;
    UserId: string;
    CreatedAt: string;
}

export interface DownvoteComment extends RowDataPacket {
    DownvoteCommentId: string;
    CommentId: string;
    UserId: string;
    CreatedAt: string;
}

export interface Follow extends RowDataPacket {
    FollowId: string;
    FollowerId: string;
    FolloweeId: string;
    CreatedAt: string;
}

export interface Notification extends RowDataPacket {
    NotificationId: string;
    UserReceived: string;
    UserSent: string;
    Name: string;
    Content: string;
    CreatedAt: string;
    IsRead: boolean;
    IsVisible: boolean;
}

export interface Room extends RowDataPacket {
    RoomId: string;
    QuizId: string;
    UserId: string;
    Name: string;
    StartTime: string;
    EndTime: string;
    Capacity: number;
    CreatedAt: string;
}

export interface UserInRoom extends RowDataPacket {
    UserInRoom: string;
    UserId: string;
    RoomId: string;
    StartTime: string;
    EndTime: string;
    TotalQuestionViewed: number;
    CurrentQuestionIndex: number;
    CurrentScore: number;
}

export interface Role extends RowDataPacket {
    RoleId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface UserRole extends RowDataPacket {
    UserRoleId: string;
    UserId: string;
    RoleId: string;
}

export interface Permission extends RowDataPacket {
    PermissionId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface RolePermission extends RowDataPacket {
    RolePermissionId: string;
    RoleId: string;
    PermissionId: string;
}

export interface Rating extends RowDataPacket {
    RatingId: string;
    UserId: string;
    QuizId: string;
    Score: number;
    Content: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Report extends RowDataPacket {
    ReportId: string;
    ReportReasonId: string;
    ReportTargetId: string;
    UserId: string;
    ParentId: string;
    Content: string;
    CreatedAt: string;
    IsResolved: boolean;
    UserResolve: string;
}

export interface ReportTarget extends RowDataPacket {
    ReportTargetId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface ReportReason extends RowDataPacket {
    ReportReasonId: string;
    Name: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Point extends RowDataPacket {
    PointId: string;
    Value: number;
    IsPenalty: boolean;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface Time extends RowDataPacket {
    TimeId: string;
    Value: number;
    CreatedAt: string;
    UpdatedAt: string;
}
