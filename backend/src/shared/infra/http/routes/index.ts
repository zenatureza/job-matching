import { Router } from 'express';

import candidatesRouter from '@modules/candidates/infra/routes/candidates.routes';
import technologiesRouter from '@modules/technologies/infra/routes/technologies.routes';
import citiesRouter from '@modules/cities/infra/routes/cities.routes';

const routes = Router();

routes.use('/candidates', candidatesRouter);
routes.use('/technologies', technologiesRouter);
routes.use('/cities', citiesRouter);

export default routes;
