import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "Room"
export const RoomRouter = express.Router();

RoomRouter.get('/', ReadAll);
RoomRouter.get('/:RoomId', ReadOne);
RoomRouter.post('/', CreateOne);
RoomRouter.delete('/', DeleteOne);
