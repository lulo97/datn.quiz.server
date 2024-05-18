import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "Permission"
export const PermissionRouter = express.Router();

PermissionRouter.get('/', ReadAll);
PermissionRouter.get('/:PermissionId', ReadOne);
PermissionRouter.post('/', CreateOne);
PermissionRouter.put('/', UpdateOne);
PermissionRouter.delete('/', DeleteOne);
