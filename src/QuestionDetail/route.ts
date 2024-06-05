import express from 'express';
import { ReadOne } from './ReadOne';
import { ReadAllBySubject } from './ReadAllBySubject';

export const QuestionDetailRouter = express.Router();

QuestionDetailRouter.get('/:QuestionId', ReadOne);
QuestionDetailRouter.get('/ReadAllBySubject/:SubjectId', ReadAllBySubject);