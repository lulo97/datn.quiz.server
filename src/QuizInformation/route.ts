import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "QuizInformation"
export const QuizInformationRouter = express.Router();

QuizInformationRouter.get('/', ReadAll);
QuizInformationRouter.get('/:QuizInformationId', ReadOne);

QuizInformationRouter.post('/', CreateOne);
QuizInformationRouter.put('/', UpdateOne);
QuizInformationRouter.delete('/', DeleteOne);
