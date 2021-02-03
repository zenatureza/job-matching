import { Router } from 'express';

import candidatesRouter from '@modules/candidates/infra/routes/candidates.routes';

const routes = Router();

routes.use('/candidates', candidatesRouter);

export default routes;
