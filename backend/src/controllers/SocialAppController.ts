import { Request, Response } from "express";
import SocialApp, { ISocialApp } from "../models/SocialApp";

export default class SocialAppController {
    public getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const socialApps: ISocialApp[] = await SocialApp.find().lean();
            res.status(200).json({ result: socialApps });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const name: string = req.body.name as string;
            if (!name) {
                res.status(400).json({ error: 'name is required' });
                return;
            }

            const socialApp: ISocialApp = (await SocialApp.create({ name: name })).toJSON();
            res.status(201).json({ result: socialApp });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    private handleError = (res: Response, error: unknown): void => {
        const errorMessage = (error as Error)?.message ?? 'an unexpected error occurred';
        res.status(500).json({ error: errorMessage });
    }
}
