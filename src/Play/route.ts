import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "Play"
export const PlayRouter = express.Router();

PlayRouter.get('/', ReadAll);
PlayRouter.get('/:PlayId', ReadOne);
PlayRouter.post('/', CreateOne);
PlayRouter.delete('/', DeleteOne);
