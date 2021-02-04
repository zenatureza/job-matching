import { Router } from 'express';
import CandidatesController from '../controllers/CandidatesController';

const candidatesRouter = Router();
const candidatesController = new CandidatesController();

// TODO: add celebrate validation
candidatesRouter.get('/', candidatesController.get);

export default candidatesRouter;
