import { ResultSetHeader } from "mysql2";
import { formatVietnameseDatetime } from "../Utils";
import { RoomSocketData } from "./Interfaces";
import { pool } from "../Connect";

export function calculateUserScore(
    roomData: RoomSocketData,
    UserId: string
): number {
    const user = roomData.UserDatas.find(
        (userData) => userData.User.UserId === UserId
    );
    if (!user) {
        throw new Error("User not found in the room");
    }

    const quiz = roomData.Room.Quiz;
    let score = 0;

    quiz.Questions.forEach((question, idx) => {
        const correctAnswers = question.Answers.filter(
            (answer) => answer.IsCorrect
        );
        const userAnswer = roomData.Messages.find(
            (message) => message.UserId === UserId
        );

        if (userAnswer) {
            const userSelectedAnswers =
                userAnswer.Response[idx].SelectedAnswers;

            const isCorrect =
                correctAnswers.every((correctAnswer) =>
                    userSelectedAnswers.includes(correctAnswer.AnswerId)
                ) && correctAnswers.length === userSelectedAnswers.length;

            if (isCorrect) {
                score += question.Point ? question.Point.Value : 0;
            }
        }
    });
    return score;
}

export interface UserInRoomInsert {
    UserId: string;
    RoomId: any;
    StartTime: number;
    EndTime: number;
    TotalQuestionViewed: number;
    CurrentQuestionIndex: number;
    CurrentScore: number;
}

export interface PlayInsert {
    PlayId: string;
    UserId: string;
    QuizId: string;
    RoomId: any;
    StartTime: number;
    SubmitTime: number;
    Score: number;
}

export interface SelectedAnswerInsert {
    AnswerId: string;
    PlayId: string;
}

export async function handleInsertInto(
    UserInRoomRecords: UserInRoomInsert[],
    PlayRecords: PlayInsert[],
    SelectedAnswerRecords1D: SelectedAnswerInsert[]
) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Insert UserInRoomRecords
        for (const record of UserInRoomRecords) {
            const {
                UserId,
                RoomId,
                StartTime,
                EndTime,
                TotalQuestionViewed,
                CurrentQuestionIndex,
                CurrentScore,
            } = record;
            const startTimeDatetime = formatVietnameseDatetime(
                StartTime / 1000
            );
            const endTimeDatetime = formatVietnameseDatetime(EndTime / 1000);
            const sqlQuery = `
                INSERT INTO UserInRoom (UserId, RoomId, StartTime, EndTime, TotalQuestionViewed, CurrentQuestionIndex, CurrentScore)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            await connection.query<ResultSetHeader>(sqlQuery, [
                UserId,
                RoomId,
                startTimeDatetime,
                endTimeDatetime,
                TotalQuestionViewed,
                CurrentQuestionIndex,
                CurrentScore,
            ]);
        }

        // Insert PlayRecords
        for (const record of PlayRecords) {
            const {
                PlayId,
                UserId,
                QuizId,
                RoomId,
                StartTime,
                SubmitTime,
                Score,
            } = record;
            const startTimeDatetime = formatVietnameseDatetime(
                StartTime / 1000
            );
            const submitTimeDatetime = formatVietnameseDatetime(
                SubmitTime / 1000
            );
            const sqlQuery = `
                INSERT INTO Play (PlayId, UserId, QuizId, RoomId, StartTime, SubmitTime, Score)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            await connection.query<ResultSetHeader>(sqlQuery, [
                PlayId,
                UserId,
                QuizId,
                RoomId,
                startTimeDatetime,
                submitTimeDatetime,
                Score,
            ]);
        }

        for (const record of SelectedAnswerRecords1D) {
            const { AnswerId, PlayId } = record;
            const sqlQuery = `
                INSERT INTO SelectedAnswer (AnswerId, PlayId)
                VALUES (?, ?)
            `;
            await connection.query<ResultSetHeader>(sqlQuery, [
                AnswerId,
                PlayId,
            ]);
        }

        await connection.commit();
        return { message: "Success" };
    } catch (error) {
        await connection.rollback();
        console.error(error);
        return { error: error };
    } finally {
        connection.release();
        return { message: "Success" };
    }
}
