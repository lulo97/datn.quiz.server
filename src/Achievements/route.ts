import express from 'express';
import { ReadAll } from './ReadAll';
import { ReadOne } from './ReadOne';
import { CreateOne } from './CreateOne';
import { UpdateOne } from './UpdateOne';
import { DeleteOne } from './DeleteOne';

export const TABLE = "Achievements"
export const AchievementRouter = express.Router();

AchievementRouter.get('/', ReadAll);
AchievementRouter.get('/:AchievementId', ReadOne);
AchievementRouter.post('/', CreateOne);
AchievementRouter.put('/', UpdateOne);
AchievementRouter.delete('/', DeleteOne);
