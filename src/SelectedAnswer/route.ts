import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "SelectedAnswer"
export const SelectedAnswerRouter = express.Router();

SelectedAnswerRouter.get('/', ReadAll);
SelectedAnswerRouter.get('/:SelectedAnswerId', ReadOne);
SelectedAnswerRouter.post('/', CreateOne);
SelectedAnswerRouter.delete('/', DeleteOne);
