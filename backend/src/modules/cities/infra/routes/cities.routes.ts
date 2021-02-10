import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CitiesController from '../http/controllers/CitiesController';

const citiesRouter = Router();
const citiesController = new CitiesController();

citiesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      filter: Joi.string().required().message('Informe a cidade'),
    },
  }),
  citiesController.get,
);

export default citiesRouter;
