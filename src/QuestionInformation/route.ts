import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { UpdateOne } from './UpdateOne';

export const TABLE = "QuestionInformation"
export const QuestionInformationRouter = express.Router();

QuestionInformationRouter.get('/', ReadAll);
QuestionInformationRouter.get('/:QuestionInformationId', ReadOne);
QuestionInformationRouter.put('/', UpdateOne);
