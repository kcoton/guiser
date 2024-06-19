import { Router } from 'express';
import * as controller from '../controllers/AuthController';

const AuthRouter = Router();

// AuthRouter.get('/uid',  controller.getMasterUserDtls);
AuthRouter.post('/gid', controller.setGoogleUserDtls);

export default AuthRouter;
