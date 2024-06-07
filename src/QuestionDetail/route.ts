import express from 'express';
import { ReadOne } from './ReadOne';
import { ReadAllBySubject } from './ReadAllBySubject';
import { ReadAllByUser } from './ReadAllByUser';
import { DeleteOne } from './DeleteOne';
import { ReadAll } from './ReadAll';

export const QuestionDetailRouter = express.Router();

QuestionDetailRouter.get('/', ReadAll);
QuestionDetailRouter.get('/:QuestionId', ReadOne);
QuestionDetailRouter.delete('/', DeleteOne);
QuestionDetailRouter.get('/ReadAllBySubject/:SubjectId', ReadAllBySubject);
QuestionDetailRouter.get('/ReadAllByUser/:UserId', ReadAllByUser);