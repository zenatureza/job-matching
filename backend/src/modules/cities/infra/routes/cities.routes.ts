import { Router } from 'express';
import CitiesController from '../http/controllers/CitiesController';

const citiesRouter = Router();
const citiesController = new CitiesController();

// TODO: add celebrate validation
citiesRouter.get('/', citiesController.get);

export default citiesRouter;
