import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "SubSubject"
export const SubSubjectRouter = express.Router();

SubSubjectRouter.get('/', ReadAll);
SubSubjectRouter.get('/:SubSubjectId', ReadOne);
SubSubjectRouter.post('/', CreateOne);
SubSubjectRouter.put('/', UpdateOne);
SubSubjectRouter.delete('/', DeleteOne);
