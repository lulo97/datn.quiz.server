import express from 'express';
import { ReadOne } from './ReadOne';
import { ReadAllByUser } from './ReadAllByUser';
import { ReadAll } from './ReadAll';

export const QuizDetailRouter = express.Router();

QuizDetailRouter.get('/', ReadAll);
QuizDetailRouter.get('/:QuizId', ReadOne);
QuizDetailRouter.get('/ReadAllByUser/:UserId', ReadAllByUser);