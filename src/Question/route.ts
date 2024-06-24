import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { UpdateOne } from './UpdateOne';

export const TABLE = "Question"
export const QuestionRouter = express.Router();

QuestionRouter.get('/', ReadAll);
QuestionRouter.get('/:QuestionId', ReadOne);

QuestionRouter.put('/', UpdateOne);
