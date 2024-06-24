import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { UpdateOne } from './UpdateOne';

export const TABLE = "QuizInformation"
export const QuizInformationRouter = express.Router();

QuizInformationRouter.get('/', ReadAll);
QuizInformationRouter.get('/:QuizInformationId', ReadOne);
QuizInformationRouter.put('/', UpdateOne);
