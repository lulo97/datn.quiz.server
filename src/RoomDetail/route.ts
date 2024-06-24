import express from 'express';
import { ReadOne } from './ReadOne';

export const TABLE = "RoomDetail"
export const RoomDetailRouter = express.Router();

RoomDetailRouter.get('/:RoomId', ReadOne);