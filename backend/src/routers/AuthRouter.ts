import { Router } from 'express';
import * as controller from '../controllers/AuthController';

const AuthRouter = Router();

AuthRouter.post('/login', controller.loginGoogleUser);
AuthRouter.get('/login',  controller.getSessionUser);

AuthRouter.get('/threads', controller.authorizeThreadsUser);

export default AuthRouter;
