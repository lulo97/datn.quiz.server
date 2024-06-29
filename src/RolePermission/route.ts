import express from 'express';

import { CreateOne } from './CreateOne';
import { DeleteOne } from './DeleteOne';
import { ReadOne } from './ReadOne';
import { UpdateOne } from './UpdateOne';

export const TABLE = "RolePermission"
export const RolePermissionRouter = express.Router();

RolePermissionRouter.get('/:RoleId/:PermissonId', ReadOne);
RolePermissionRouter.post('/:RoleId/:PermissonId', CreateOne);
RolePermissionRouter.put('/:RoleId/:PermissonId', UpdateOne);
RolePermissionRouter.delete('/', DeleteOne);
