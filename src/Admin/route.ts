import express from 'express';
import { ReadOne } from './ReadOne';

export const AdminRouter = express.Router();

AdminRouter.get('/', ReadOne);
