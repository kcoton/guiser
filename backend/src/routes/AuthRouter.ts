import { Router } from 'express';
import * as controller from '../controllers/AuthController';

const AuthRouter = Router();

AuthRouter.get('/uid',  controller.getSessionUser);
AuthRouter.post('/gid', controller.loginGoogleUser);

export default AuthRouter;
