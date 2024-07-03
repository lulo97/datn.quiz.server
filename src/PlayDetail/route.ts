import express from 'express';
import { ReadOne } from './ReadOne';
import { ReadAllByUserId } from './ReadAllByUserId';

export const PlayDetailRouter = express.Router();

PlayDetailRouter.get('/:PlayId', ReadOne);
PlayDetailRouter.get('/ReadAllByUserId/:UserId', ReadAllByUserId);