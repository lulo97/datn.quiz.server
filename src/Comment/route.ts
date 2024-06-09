import express from 'express';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "Comment"
export const CommentRouter = express.Router();

CommentRouter.post('/', CreateOne);
CommentRouter.put('/', UpdateOne);
CommentRouter.delete('/', DeleteOne);
