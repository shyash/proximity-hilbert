import { Router } from 'express';
import { getAll, add, get } from '../controllers/advertisements';
const advertisementsRouter = Router();

advertisementsRouter.route('/').get(getAll).post(add);
advertisementsRouter.route('/:id').get(get);
export default advertisementsRouter;
