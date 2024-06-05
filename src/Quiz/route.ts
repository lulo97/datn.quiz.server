import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "Quiz"
export const QuizRouter = express.Router();

QuizRouter.get('/', ReadAll);
QuizRouter.get('/:QuizId', ReadOne);

QuizRouter.post('/', CreateOne);
QuizRouter.put('/', UpdateOne);
QuizRouter.delete('/', DeleteOne);
