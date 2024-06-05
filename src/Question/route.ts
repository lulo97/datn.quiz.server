import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "Question"
export const QuestionRouter = express.Router();

QuestionRouter.get('/', ReadAll);
QuestionRouter.get('/:QuestionId', ReadOne);

QuestionRouter.post('/', CreateOne);
QuestionRouter.put('/', UpdateOne);
QuestionRouter.delete('/', DeleteOne);
