import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';
import { ReadOneByClerkId } from './ReadOneByClerkId';

export const TABLE = "Role"
export const RoleRouter = express.Router();

RoleRouter.get('/', ReadAll);
RoleRouter.get('/:RoleId', ReadOne);
RoleRouter.get('/ReadOneByClerkId/:ClerkId', ReadOneByClerkId);
RoleRouter.post('/', CreateOne);
RoleRouter.put('/', UpdateOne);
RoleRouter.delete('/', DeleteOne);
