import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "Language"
export const LanguageRouter = express.Router();

LanguageRouter.get('/', ReadAll);
LanguageRouter.get('/:LanguageId', ReadOne);
LanguageRouter.post('/', CreateOne);
LanguageRouter.put('/', UpdateOne);
LanguageRouter.delete('/', DeleteOne);
