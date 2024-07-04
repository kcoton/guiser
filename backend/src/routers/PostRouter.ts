import { Router } from 'express';
import GoogleGenAiService from '../services/GenAi/GoogleGenAiService';
import IGenAiService from '../services/GenAi/IGenAiService';
import PostController from '../controllers/PostController';

class PostRouter {
    private readonly router: Router;
    private readonly genAiService: IGenAiService;
    private readonly postController: PostController;

    constructor() {
        this.genAiService = new GoogleGenAiService();
        this.postController = new PostController(this.genAiService);
        this.router = Router();
        this.registerRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private registerRoutes() {
        this.router.post('/generate/text', this.postController.generateText);
    }
}

export default new PostRouter().getRouter();
