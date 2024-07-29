import { Router } from 'express';
import * as controller from '../controllers/AuthController';

const AuthRouter = Router();

AuthRouter.post('/login', controller.loginGoogleUser);

AuthRouter.get('/threads', controller.authorizeThreadsUser);
AuthRouter.get('/twitter/token', controller.processTwitterAuthCode);
AuthRouter.get('/twitter/code', controller.getTwitterAuthCode);

export default AuthRouter;
