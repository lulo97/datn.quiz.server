import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "ReportReason"
export const ReportReasonRouter = express.Router();

ReportReasonRouter.get('/', ReadAll);
ReportReasonRouter.get('/:ReportReasonId', ReadOne);
ReportReasonRouter.post('/', CreateOne);
ReportReasonRouter.put('/', UpdateOne);
ReportReasonRouter.delete('/', DeleteOne);
