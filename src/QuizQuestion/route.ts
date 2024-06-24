import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { UpdateOne } from './UpdateOne';

export const TABLE = "QuizQuestion"
export const QuizQuestionRouter = express.Router();

QuizQuestionRouter.get('/', ReadAll);
QuizQuestionRouter.get('/:QuizQuestionId', ReadOne);
QuizQuestionRouter.put('/', UpdateOne);
