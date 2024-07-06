import { Router } from 'express';
import GoogleGenAiService from '../services/GenAi/GoogleGenAiService';
import IGenAiService from '../services/GenAi/IGenAiService';
import ContentController from '../controllers/ContentController';
import TogetherService from '../services/GenAi/TogetherService';

class ContentRouter {
    private readonly router: Router;
    private readonly genAiService: IGenAiService;
    private readonly contentController: ContentController;

    constructor() {
        this.genAiService = new TogetherService();
        this.contentController = new ContentController(this.genAiService);
        this.router = Router();
        this.registerRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private registerRoutes() {
        this.router.post('/generate/text', this.contentController.generateText);
    }
}

export default new ContentRouter().getRouter();
