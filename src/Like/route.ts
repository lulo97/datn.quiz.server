import express from 'express';
import { CreateOne } from './CreateOne';
import { DeleteOne } from './DeleteOne';
import { ReadOne } from './ReadOne';

export const TABLE = "Likes"
export const LikeRouter = express.Router();

LikeRouter.get('/:QuizId/:UserId', ReadOne)
LikeRouter.post('/', CreateOne);
LikeRouter.delete('/', DeleteOne);
