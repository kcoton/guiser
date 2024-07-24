import { Router } from 'express';
import { body, query, param } from 'express-validator';
import UserController from '../controllers/UserController';
import mongoose from 'mongoose';

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

    private objectIdValidator(testId: string): boolean {
        if (!mongoose.Types.ObjectId.isValid(testId)) {
            throw new Error('not a valid Mongo object id');
        }
        return true;
    }

    private registerRoutes() {
        this.router.get(
            '/',
            [
                query('externalId').isString().notEmpty().withMessage('is required')
            ],
            this.userController.getUser
        );
        this.router.post(
            '/',
            [
                body('externalId').isString().notEmpty().withMessage('is required')
            ],
            this.userController.createUser
        );
        this.router.get(
            '/personas',
            [
                query('externalId').isString().notEmpty().withMessage('is required')
            ],
            this.userController.getPersonas
        );
        this.router.post(
            '/:userId/persona',
            [
                param('userId').custom(this.objectIdValidator).notEmpty().withMessage('is required'),
                body('name').isString().notEmpty().withMessage('is required'),
                body('text').isString().notEmpty().withMessage('is required')
            ],
            this.userController.createPersona
        );
        this.router.patch(
            '/:userId/persona',
            [
                param('userId').custom(this.objectIdValidator).notEmpty().withMessage('is required'),
                query('personaId').custom(this.objectIdValidator).notEmpty().withMessage('is required'),
                body('name').isString().optional(),
                body('text').isString().optional(),
                body().custom(body => {
                    if (!body.name && !body.text) {
                        throw new Error('at least one is required');
                    }
                    return true;
                })
            ],
            this.userController.updatePersona
        );
        this.router.delete(
            '/:userId/persona',
            [
                param('userId').custom(this.objectIdValidator).notEmpty().withMessage('is required'),
                query('personaId').custom(this.objectIdValidator).notEmpty().withMessage('is required')
            ],
            this.userController.deletePersona
        );
        this.router.post(
            '/:userId/persona/:personaId/authtoken/linkedin',
            [
                param('userId').custom(this.objectIdValidator).notEmpty().withMessage('is required'),
                param('personaId').custom(this.objectIdValidator).notEmpty().withMessage('is required'),
                body('code').isString().notEmpty().withMessage('is required')
            ],
            this.userController.createLinkedInAuthToken
        );
        this.router.post(
            '/:userId/persona/:personaId/content', 
            [
                param('userId').custom(this.objectIdValidator).notEmpty().withMessage('is required'),
                param('personaId').custom(this.objectIdValidator).notEmpty().withMessage('is required'),
                body('text').isString().notEmpty().withMessage('is required'),
                body('isRejected').isBoolean().notEmpty().withMessage('is required')
            ],
            this.userController.createContent
        );
        // ET adapted to this endpoint
        this.router.patch(
            '/:userId/persona/:personaId/content/:contentId/2', 
            [
                param('userId').custom(this.objectIdValidator).notEmpty().withMessage('is required'),
                param('personaId').custom(this.objectIdValidator).notEmpty().withMessage('is required'),
                param('contentId').custom(this.objectIdValidator).notEmpty().withMessage('is required')
            ],
            this.userController.postToThreads
        );
        this.router.patch(
            '/:userId/persona/:personaId/content/:contentId/3', 
            [
                param('userId').custom(this.objectIdValidator).notEmpty().withMessage('is required'),
                param('personaId').custom(this.objectIdValidator).notEmpty().withMessage('is required'),
                param('contentId').custom(this.objectIdValidator).notEmpty().withMessage('is required')
            ],
            this.userController.postToLinkedIn
        );
    }
}

export default new UserRouter().getRouter();
