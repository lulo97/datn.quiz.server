import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "DifficultLevel"
export const DifficultLevelRouter = express.Router();

DifficultLevelRouter.get('/', ReadAll);
DifficultLevelRouter.get('/:DifficultLevelId', ReadOne);
DifficultLevelRouter.post('/', CreateOne);
DifficultLevelRouter.put('/', UpdateOne);
DifficultLevelRouter.delete('/', DeleteOne);
