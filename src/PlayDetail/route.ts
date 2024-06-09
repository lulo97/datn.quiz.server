import express from 'express';
import { ReadOne } from './ReadOne';

export const PlayDetailRouter = express.Router();

PlayDetailRouter.get('/:PlayId', ReadOne);