import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CandidatesController from '../http/controllers/CandidatesController';

const candidatesRouter = Router();
const candidatesController = new CandidatesController();

// TODO: add celebrate validation
candidatesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      cityId: Joi.string().uuid().messages({
        cityId: '"cityId" should be a valid uuid',
      }),
      startExperienceRange: Joi.number().integer().messages({
        startExperienceRange:
          '"startExperienceRange" should be at least 0 year',
      }),
      endExperienceRange: Joi.number().integer().messages({
        endExperienceRange: '"endExperienceRange" should be at least 0 year',
      }),
      technologiesIds: Joi.array()
        .min(1)
        .items(
          Joi.string().uuid().message('"technologyId" should be a valid uuid'),
        )
        .required(),
      // .message('"technologiesIds" should be informed'),
      // .required()
      // .message('"technologiesIds" should be informed'),
    },
  }),
  candidatesController.get,
);

export default candidatesRouter;
