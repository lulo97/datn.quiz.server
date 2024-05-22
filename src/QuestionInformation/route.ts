import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "QuestionInformation"
export const QuestionInformationRouter = express.Router();

QuestionInformationRouter.get('/', ReadAll);
QuestionInformationRouter.get('/:QuestionInformationId', ReadOne);
QuestionInformationRouter.post('/', CreateOne);
QuestionInformationRouter.put('/', UpdateOne);
QuestionInformationRouter.delete('/', DeleteOne);
