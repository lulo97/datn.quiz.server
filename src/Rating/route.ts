import express from 'express';
import { CreateOne } from './CreateOne';
import { DeleteOne } from './DeleteOne';
import { ReadOne } from './ReadOne';
import { ReadAllByQuiz } from './ReadAllByQuiz';

export const TABLE = "Rating"
export const RatingRouter = express.Router();

RatingRouter.get('/:QuizId/:UserId', ReadOne)
RatingRouter.get('/:QuizId', ReadAllByQuiz)
RatingRouter.post('/', CreateOne);
RatingRouter.delete('/', DeleteOne);
