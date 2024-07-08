import { Router } from 'express';
import { body, query, param } from 'express-validator';
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
        this.router.get(
            '/',
            [
                query('externalId').isString().notEmpty().withMessage('externalId is required')
            ],
            this.userController.getUser
        );
        this.router.post(
            '/',
            [
                body('externalId').isString().notEmpty().withMessage('externalId is required')
            ],
            this.userController.createUser
        );
        this.router.post('/:userId/persona', this.userController.createPersona);
        this.router.patch('/:userId/persona', this.userController.updatePersona);
        this.router.delete('/:userId/persona', this.userController.deletePersona);
        this.router.post('/:userId/persona/:personaId/content', this.userController.createContent);
    }
}

export default new UserRouter().getRouter();
