import { Router } from 'express';
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
    }
}

export default new SocialAppRouter().getRouter();
