import express from 'express';
import { ReadAllByQuiz } from './ReadAllByQuiz';

export const CommentDetailRouter = express.Router();

CommentDetailRouter.get('/ReadAllByQuiz/:QuizId', ReadAllByQuiz);