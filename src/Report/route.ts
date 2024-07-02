import express from 'express';
import { CreateOne } from './CreateOne';

export const TABLE = "Report"
export const ReportRouter = express.Router();

ReportRouter.post('/', CreateOne);
