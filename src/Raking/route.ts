import express from 'express';
import { ReadOne } from './ReadOne';

export const TABLE = "Ranking"
export const RankingRouter = express.Router();

RankingRouter.get('/:RoomId', ReadOne);
