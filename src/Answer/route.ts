import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "Answer"
export const AnswerRouter = express.Router();

AnswerRouter.get('/', ReadAll);
AnswerRouter.get('/:AnswerId', ReadOne);
AnswerRouter.post('/', CreateOne);
AnswerRouter.put('/', UpdateOne);
AnswerRouter.delete('/', DeleteOne);
