import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "ReportTarget"
export const ReportTargetRouter = express.Router();

ReportTargetRouter.get('/', ReadAll);
ReportTargetRouter.get('/:ReportTargetId', ReadOne);
ReportTargetRouter.post('/', CreateOne);
ReportTargetRouter.put('/', UpdateOne);
ReportTargetRouter.delete('/', DeleteOne);
