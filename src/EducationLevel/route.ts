import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "EducationLevel"
export const EducationLevelRouter = express.Router();

EducationLevelRouter.get('/', ReadAll);
EducationLevelRouter.get('/:EducationLevelId', ReadOne);
EducationLevelRouter.post('/', CreateOne);
EducationLevelRouter.put('/', UpdateOne);
EducationLevelRouter.delete('/', DeleteOne);
