import { Router } from 'express';
import * as controller from '../controllers/PubController';

const PubRouter = Router();

PubRouter.post('/threads', controller.publishToThreads);
PubRouter.get('/twitter', controller.postToTwitter);


export default PubRouter;
