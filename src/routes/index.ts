import { Router } from 'express';
import squaresRouter from './squares';
import advertisementsRouter from './advertisements';

const routes = Router();

routes.use('/api/hilbert', squaresRouter);
routes.use('/api/advertisements', advertisementsRouter);

export default routes;
