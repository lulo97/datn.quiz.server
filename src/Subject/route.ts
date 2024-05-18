import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "Subject"
export const SubjectRouter = express.Router();

SubjectRouter.get('/', ReadAll);
SubjectRouter.get('/:SubjectId', ReadOne);
SubjectRouter.post('/', CreateOne);
SubjectRouter.put('/', UpdateOne);
SubjectRouter.delete('/', DeleteOne);
