import { Router } from 'express';
import TechnologiesController from '../http/controllers/TechnologiesController';

const technologiesRouter = Router();
const technologiesController = new TechnologiesController();

technologiesRouter.get('/', technologiesController.get);

export default technologiesRouter;
