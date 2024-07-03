import express from 'express';
import { ReadAll } from './ReadAll';

export const ReportDetailRouter = express.Router();

ReportDetailRouter.get('/', ReadAll);
