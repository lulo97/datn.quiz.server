import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { UpdateOne } from './UpdateOne';

export const TABLE = "Quiz"
export const QuizRouter = express.Router();

QuizRouter.get('/', ReadAll);
QuizRouter.get('/:QuizId', ReadOne);
QuizRouter.put('/', UpdateOne);
