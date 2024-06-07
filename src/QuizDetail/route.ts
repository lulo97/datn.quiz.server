import express from 'express';
import { ReadOne } from './ReadOne';
import { ReadAllByUser } from './ReadAllByUser';
import { DeleteOne } from './DeleteOne';
import { ReadAll } from './ReadAll';

export const QuizDetailRouter = express.Router();

QuizDetailRouter.get('/', ReadAll);
QuizDetailRouter.get('/:QuizId', ReadOne);
QuizDetailRouter.delete('/', DeleteOne);
QuizDetailRouter.get('/ReadAllByUser/:UserId', ReadAllByUser);