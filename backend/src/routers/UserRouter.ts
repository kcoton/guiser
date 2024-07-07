import { Router } from 'express';
import UserController from '../controllers/UserController';

class UserRouter {
    private readonly router: Router;
    private readonly userController: UserController;

    constructor() {
        this.userController = new UserController();
        this.router = Router();
        this.registerRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private registerRoutes() {
        this.router.get('/', this.userController.getUser);
        this.router.post('/', this.userController.createUser);
    }
}

export default new UserRouter().getRouter();
