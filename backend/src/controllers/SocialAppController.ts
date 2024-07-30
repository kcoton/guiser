import { Request, Response } from "express";
import SocialApp, { ISocialApp } from "../models/SocialApp";
import { matchedData, validationResult } from "express-validator";

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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const reqData: Record<string, any> = matchedData(req);

            const socialApp: ISocialApp = (await SocialApp.create(reqData)).toJSON();
            res.status(201).json({ result: socialApp });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    private handleError = (res: Response, error: unknown): void => {
        const errorMessage = (error as Error)?.message ?? 'an unexpected error occurred';
        res.status(500).json({ errors: [errorMessage] });
    }
}
