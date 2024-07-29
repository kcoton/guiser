import { Router } from 'express';
import { body } from 'express-validator';
import SocialAppController from '../controllers/SocialAppController';

class SocialAppRouter {
    private readonly router: Router;
    private readonly socialAppController: SocialAppController;

    constructor() {
        this.socialAppController = new SocialAppController();
        this.router = Router();
        this.registerRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private registerRoutes() {
        this.router.get('/', this.socialAppController.getAll);
        this.router.post(
            '/', 
            [
                body('name').isString().notEmpty().withMessage('is required'),
                body('maxTextLength').isNumeric().notEmpty().withMessage('is required')
            ],
            this.socialAppController.create
        );
    }
}

export default new SocialAppRouter().getRouter();
