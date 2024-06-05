import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "QuizQuestion"
export const QuizQuestionRouter = express.Router();

QuizQuestionRouter.get('/', ReadAll);
QuizQuestionRouter.get('/:QuizQuestionId', ReadOne);

QuizQuestionRouter.post('/', CreateOne);
QuizQuestionRouter.put('/', UpdateOne);
QuizQuestionRouter.delete('/', DeleteOne);
