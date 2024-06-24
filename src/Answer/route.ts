import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { UpdateOne } from './UpdateOne';

export const TABLE = "Answer"
export const AnswerRouter = express.Router();

AnswerRouter.get('/', ReadAll);
AnswerRouter.get('/:AnswerId', ReadOne);
AnswerRouter.put('/', UpdateOne);
