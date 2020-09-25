import { Router } from 'express';
import { getAll, get, locate, locateRange } from '../controllers/squares';
const squaresRouter: Router = Router();

squaresRouter.get('/', getAll);
squaresRouter.route('/:id').get(get);
squaresRouter.get('/:lattitude/:longitude', locate);
squaresRouter.get('/:lattitude/:longitude/:range', locateRange);

export default squaresRouter;
