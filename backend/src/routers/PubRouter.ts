import { Router } from 'express';
import * as controller from '../controllers/PubController';

const PubRouter = Router();

PubRouter.post('/threads', controller.publishToThreads);

export default PubRouter;
