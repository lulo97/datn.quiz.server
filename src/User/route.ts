import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';
import { ReadOneByClerkId } from './ReadOneByClerkId';

export const TABLE = "User"
export const UserRouter = express.Router();

UserRouter.get('/', ReadAll);
UserRouter.get('/:UserId', ReadOne);
UserRouter.get('/Clerk/:ClerkId', ReadOneByClerkId);
UserRouter.post('/', CreateOne);
UserRouter.put('/', UpdateOne);
UserRouter.delete('/', DeleteOne);
